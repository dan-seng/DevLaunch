import simpleGit from "simple-git";
import { existsSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import type { RepoMetadata } from "@/lib/analysis-types";

const TEMP_BASE = join(process.cwd(), "temp");
const MAX_SIZE = 200 * 1024 * 1024;

function ensureTempDir() {
  if (!existsSync(TEMP_BASE)) mkdirSync(TEMP_BASE, { recursive: true });
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
  const res = await fetch(apiUrl, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });

  if (!res.ok) {
    if (res.status === 404) throw new Error("Repository does not exist.");
    if (res.status === 403) throw new Error("Rate limited by GitHub API. Try again later.");
    throw new Error("Failed to fetch repository metadata.");
  }

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

  const git = simpleGit();
  await git.clone(url, clonePath, [
    "--depth", "1",
    "--single-branch",
  ]);

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
