const EXTENSION_MAP: Record<string, { language: string; weight: number }> = {
  ".ts": { language: "TypeScript", weight: 3 },
  ".tsx": { language: "TypeScript", weight: 3 },
  ".js": { language: "JavaScript", weight: 3 },
  ".jsx": { language: "JavaScript", weight: 3 },
  ".mjs": { language: "JavaScript", weight: 3 },
  ".py": { language: "Python", weight: 3 },
  ".java": { language: "Java", weight: 3 },
  ".go": { language: "Go", weight: 3 },
  ".rs": { language: "Rust", weight: 3 },
  ".rb": { language: "Ruby", weight: 3 },
  ".php": { language: "PHP", weight: 3 },
  ".kt": { language: "Kotlin", weight: 3 },
  ".swift": { language: "Swift", weight: 3 },
  ".c": { language: "C", weight: 2 },
  ".cpp": { language: "C++", weight: 2 },
  ".h": { language: "C/C++", weight: 1 },
  ".hpp": { language: "C++", weight: 2 },
  ".cs": { language: "C#", weight: 3 },
  ".css": { language: "CSS", weight: 1 },
  ".scss": { language: "SCSS", weight: 1 },
  ".html": { language: "HTML", weight: 1 },
  ".sql": { language: "SQL", weight: 1 },
  ".sh": { language: "Shell", weight: 1 },
  ".bash": { language: "Shell", weight: 1 },
  ".yaml": { language: "YAML", weight: 1 },
  ".yml": { language: "YAML", weight: 1 },
  ".toml": { language: "TOML", weight: 1 },
  ".json": { language: "JSON", weight: 1 },
  ".md": { language: "Markdown", weight: 1 },
  ".dockerfile": { language: "Dockerfile", weight: 1 },
  ".gradle": { language: "Gradle", weight: 2 },
  ".proto": { language: "Protocol Buffers", weight: 2 },
};

export function detectLanguages(files: string[]): string[] {
  const scores = new Map<string, number>();

  for (const file of files) {
    const dotIndex = file.lastIndexOf(".");
    if (dotIndex === -1) continue;
    const ext = file.slice(dotIndex).toLowerCase();
    const mapping = EXTENSION_MAP[ext];
    if (mapping) {
      scores.set(mapping.language, (scores.get(mapping.language) || 0) + mapping.weight);
    }
  }

  return [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang);
}
