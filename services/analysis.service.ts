import { join } from "path";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { validateRepository, cloneRepository, getRepositoryMetadata } from "./github.service";
import { walkDirectory, countFiles, countLinesOfCode, readFile } from "./file.service";
import { detectFramework } from "./framework.service";
import { detectLanguages } from "./language.service";
import { repositoryIndexService } from "./repositoryIndex.service";
import { generateSummary, chatWithRepo, generateReadme } from "./ai.service";
import type { AnalysisResult, FileNode, Insights } from "@/lib/analysis-types";

const ANALYSIS_STORE = new Map<string, AnalysisResult>();

function getStorePath(analysisId: string): string {
  return join(process.cwd(), "temp", analysisId, ".analysis.json");
}

function saveToDisk(analysisId: string, data: AnalysisResult) {
  try {
    writeFileSync(getStorePath(analysisId), JSON.stringify(data, null, 2));
  } catch { /* skip */ }
}

function loadFromDisk(analysisId: string): AnalysisResult | null {
  try {
    const path = getStorePath(analysisId);
    if (!existsSync(path)) return null;
    return JSON.parse(readFileSync(path, "utf-8")) as AnalysisResult;
  } catch {
    return null;
  }
}

function getFromStore(analysisId: string): AnalysisResult | undefined {
  return ANALYSIS_STORE.get(analysisId) || loadFromDisk(analysisId) || undefined;
}

function setInStore(analysisId: string, data: AnalysisResult) {
  ANALYSIS_STORE.set(analysisId, data);
  saveToDisk(analysisId, data);
}

export interface ContextFile {
  projectName: string;
  languages: string[];
  languageDistribution: { name: string; weight: number }[];
  frameworks: Record<string, string | null>;
  files: number;
  folders: number;
  linesOfCode: number;
  topFolders: string[];
  entryPoints: string[];
  dependencies: string[];
}

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

function collectFilePaths(nodes: FileNode[], paths: string[]) {
  for (const node of nodes) {
    if (node.type === "file") {
      paths.push(node.path);
    }
    if (node.children) collectFilePaths(node.children, paths);
  }
}

function collectFileContents(rootPath: string, nodes: FileNode[]): { path: string; content: string | null }[] {
  const files: { path: string; content: string | null }[] = [];
  for (const node of nodes) {
    if (node.type === "file") {
      const fullPath = join(rootPath, node.path);
      const content = readFile(fullPath);
      files.push({ path: node.path, content });
    }
    if (node.children) {
      files.push(...collectFileContents(rootPath, node.children));
    }
  }
  return files;
}

function getTopFolders(structure: FileNode[]): string[] {
  return structure
    .filter((n) => n.type === "folder")
    .map((n) => n.name);
}

export async function analyzeRepository(
  url: string,
  onProgress?: (step: number) => void,
): Promise<AnalysisResult> {
  onProgress?.(0);
  const validation = await validateRepository(url);
  if (!validation.valid) {
    throw new Error(validation.error || "Invalid repository");
  }

  const analysisId = generateId();

  onProgress?.(1);
  const { path: repoPath } = await cloneRepository(url, analysisId);

  onProgress?.(2);
  const structure = walkDirectory(repoPath);
  const { files, folders } = countFiles(structure);
  const linesOfCode = countLinesOfCode(repoPath);

  onProgress?.(3);
  const configFiles = readConfigFiles(repoPath);
  const frameworks = detectFramework(configFiles);
  const filePaths: string[] = [];
  collectFilePaths(structure, filePaths);
  const languageDistribution = detectLanguages(filePaths);
  const languages = languageDistribution.map((l) => l.name);

  const repoMeta = await getRepositoryMetadata(url);
  const entryPoints = findEntryPoints(repoPath);
  const dependencies = findDependencies(repoPath);

  onProgress?.(4);
  const insights = computeInsights(structure, dependencies);
  const topFolders = getTopFolders(structure);

  onProgress?.(5);
  const allFiles = collectFileContents(repoPath, structure);
  repositoryIndexService.buildIndex(allFiles);

  // save context file for on-demand AI report generation
  const context: ContextFile = {
    projectName: repoMeta.name,
    languages,
    languageDistribution,
    frameworks: { ...frameworks },
    files,
    folders,
    linesOfCode,
    topFolders,
    entryPoints,
    dependencies,
  };
  writeFileSync(join(repoPath, "context.json"), JSON.stringify(context, null, 2));

  const result: AnalysisResult = {
    analysisId,
    projectName: repoMeta.name,
    summary: "",
    readme: "",
    frameworks,
    languages,
    languageDistribution,
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
    repoPath,
  };

  setInStore(analysisId, result);

  return result;
}

export function getAnalysis(analysisId: string): AnalysisResult | undefined {
  return getFromStore(analysisId);
}

export async function askQuestion(
  analysisId: string,
  question: string,
): Promise<string> {
  const analysis = getFromStore(analysisId);
  if (!analysis) throw new Error("Analysis not found");

  // find relevant files via index
  const relevantPaths = repositoryIndexService.query(question);

  const contextFiles: { path: string; content: string }[] = [];
  for (const filePath of relevantPaths) {
    const fullPath = join(analysis.repoPath, filePath);
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

export async function generateSummaryForAnalysis(analysisId: string): Promise<string> {
  const analysis = getFromStore(analysisId);
  if (!analysis) throw new Error("Analysis not found");

  if (analysis.summary) return analysis.summary;

  const contextPath = join(analysis.repoPath, "context.json");
  let context: ContextFile;
  try {
    context = JSON.parse(readFileSync(contextPath, "utf-8"));
  } catch {
    context = {
      projectName: analysis.projectName,
      languages: analysis.languages,
      languageDistribution: analysis.languageDistribution,
      frameworks: analysis.frameworks,
      files: analysis.statistics.files,
      folders: analysis.statistics.folders,
      linesOfCode: analysis.statistics.linesOfCode,
      topFolders: analysis.structure.filter((n) => n.type === "folder").map((n) => n.name),
      entryPoints: analysis.entryPoints,
      dependencies: analysis.dependencies,
    };
  }

  const summary = await generateSummary(context);
  analysis.summary = summary;
  setInStore(analysisId, analysis);
  return summary;
}

export async function generateProjectReadme(analysisId: string): Promise<string> {
  const analysis = getFromStore(analysisId);
  if (!analysis) throw new Error("Analysis not found");

  if (analysis.readme) return analysis.readme;

  const structureStr = JSON.stringify(analysis.structure, null, 2);

  const readme = await generateReadme({
    projectName: analysis.projectName,
    description: analysis.summary.slice(0, 200),
    languages: analysis.languages,
    frameworks: analysis.frameworks,
    structure: structureStr,
    dependencies: analysis.dependencies,
    entryPoints: analysis.entryPoints,
    statistics: analysis.statistics,
  });

  analysis.readme = readme;
  setInStore(analysisId, analysis);
  return readme;
}
