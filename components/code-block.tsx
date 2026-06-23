"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded border border-outline-variant/50 bg-[#000000]">
      <div className="flex items-center justify-between border-b border-outline-variant/30 bg-surface-container px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-white/20" />
          <span className="size-3 rounded-full bg-white/20" />
          <span className="size-3 rounded-full bg-white/20" />
          <span className="ml-2 text-[11px] font-bold uppercase tracking-widest text-outline font-mono-label">TypeScript / React</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-1 text-[11px] text-primary transition-colors hover:bg-white/10"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
      <pre className="overflow-x-auto p-6 text-xs leading-relaxed text-white/90">
        <code>{`import { useEffect } from 'react';
import Prism from 'prismjs';

// Custom component with line highlighting support
export const CodeViewer = ({ code, language, highlights }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className="line-numbers" data-line={highlights}>
      <code className={\`language-$\{language}\`}>
        {code}
      </code>
    </pre>
  );
};`}</code>
      </pre>
    </div>
  );
}
