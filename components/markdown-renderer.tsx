"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace("language-", "") || "plaintext";

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-red-500/50" />
          <span className="size-2.5 rounded-full bg-yellow-500/50" />
          <span className="size-2.5 rounded-full bg-green-500/50" />
          <span className="ml-2 text-[10px] font-mono tracking-wider text-white/30">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-1 text-[10px] text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy code"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-[13px] font-mono text-[#f472b6]">
      {children}
    </code>
  );
}

export function MarkdownRenderer({ text }: { text: string }) {
  return (
    <div className="prose prose-invert max-w-none
      prose-h1:text-xl prose-h1:font-bold prose-h1:text-white prose-h1:tracking-tight prose-h1:mt-8 prose-h1:mb-4
      prose-h2:text-base prose-h2:font-bold prose-h2:text-white prose-h2:tracking-tight prose-h2:mt-8 prose-h2:mb-3
      prose-h3:text-sm prose-h3:font-semibold prose-h3:text-white/90 prose-h3:mt-6 prose-h3:mb-2
      prose-h4:text-xs prose-h4:font-semibold prose-h4:text-white/80 prose-h4:uppercase prose-h4:tracking-wider prose-h4:mt-4 prose-h4:mb-2
      prose-p:text-sm prose-p:text-white/80 prose-p:leading-[1.75] prose-p:mb-4 prose-p:mt-0
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-strong:text-white prose-strong:font-bold
      prose-code:rounded prose-code:bg-white/[0.08] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[13px] prose-code:font-mono prose-code:text-[#f472b6] prose-code:before:content-none prose-code:after:content-none
      prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none prose-pre:my-6
      prose-li:text-sm prose-li:text-white/80 prose-li:leading-[1.75]
      prose-ul:mt-0 prose-ul:mb-4 prose-ol:mt-0 prose-ol:mb-4
      prose-li:marker:text-white/30
      prose-hr:border-white/[0.06] prose-hr:my-8
      prose-blockquote:border-l-primary prose-blockquote:border-l-2 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-white/60 prose-blockquote:my-6
      prose-table:text-sm prose-th:text-white/70 prose-th:border-white/[0.06] prose-td:border-white/[0.06] prose-th:px-3 prose-th:py-2 prose-td:px-3 prose-td:py-2
      prose-img:rounded-lg prose-img:my-6
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ className, children, ...props }) {
            const isInline = !className;
            const content = String(children).replace(/\n$/, "");
            if (isInline) {
              return <InlineCode>{content}</InlineCode>;
            }
            return <code className={className} {...props}>{children}</code>;
          },
          pre({ children }) {
            const child = React.Children.toArray(children)[0] as React.ReactElement<{ className?: string; children?: string }>;
            const code = child?.props?.children || "";
            const className = child?.props?.className;
            return <CodeBlock className={className}>{code}</CodeBlock>;
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
