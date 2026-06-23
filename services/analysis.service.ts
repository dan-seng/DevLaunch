import { join } from "path";
import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { validateRepository, cloneRepository, deleteRepository, getRepositoryMetadata } from "./github.service";
import { walkDirectory, countFiles, countLinesOfCode, readFile } from "./file.service";
import { detectFramework, parsePackageJson } from "./framework.service";
import { detectLanguages } from "./language.service";
import { repositoryIndexService } from "./repositoryIndex.service";
import { generateSummary, chatWithRepo, generateReadme } from "./ai.service";
import type { AnalysisResult, FileNode, Insights } from "@/lib/analysis-types";

const ANALYSIS_STORE = new Map<string, AnalysisResult>();

function generateId(): string {
  return `analysis_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function readConfigFiles(rootPath: string): string[] {
  const configFiles: string[] = [];
  const configNames = [
    "package.json", "requirements.txt", "pom.xml", "build.gradle",
    "Cargo.toml", "go.mod", "composer.json", "pyproject.toml",
    "next.config.js", "next.config.ts", "vite.config.ts", "vite.config.js",
    "docker-compose.yml", "Dockerfile", ".github/workflows",
  ];

  for (const name of configNames) {
    const fullPath = join(rootPath, name);
    if (existsSync(fullPath)) {
      try {
        const content = readFileSync(fullPath, "utf-8");
        configFiles.push(content);
      } catch { /* skip unreadable */ }
    }
  }

  return configFiles;
}

function findEntryPoints(rootPath: string): string[] {
  const entries: string[] = [];
  const patterns = [
    "package.json", "main.ts", "main.js", "index.ts", "index.js",
    "app/page.tsx", "app/page.jsx", "src/main.ts", "src/main.js",
    "src/index.ts", "src/index.js", "manage.py", "Application.java",
    "main.py", "main.go", "main.rs", "lib/main.dart",
  ];

  for (const pattern of patterns) {
    if (existsSync(join(rootPath, pattern))) {
      entries.push(pattern);
    }
  }

  return entries;
}

function findDependencies(rootPath: string): string[] {
  const deps: string[] = [];
  const pkgPath = join(rootPath, "package.json");

  if (existsSync(pkgPath)) {
    try {
      const content = readFileSync(pkgPath, "utf-8");
      const pkg = JSON.parse(content);
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
      deps.push(...Object.keys(allDeps));
    } catch { /* skip */ }
  }

  return deps.slice(0, 50);
}

function computeInsights(structure: FileNode[], deps: string[]): Insights {
  const { files, folders } = countFiles(structure);
  const hasReadme = deps.length > 0;

  const health = Math.min(100, Math.round(
    70 + (files > 0 ? 10 : 0) + (folders > 0 ? 5 : 0) + (hasReadme ? 10 : 0) + Math.min(deps.length, 5)
  ));

  return {
    health,
    maintainability: Math.min(100, health - Math.round(Math.random() * 10)),
    documentation: hasReadme ? Math.min(100, health + 5) : Math.min(100, health - 10),
    architecture: Math.min(100, health - Math.round(Math.random() * 5)),
  };
}

export async function analyzeRepository(url: string): Promise<AnalysisResult> {
  // validate
  const validation = await validateRepository(url);
  if (!validation.valid) {
    throw new Error(validation.error || "Invalid repository");
  }

  // clone
  const { path: repoPath } = await cloneRepository(url);

  try {
    // walk files
    const structure = walkDirectory(repoPath);
    const { files, folders } = countFiles(structure);
    const linesOfCode = countLinesOfCode(repoPath);

    // read config files
    const configFiles = readConfigFiles(repoPath);

    // detect framework and languages
    const frameworks = detectFramework(configFiles);
    const filePaths: string[] = [];
    function collectPaths(nodes: FileNode[], prefix = "") {
      for (const node of nodes) {
        if (node.type === "file") {
          filePaths.push(node.path);
        }
        if (node.children) collectPaths(node.children, node.path);
      }
    }
    collectPaths(structure);
    const languages = detectLanguages(filePaths);

    // metadata
    const repoMeta = await getRepositoryMetadata(url);
    const entryPoints = findEntryPoints(repoPath);
    const dependencies = findDependencies(repoPath);

    // compute insights
    const insights = computeInsights(structure, dependencies);

    // get top-level folders
    const topFolders = structure
      .filter((n) => n.type === "folder")
      .map((n) => n.name);

    // AI summary
    const summary = await generateSummary({
      projectName: repoMeta.name,
      languages,
      frameworks: { ...frameworks },
      files,
      folders,
      linesOfCode,
      topFolders,
      entryPoints,
      dependencies,
    });

    const analysisId = generateId();

    const result: AnalysisResult = {
      analysisId,
      projectName: repoMeta.name,
      summary,
      frameworks,
      languages,
      statistics: {
        files,
        folders,
        linesOfCode,
        totalSize: 0,
      },
      structure,
      insights,
      dependencies,
      entryPoints,
    };

    ANALYSIS_STORE.set(analysisId, result);

    return result;
  } finally {
    deleteRepository(repoPath);
  }
}

export function getAnalysis(analysisId: string): AnalysisResult | undefined {
  return ANALYSIS_STORE.get(analysisId);
}

export async function askQuestion(
  analysisId: string,
  question: string,
): Promise<string> {
  const analysis = ANALYSIS_STORE.get(analysisId);
  if (!analysis) throw new Error("Analysis not found");

  // find relevant files via index
  const relevantPaths = repositoryIndexService.query(question);
  const repoPath = join(process.cwd(), "temp", analysisId);

  const contextFiles: { path: string; content: string }[] = [];
  for (const filePath of relevantPaths) {
    const fullPath = join(repoPath, filePath);
    const content = readFile(fullPath);
    if (content) {
      contextFiles.push({ path: filePath, content });
    }
  }

  return chatWithRepo(question, contextFiles, {
    projectName: analysis.projectName,
    languages: analysis.languages,
    frameworks: analysis.frameworks,
  });
}

export async function generateProjectReadme(analysisId: string): Promise<string> {
  const analysis = ANALYSIS_STORE.get(analysisId);
  if (!analysis) throw new Error("Analysis not found");

  const structureStr = JSON.stringify(analysis.structure, null, 2);

  return generateReadme({
    projectName: analysis.projectName,
    description: analysis.summary.slice(0, 200),
    languages: analysis.languages,
    frameworks: analysis.frameworks,
    structure: structureStr,
    dependencies: analysis.dependencies,
    entryPoints: analysis.entryPoints,
    statistics: analysis.statistics,
  });
}
