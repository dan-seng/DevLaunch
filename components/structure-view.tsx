"use client";

import { useState } from "react";
import {
  RefreshCw,
  ChevronDown,
  FolderOpen,
  Folder,
  FileJson,
  ChevronRight,
  FileType,
  FileText,
  Settings,
  GitBranch,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnalysisResult, FileNode } from "@/lib/analysis-types";

function FileTreeItem({ node, depth, selectedPath, onSelect }: {
  node: FileNode;
  depth: number;
  selectedPath: string | null;
  onSelect: (node: FileNode) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const isFolder = node.type === "folder";
  const isSelected = selectedPath === node.path;

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center px-4 py-1 font-mono text-xs transition-colors ${
          isSelected
            ? "border-l-2 border-primary bg-white/5 font-bold text-on-surface"
            : "text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface"
        }`}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
        onClick={() => {
          if (isFolder) setExpanded(!expanded);
          onSelect(node);
        }}
      >
        {isFolder ? (
          <>
            {expanded ? <ChevronDown size={14} className="mr-1 shrink-0 text-primary" /> : <ChevronRight size={14} className="mr-1 shrink-0 text-on-surface-variant" />}
            {expanded ? <FolderOpen size={14} className="mr-2 shrink-0 text-on-surface-variant" /> : <Folder size={14} className="mr-2 shrink-0 text-on-surface-variant" />}
          </>
        ) : (
          <>
            <span className="mr-[18px]" />
            <FileJson size={14} className="mr-2 shrink-0 text-outline" />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </div>
      {isFolder && expanded && node.children?.map((child) => (
        <FileTreeItem
          key={child.path}
          node={child}
          depth={depth + 1}
          selectedPath={selectedPath}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function countNodes(nodes: FileNode[]): { files: number; folders: number; depth: number } {
  let files = 0;
  let folders = 0;
  let maxDepth = 0;
  function walk(list: FileNode[], d: number) {
    for (const n of list) {
      if (n.type === "folder") {
        folders++;
        if (n.children) walk(n.children, d + 1);
      } else {
        files++;
      }
      if (d > maxDepth) maxDepth = d;
    }
  }
  walk(nodes, 0);
  return { files, folders, depth: maxDepth };
}

export function StructureView({ analysisResult }: { analysisResult: AnalysisResult }) {
  const { structure, statistics } = analysisResult;
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  const stats = countNodes(structure);

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
      <div className="flex w-[340px] shrink-0 flex-col border-r border-outline-variant">
        <div className="flex items-center justify-between border-b border-outline-variant/50 p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Explorer</span>
          <div className="flex gap-2 text-on-surface-variant">
            <RefreshCw size={16} className="cursor-pointer hover:text-primary" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {structure.map((node) => (
            <FileTreeItem
              key={node.path}
              node={node}
              depth={0}
              selectedPath={selectedNode?.path ?? null}
              onSelect={setSelectedNode}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center bg-black p-8 text-center">
          {selectedNode ? (
            <div className="max-w-2xl w-full">
              <div className="mb-8 rounded-2xl border border-white/10 bg-surface-container-high/20 p-10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  {selectedNode.type === "folder" ? (
                    <Folder size={32} className="text-primary/80" />
                  ) : (
                    <FileJson size={32} className="text-primary/80" />
                  )}
                  <h3 className="text-3xl font-bold text-white font-mono">{selectedNode.name}</h3>
                </div>
                <p className="mx-auto max-w-md text-on-surface-variant font-mono text-sm">
                  {selectedNode.path}
                </p>
                {selectedNode.size ? (
                  <p className="mt-4 text-on-surface-variant text-xs">
                    Size: {(selectedNode.size / 1024).toFixed(1)} KB
                  </p>
                ) : null}
                {selectedNode.type === "folder" && selectedNode.children ? (
                  <p className="mt-2 text-on-surface-variant text-xs">
                    {selectedNode.children.filter(c => c.type === "file").length} files,{" "}
                    {selectedNode.children.filter(c => c.type === "folder").length} subdirectories
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl">
              <div className="mb-8 rounded-2xl border border-white/10 bg-surface-container-high/20 p-10 backdrop-blur-xl">
                <GitBranch size={72} className="mb-6 text-primary/80" />
                <h3 className="mb-3 text-3xl font-bold text-white">Project Structure</h3>
                <p className="mx-auto max-w-md text-on-surface-variant">
                  Select a file or folder from the explorer to view details.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  ["Total Files", `${statistics.files}`],
                  ["Folders", `${statistics.folders}`],
                  ["Max Depth", `${stats.depth} Levels`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="group cursor-pointer rounded-xl border border-white/5 bg-surface-container/20 p-4 transition-colors hover:border-white/20"
                  >
                    <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono transition-colors group-hover:text-primary">
                      {label}
                    </div>
                    <div className="text-2xl font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedNode && (
        <div className="flex w-[380px] shrink-0 flex-col border-l border-outline-variant bg-surface-container shadow-2xl">
          <div className="flex items-start justify-between border-b border-outline-variant/50 bg-surface-container-high/30 p-6">
            <div className="flex flex-col">
              <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">File Inspector</span>
              <h3 className="max-w-[260px] truncate font-mono text-xl font-bold text-white">{selectedNode.name}</h3>
            </div>
            <X size={16} className="cursor-pointer text-on-surface-variant transition-colors hover:text-white" onClick={() => setSelectedNode(null)} />
          </div>
          <div className="flex-1 space-y-10 overflow-y-auto p-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Path</label>
              <p className="font-mono text-sm text-white break-all">{selectedNode.path}</p>
            </div>

            {selectedNode.type === "folder" && selectedNode.children ? (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Contents</label>
                <p className="mt-2 text-sm text-on-surface-variant">
                  {selectedNode.children.length} items
                </p>
              </div>
            ) : null}

            {selectedNode.size ? (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Size</label>
                <p className="font-mono text-sm text-white">{(selectedNode.size / 1024).toFixed(1)} KB</p>
              </div>
            ) : null}

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Type</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {selectedNode.type === "folder" ? "Directory containing project files" : "Source code file"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}