interface IndexEntry {
  keywords: string[];
  filePath: string;
  score: number;
}

export class RepositoryIndexService {
  private index: Map<string, IndexEntry[]> = new Map();

  buildIndex(files: { path: string; content: string | null }[]) {
    this.index.clear();

    for (const file of files) {
      if (!file.content) continue;
      const keywords = this.extractKeywords(file.path, file.content);
      for (const keyword of keywords) {
        const existing = this.index.get(keyword) || [];
        existing.push({
          keywords: [keyword],
          filePath: file.path,
          score: this.calculateRelevance(keyword, file.path, file.content),
        });
        this.index.set(keyword, existing);
      }
    }
  }

  query(question: string): string[] {
    const terms = question
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((t) => t.length > 2);

    const scored = new Map<string, number>();

    for (const term of terms) {
      // direct match
      const direct = this.index.get(term);
      if (direct) {
        for (const entry of direct) {
          scored.set(entry.filePath, (scored.get(entry.filePath) || 0) + entry.score * 3);
        }
      }

      // partial match
      for (const [key, entries] of this.index) {
        if (key.includes(term) || term.includes(key)) {
          for (const entry of entries) {
            scored.set(entry.filePath, (scored.get(entry.filePath) || 0) + entry.score);
          }
        }
      }
    }

    return [...scored.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path]) => path);
  }

  private extractKeywords(filePath: string, content: string): string[] {
    const keywords = new Set<string>();

    const name = filePath.split("/").pop() || "";
    const nameParts = name
      .replace(/\.\w+$/, "")
      .split(/[-_.\s]/)
      .filter(Boolean);
    for (const part of nameParts) keywords.add(part.toLowerCase());

    // extract from content: imports, exports, class/function names
    const importMatches = content.matchAll(/from\s+['"](.+?)['"]/g);
    for (const match of importMatches) {
      const parts = match[1].split("/").filter(Boolean);
      for (const part of parts) {
        if (part.length > 2 && !part.startsWith(".")) keywords.add(part.toLowerCase());
      }
    }

    const exportMatches = content.matchAll(/(?:export\s+)?(?:function|class|const|let|var)\s+(\w+)/g);
    for (const match of exportMatches) {
      if (match[1].length > 2) keywords.add(match[1].toLowerCase());
    }

    // framework-specific keywords from file path
    const pathKeywords = filePath.split(/[/\\]/);
    for (const part of pathKeywords) {
      if (["controllers", "services", "routes", "models", "middleware",
        "components", "hooks", "utils", "lib", "pages", "api",
        "auth", "config", "types", "validators", "helpers",
      ].includes(part.toLowerCase())) {
        keywords.add(part.toLowerCase());
      }
    }

    return [...keywords];
  }

  private calculateRelevance(keyword: string, filePath: string, content: string): number {
    let score = 1;

    if (filePath.toLowerCase().includes(keyword)) score += 5;
    if (filePath.includes("index") || filePath.includes("main")) score += 2;

    const name = filePath.split("/").pop() || "";
    if (name.toLowerCase().includes(keyword)) score += 3;

    const occurrences = (content.toLowerCase().match(new RegExp(keyword, "g")) || []).length;
    score += Math.min(occurrences, 20);

    return score;
  }
}

export const repositoryIndexService = new RepositoryIndexService();
