"use client";

import { useState } from "react";
import {
  FolderPlus,
  FilePlus,
  RefreshCw,
  Minimize2,
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
  Pencil,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function StructureView() {
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; mod: string; summary: string } | null>(
    { name: "Sidebar.tsx", size: "12.8 KB", mod: "Yesterday", summary: "Main navigation sidebar implementing dynamic JSON-based links and styling. It handles the active state detection and responsive transitions between mobile and desktop layouts." },
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
      <div className="flex w-[340px] shrink-0 flex-col border-r border-outline-variant">
        <div className="flex items-center justify-between border-b border-outline-variant/50 p-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono-label/60">Explorer</span>
          <div className="flex gap-2 text-on-surface-variant">
            <FolderPlus size={16} className="cursor-pointer hover:text-primary" />
            <FilePlus size={16} className="cursor-pointer hover:text-primary" />
            <RefreshCw size={16} className="cursor-pointer hover:text-primary" />
            <Minimize2 size={16} className="cursor-pointer hover:text-primary" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-2 font-mono-label text-xs">
          <div className="flex cursor-pointer items-center px-4 py-1 text-on-surface hover:bg-surface-variant/30">
            <ChevronDown size={14} className="mr-1 text-primary" />
            <FolderOpen size={14} className="mr-2 text-on-surface-variant" />
            <span>src</span>
          </div>
          <div className="pl-6">
            <div className="flex cursor-pointer items-center px-4 py-1 text-on-surface hover:bg-surface-variant/30">
              <ChevronDown size={14} className="mr-1 text-on-surface-variant" />
              <Folder size={14} className="mr-2 text-on-surface-variant" />
              <span>components</span>
            </div>
            <div className="ml-6 border-l border-outline-variant/30 pl-6">
              {[
                { name: "Button.tsx", size: "3.4 KB", mod: "2 hrs ago", summary: "Shared UI button component with variant support and accessibility focus." },
                { name: "Sidebar.tsx", size: "12.8 KB", mod: "Yesterday", summary: "Main navigation sidebar implementing dynamic JSON-based links and styling." },
                { name: "Card.tsx", size: "5.1 KB", mod: "3 days ago", summary: "Container component for displaying structured information in a responsive grid." },
              ].map((file) => (
                <div
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`flex cursor-pointer items-center px-4 py-1 transition-colors hover:text-on-surface ${
                    selectedFile?.name === file.name
                      ? "border-l-2 border-primary bg-white/5 font-bold text-on-surface"
                      : "text-on-surface-variant hover:bg-surface-variant/30"
                  }`}
                >
                  <FileJson size={14} className="mr-2 text-outline" />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
            <div className="flex cursor-pointer items-center px-4 py-1 text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface">
              <ChevronRight size={14} className="mr-1 text-on-surface-variant" />
              <Folder size={14} className="mr-2 text-on-surface-variant" />
              <span>hooks</span>
            </div>
            <div className="flex cursor-pointer items-center px-4 py-1 text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface">
              <FileJson size={14} className="mr-2 text-outline" />
              <span>App.tsx</span>
            </div>
            <div className="flex cursor-pointer items-center px-4 py-1 text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface">
              <FileType size={14} className="mr-2 text-outline" />
              <span>main.css</span>
            </div>
            <div className="flex cursor-pointer items-center px-4 py-1 text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface">
              <FileText size={14} className="mr-2 text-outline" />
              <span>types.d.ts</span>
            </div>
          </div>
          <div className="flex cursor-pointer items-center px-4 py-1 text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface">
            <Settings size={14} className="mr-2 text-outline" />
            <span>package.json</span>
          </div>
          <div className="flex cursor-pointer items-center px-4 py-1 text-on-surface-variant hover:bg-surface-variant/30 hover:text-on-surface">
            <FileText size={14} className="mr-2 text-outline" />
            <span>README.md</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center bg-black p-8 text-center">
          <div className="max-w-2xl">
            <div className="mb-8 rounded-2xl border border-white/10 bg-surface-container-high/20 p-10 backdrop-blur-xl">
              <GitBranch size={72} className="mb-6 text-primary/80" />
              <h3 className="mb-3 text-3xl font-bold text-white">Project Architecture Map</h3>
              <p className="mx-auto max-w-md text-on-surface-variant">
                Select a file or folder from the explorer to view AI-generated insights, dependencies, and code
                complexity metrics.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                ["Total Files", "1,284"],
                ["Complexity", "Low"],
                ["Depth", "8 Levels"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="group cursor-pointer rounded-xl border border-white/5 bg-surface-container/20 p-4 transition-colors hover:border-white/20"
                >
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono-label transition-colors group-hover:text-primary">
                    {label}
                  </div>
                  <div className="text-2xl font-bold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="flex w-[380px] shrink-0 flex-col border-l border-outline-variant bg-surface-container shadow-2xl">
          <div className="flex items-start justify-between border-b border-outline-variant/50 bg-surface-container-high/30 p-6">
            <div className="flex flex-col">
              <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">File Inspector</span>
              <h3 className="max-w-[260px] truncate font-mono-label text-xl font-bold text-white">{selectedFile.name}</h3>
            </div>
            <X size={16} className="cursor-pointer text-on-surface-variant transition-colors hover:text-white" />
          </div>
          <div className="flex-1 space-y-10 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono-label">Size</label>
                <p className="font-mono text-sm text-white">{selectedFile.size}</p>
              </div>
              <div className="text-right">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono-label">Modified</label>
                <p className="font-mono text-sm text-white">{selectedFile.mod}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono-label">AI Summary</span>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 p-5">
                <p className="text-sm italic leading-relaxed text-on-surface-variant">
                  &ldquo;{selectedFile.summary}&rdquo;
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-mono-label">
                Core Imports
              </label>
              <div className="space-y-2">
                {[
                  ["@react/core", "3.1.0"],
                  ["lucide-react", "0.2.4"],
                  ["tailwind-merge", "2.0.0"],
                ].map(([name, ver]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-3 font-mono-label text-xs"
                  >
                    <span className="text-on-surface">{name}</span>
                    <span className="text-on-surface-variant">{ver}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-outline-variant/30 pt-8">
              <Button className="w-full">
                <Pencil size={14} />
                Open in Editor
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 size={14} />
                Share Permalink
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
