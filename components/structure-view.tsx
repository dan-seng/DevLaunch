"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  RefreshCw,
  ChevronDown,
  FolderOpen,
  Folder,
  FileJson,
  ChevronRight,
  X,
  GitBranch,
  Search,
} from "lucide-react";
import type { AnalysisResult, FileNode } from "@/lib/analysis-types";
import hljs from "highlight.js";

function useResizable(initial: number, min: number, max: number, dir: "left" | "right") {
  const [size, setSize] = useState(initial);
  const dragRef = useRef<{
    startX: number;
    startSize: number;
  } | null>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragRef.current = { startX: e.clientX, startSize: size };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [size],
  );

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current) return;
    const delta = e.clientX - dragRef.current.startX;
    const next = Math.min(max, Math.max(min, dragRef.current.startSize + (dir === "left" ? delta : -delta)));
    setSize(next);
  }, [min, max, dir]);

  const onMouseUp = useCallback(() => {
    dragRef.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, [onMouseMove]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  return [size, onMouseDown] as const;
}

function ResizableHandle({ onMouseDown }: { onMouseDown: (e: React.MouseEvent) => void }) {
  return (
    <div
      className="group relative w-[5px] shrink-0 cursor-col-resize"
      onMouseDown={onMouseDown}
    >
      <div className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 transition-colors group-hover:bg-primary/60 group-active:bg-primary" />
    </div>
  );
}

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

function CodeViewer({ content, filename }: { content: string; filename: string }) {
  const html = useMemo(() => {
    const code = content ?? "";
    const ext = filename.split(".").pop() ?? "";
    const lang = hljs.getLanguage(ext) ? ext : "";
    if (lang) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }, [content, filename]);

  return (
    <pre className="!m-0 !bg-transparent p-6 text-sm leading-relaxed overflow-x-auto">
      <code className="hljs font-mono" dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

export function StructureView({ analysisResult }: { analysisResult: AnalysisResult }) {
  const { structure, statistics } = analysisResult;
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const stats = countNodes(structure);

  const [explorerWidth, onExplorerDrag] = useResizable(340, 180, 600, "left");
  const [inspectorWidth, onInspectorDrag] = useResizable(380, 260, 600, "right");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStructure = useMemo(() => {
    if (!searchQuery.trim()) return structure;

    function filterNodes(nodes: FileNode[]): FileNode[] {
      const q = searchQuery.toLowerCase();
      return nodes.reduce<FileNode[]>((acc, node) => {
        if (node.name.toLowerCase().includes(q)) return acc.concat(node);
        if (node.children) {
          const filtered = filterNodes(node.children);
          if (filtered.length > 0) acc.push({ ...node, children: filtered });
        }
        return acc;
      }, []);
    }

    return filterNodes(structure);
  }, [structure, searchQuery]);

  useEffect(() => {
    if (!selectedNode || selectedNode.type === "folder") {
      setFileContent(null);
      setFileError("");
      return;
    }

    setFileLoading(true);
    setFileError("");

    fetch(`/api/v1/analysis/${analysisResult.analysisId}/file?path=${encodeURIComponent(selectedNode.path)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to read file");
        return res.json();
      })
      .then((data) => {
        setFileContent(data.content);
      })
      .catch(() => {
        setFileError("Could not read file content.");
      })
      .finally(() => setFileLoading(false));
  }, [selectedNode, analysisResult.analysisId]);

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
      <div
        className="flex shrink-0 flex-col border-r border-outline-variant"
        style={{ width: explorerWidth }}
      >
        <div className="border-b border-outline-variant/50">
          <div className="flex items-center justify-between p-4 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Explorer</span>
            <RefreshCw size={16} className="cursor-pointer text-on-surface-variant hover:text-on-surface" />
          </div>
          <div className="relative px-4 pb-3">
            <Search size={13} className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-outline-variant/50 bg-surface-container py-1.5 pl-8 pr-3 text-xs font-mono text-on-surface placeholder-on-surface-variant/50 outline-none transition-colors focus:border-on-surface-variant"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {filteredStructure.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-on-surface-variant/50 font-mono">
              No files match your search.
            </div>
          ) : (
            filteredStructure.map((node) => (
              <FileTreeItem
                key={node.path}
                node={node}
                depth={0}
                selectedPath={selectedNode?.path ?? null}
                onSelect={setSelectedNode}
              />
            ))
          )}
        </div>
      </div>

      <ResizableHandle onMouseDown={onExplorerDrag} />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {selectedNode && selectedNode.type === "file" ? (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b border-outline-variant/50 bg-surface-container-high/30 px-6 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileJson size={16} className="shrink-0 text-primary/80" />
                <span className="font-mono text-sm text-on-surface truncate">{selectedNode.path}</span>
              </div>
              {selectedNode.size ? (
                <span className="shrink-0 text-[10px] font-mono text-on-surface-variant">
                  {(selectedNode.size / 1024).toFixed(1)} KB
                </span>
              ) : null}
            </div>
            <div className="flex-1 overflow-auto bg-surface">
              {fileLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant font-mono">
                    <RefreshCw size={14} className="animate-spin" />
                    Reading file...
                  </div>
                </div>
              ) : fileError ? (
                <div className="flex items-center justify-center h-full text-sm text-on-surface-variant/50 font-mono">
                  {fileError}
                </div>
              ) : fileContent ? (
                <CodeViewer content={fileContent} filename={selectedNode.name} />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-on-surface-variant/50 font-mono">
                  Select a file to view its contents.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center bg-surface p-8 text-center">
            {selectedNode && selectedNode.type === "folder" ? (
              <div className="max-w-2xl w-full">
                <div className="mb-8 rounded-2xl border border-outline-variant/50 bg-surface-container-high/20 p-10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Folder size={32} className="text-primary/80" />
                    <h3 className="text-3xl font-bold text-on-surface font-mono">{selectedNode.name}</h3>
                  </div>
                  <p className="mx-auto max-w-md text-on-surface-variant font-mono text-sm">
                    {selectedNode.path}
                  </p>
                  {selectedNode.children ? (
                    <p className="mt-2 text-on-surface-variant text-xs">
                      {selectedNode.children.filter(c => c.type === "file").length} files,{" "}
                      {selectedNode.children.filter(c => c.type === "folder").length} subdirectories
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="max-w-2xl">
                <div className="mb-8 rounded-2xl border border-outline-variant/50 bg-surface-container-high/20 p-10 backdrop-blur-xl">
                  <GitBranch size={72} className="mb-6 text-primary/80" />
                  <h3 className="mb-3 text-3xl font-bold text-on-surface">Project Structure</h3>
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
                      className="group cursor-pointer rounded-xl border border-outline-variant/30 bg-surface-container/20 p-4 transition-colors hover:border-outline-variant"
                    >
                      <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono transition-colors group-hover:text-primary">
                        {label}
                      </div>
                      <div className="text-2xl font-bold text-on-surface">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedNode && (
        <>
          <ResizableHandle onMouseDown={onInspectorDrag} />
          <div
            className="flex shrink-0 flex-col border-l border-outline-variant bg-surface-container shadow-2xl"
            style={{ width: inspectorWidth }}
          >
            <div className="flex items-start justify-between border-b border-outline-variant/50 bg-surface-container-high/30 p-6">
              <div className="flex flex-col min-w-0">
                <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">File Inspector</span>
                <h3 className="truncate font-mono text-xl font-bold text-on-surface">{selectedNode.name}</h3>
              </div>
              <X size={16} className="shrink-0 cursor-pointer text-on-surface-variant transition-colors hover:text-on-surface" onClick={() => setSelectedNode(null)} />
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Path</label>
                <p className="font-mono text-sm text-on-surface break-all">{selectedNode.path}</p>
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
                  <p className="font-mono text-sm text-on-surface">{(selectedNode.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : null}

              {selectedNode.type === "file" && (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Extension</label>
                  <p className="font-mono text-sm text-on-surface">.{selectedNode.name.split(".").pop()}</p>
                </div>
              )}

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono">Type</label>
                <p className="mt-2 text-sm text-on-surface-variant">
                  {selectedNode.type === "folder" ? "Directory containing project files" : "Source code file"}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
