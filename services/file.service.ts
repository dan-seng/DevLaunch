import { readdirSync, readFileSync, statSync } from "fs";
import { join, extname, relative } from "path";
import type { FileNode } from "@/lib/analysis-types";

const SKIPPED_DIRS = new Set([
  "node_modules", "build", "dist", "target", ".git",
  "vendor", ".next", "out", "cache", "__pycache__",
  ".cache", "coverage", ".vercel",
]);

const SKIPPED_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".ico", ".svg",
  ".woff", ".woff2", ".ttf", ".eot",
  ".mp4", ".mp3", ".avi", ".mov",
  ".zip", ".tar", ".gz", ".rar",
  ".exe", ".dll", ".so", ".dylib",
  ".map", ".min.js",
  ".lock", ".sum",
]);

const MAX_FILES = 10000;
const MAX_FILE_SIZE = 1024 * 1024;

export function walkDirectory(
  dirPath: string,
  basePath: string = dirPath,
  depth: number = 0,
): FileNode[] {
  if (depth > 8) return [];

  const entries: FileNode[] = [];
  let fileCount = 0;

  try {
    const items = readdirSync(dirPath);

    for (const item of items) {
      if (fileCount >= MAX_FILES) break;
      const fullPath = join(dirPath, item);
      let stats: ReturnType<typeof statSync>;

      try {
        stats = statSync(fullPath);
      } catch {
        continue;
      }

      const relativePath = relative(basePath, fullPath);

      if (stats.isDirectory()) {
        if (SKIPPED_DIRS.has(item)) continue;
        const children = walkDirectory(fullPath, basePath, depth + 1);
        entries.push({
          name: item,
          type: "folder",
          path: relativePath,
          children,
        });
      } else if (stats.isFile()) {
        const ext = extname(item).toLowerCase();
        if (SKIPPED_EXTENSIONS.has(ext)) continue;
        if (stats.size > MAX_FILE_SIZE) continue;

        entries.push({
          name: item,
          type: "file",
          path: relativePath,
          size: stats.size,
        });
        fileCount++;
      }
    }
  } catch {
    // permission denied or missing
  }

  return entries;
}

export function readFile(filePath: string): string | null {
  try {
    const content = readFileSync(filePath, "utf-8");
    if (content.length > MAX_FILE_SIZE) return null;
    return content;
  } catch {
    return null;
  }
}

export function getFileExtension(filePath: string): string {
  return extname(filePath).toLowerCase();
}

export function countFiles(nodes: FileNode[]): { files: number; folders: number } {
  let files = 0;
  let folders = 0;

  for (const node of nodes) {
    if (node.type === "file") {
      files++;
    } else {
      folders++;
      if (node.children) {
        const sub = countFiles(node.children);
        files += sub.files;
        folders += sub.folders;
      }
    }
  }

  return { files, folders };
}

export function countLinesOfCode(rootPath: string): number {
  let total = 0;
  const TEXT_EXTENSIONS = new Set([
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".py", ".java", ".go", ".rs", ".rb", ".php",
    ".css", ".scss", ".less", ".html", ".json",
    ".yaml", ".yml", ".toml", ".xml", ".md",
    ".sql", ".sh", ".bash", ".proto", ".gradle",
    ".kt", ".swift", ".c", ".cpp", ".h", ".hpp",
  ]);

  function scan(dir: string) {
    try {
      const items = readdirSync(dir);
      for (const item of items) {
        const fullPath = join(dir, item);
        let stats: ReturnType<typeof statSync>;
        try {
          stats = statSync(fullPath);
        } catch { continue; }

        if (stats.isDirectory()) {
          if (!SKIPPED_DIRS.has(item)) scan(fullPath);
        } else if (stats.isFile()) {
          const ext = extname(item).toLowerCase();
          if (TEXT_EXTENSIONS.has(ext) && stats.size <= MAX_FILE_SIZE) {
            try {
              const content = readFileSync(fullPath, "utf-8");
              total += content.split("\n").length;
            } catch { /* binary or unreadable */ }
          }
        }
      }
    } catch { /* skip */ }
  }

  scan(rootPath);
  return total;
}
