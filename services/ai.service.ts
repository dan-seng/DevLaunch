import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

function buildContext(metadata: Record<string, unknown>) {
  return JSON.stringify(metadata, null, 2);
}

export async function generateSummary(metadata: {
  projectName: string;
  languages: string[];
  frameworks: Record<string, string | null>;
  files: number;
  folders: number;
  linesOfCode: number;
  topFolders: string[];
  entryPoints: string[];
  dependencies: string[];
}): Promise<string> {
  const context = buildContext(metadata);

  const prompt = `You are a codebase analysis assistant. Given the following structured metadata about a GitHub repository, write a concise, accurate summary of what the project does and its major features.

Repository Metadata:
${context}

Guidelines:
- Write 3-4 paragraphs describing the project's purpose and architecture.
- List 4-6 major features as bullet points.
- Base everything ONLY on the data provided. Do not invent information.
- If a field is null or empty, skip it rather than guessing.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text || "";
}

export async function chatWithRepo(
  question: string,
  contextFiles: { path: string; content: string }[],
  metadata: { projectName: string; languages: string[]; frameworks: Record<string, string | null> },
): Promise<string> {
  const fileContext = contextFiles
    .map((f) => `--- ${f.path} ---\n${f.content.slice(0, 4000)}`)
    .join("\n\n");

  const prompt = `You are a codebase assistant for the project "${metadata.projectName}". Answer the user's question based ONLY on the provided file contents below. If the answer cannot be determined from the provided files, say so clearly.

Technologies detected: ${metadata.languages.join(", ")}, Frameworks: ${Object.entries(metadata.frameworks).filter(([_, v]) => v).map(([k, v]) => `${k}: ${v}`).join(", ")}

Relevant Files:
${fileContext}

User Question: ${question}

Provide a specific answer referencing the actual files and code patterns found. Include file paths in your answer.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text || "";
}

export async function generateReadme(metadata: {
  projectName: string;
  description: string;
  languages: string[];
  frameworks: Record<string, string | null>;
  structure: string;
  dependencies: string[];
  entryPoints: string[];
  statistics: { files: number; folders: number; linesOfCode: number };
}): Promise<string> {
  const context = buildContext(metadata);

  const prompt = `You are a documentation generator. Given the following repository metadata, generate a professional README.md in Markdown.

Repository Metadata:
${context}

Include these sections:
1. Project title and short description
2. Features
3. Tech Stack
4. Project Structure (as a tree)
5. Getting Started / Installation
6. Usage

Use the actual data provided. Do not invent features or commands.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response.text || "";
}
