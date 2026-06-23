export interface AnalysisResult {
  analysisId: string;
  projectName: string;
  summary: string;
  frameworks: {
    frontend: string | null;
    backend: string | null;
    database: string | null;
    authentication: string | null;
    deployment: string | null;
  };
  languages: string[];
  languageDistribution: { name: string; weight: number }[];
  statistics: {
    files: number;
    folders: number;
    linesOfCode: number;
    totalSize: number;
  };
  structure: FileNode[];
  insights: Insights;
  dependencies: string[];
  entryPoints: string[];
  repoPath: string;
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  path: string;
  size?: number;
  children?: FileNode[];
}

export interface Insights {
  health: number;
  maintainability: number;
  documentation: number;
  architecture: number;
}

export interface RepoMetadata {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  language: string;
  owner: string;
  defaultBranch: string;
}
