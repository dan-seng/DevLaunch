import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import type { RepoMetadata } from "@/lib/analysis-types";

const TEMP_BASE = process.env.VERCEL
  ? "/tmp/devlaunch"
  : join(process.cwd(), "temp");
const MAX_SIZE = 200 * 1024 * 1024;

function ensureTempDir() {
  try {
    if (!existsSync(TEMP_BASE)) mkdirSync(TEMP_BASE, { recursive: true });
  } catch {
    // serverless environments (Vercel) have a read-only filesystem
  }
}

async function githubFetch(url: string): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    if (res.status === 403 && !token) throw new Error("GitHub API rate limit. Set GITHUB_TOKEN for higher limits, or try again later.");
    if (res.status === 403) throw new Error("GitHub API rate limited. Try again later.");
    if (res.status === 404) throw new Error("Repository or file not found.");
    throw new Error(`GitHub API error: ${res.status}`);
  }
  return res;
}

function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?(?:\/|$)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

export async function validateRepository(url: string): Promise<{ valid: boolean; error?: string }> {
  if (!url.startsWith("https://github.com/")) {
    return { valid: false, error: "Invalid GitHub URL." };
  }
  const parsed = parseRepoUrl(url);
  if (!parsed) {
    return { valid: false, error: "Invalid GitHub URL." };
  }
  return { valid: true };
}

export async function getRepositoryMetadata(url: string): Promise<RepoMetadata> {
  const parsed = parseRepoUrl(url);
  if (!parsed) throw new Error("Invalid repository URL");

  const apiUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`;
  const res = await githubFetch(apiUrl);
  const data = await res.json();
  return {
    name: data.name,
    fullName: data.full_name,
    description: data.description || "",
    stars: data.stargazers_count,
    language: data.language || "",
    owner: data.owner.login,
    defaultBranch: data.default_branch,
  };
}

export async function cloneRepository(url: string, customId?: string): Promise<{ path: string; repoPath: string }> {
  ensureTempDir();
  const parsed = parseRepoUrl(url);
  if (!parsed) throw new Error("Invalid repository URL");

  const folderName = customId || `repo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const clonePath = join(TEMP_BASE, folderName);
  if (!existsSync(clonePath)) mkdirSync(clonePath, { recursive: true });

  // Fetch default branch from repo metadata
  const metaUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`;
  const metaRes = await githubFetch(metaUrl);
  const meta = await metaRes.json() as { default_branch: string };
  const branch = meta.default_branch;

  // Get recursive tree
  const treeUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/git/trees/${branch}?recursive=1`;
  const treeRes = await githubFetch(treeUrl);
  const tree = await treeRes.json() as { tree: Array<{ path: string; mode: string; type: string; sha: string; size?: number }> };

  // Download files via raw.githubusercontent.com CDN (no rate limit)
  const downloaded = { files: 0, bytes: 0 };
  const MAX_FILES = 5000;
  const MAX_BYTES = MAX_SIZE;

  for (const entry of tree.tree) {
    if (entry.type !== "blob") continue;
    if (downloaded.files >= MAX_FILES || downloaded.bytes >= MAX_BYTES) break;

    const filePath = join(clonePath, entry.path);
    const dir = dirname(filePath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    try {
      const contentRes = await fetch(
        `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${branch}/${entry.path}`,
      );
      if (!contentRes.ok) continue;

      const text = await contentRes.text();
      downloaded.bytes += text.length;
      if (text.length > 1024 * 1024) continue; // skip files over 1MB

      writeFileSync(filePath, text);
      downloaded.files++;
    } catch {
      // skip unreadable files
    }
  }

  return { path: clonePath, repoPath: clonePath };
}

export function deleteRepository(path: string) {
  if (existsSync(path)) {
    rmSync(path, { recursive: true, force: true });
  }
}

export function estimateRepoSize(path: string): number {
  const { execSync } = require("child_process");
  try {
    const result = execSync(`du -sk "${path}" 2>/dev/null | cut -f1`, {
      encoding: "utf-8",
    });
    return parseInt(result.trim()) * 1024;
  } catch {
    return 0;
  }
}
