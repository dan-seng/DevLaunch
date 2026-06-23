"use client";

import { FormEvent } from "react";
import { Plus, Zap, ThumbsUp, ThumbsDown, RefreshCw, Paperclip, Code, Mic, ArrowUp } from "lucide-react";
import { CodeBlock } from "./code-block";

export function ChatView({
  messages,
  chatInput,
  setChatInput,
  askQuestion,
}: {
  messages: { from: string; text: string }[];
  chatInput: string;
  setChatInput: (value: string) => void;
  askQuestion: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-72 shrink-0 flex-col border-r border-outline-variant bg-surface-container-low">
          <div className="border-b border-outline-variant/30 p-4">
            <button className="flex w-full items-center justify-center gap-2 rounded border border-outline-variant/50 bg-surface-variant/50 py-2.5 text-sm text-on-surface transition-all hover:bg-surface-variant active:scale-[0.98]">
              <Plus size={16} />
              <span>New Conversation</span>
            </button>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            <div className="mt-2 px-2 py-3 text-[11px] font-bold uppercase tracking-widest text-outline font-mono-label">Recent Threads</div>
            <div className="block rounded bg-surface-variant px-3 py-3">
              <div className="mb-1 flex items-start justify-between">
                <span className="w-40 truncate text-xs text-on-surface">Refactor Auth Service</span>
                <span className="text-[10px] text-outline">2m ago</span>
              </div>
              <p className="line-clamp-1 text-[12px] text-on-surface-variant opacity-70">How can I implement JWT rotation safely?</p>
            </div>
            <div className="block rounded px-3 py-3 transition-colors hover:bg-surface-variant/50">
              <div className="mb-1 flex items-start justify-between">
                <span className="w-40 truncate text-xs text-on-surface">Tailwind Config Fix</span>
                <span className="text-[10px] text-outline">1h ago</span>
              </div>
              <p className="line-clamp-1 text-[12px] text-on-surface-variant opacity-70">The dark mode class isn&apos;t persisting on reload.</p>
            </div>
            <div className="block rounded px-3 py-3 transition-colors hover:bg-surface-variant/50">
              <div className="mb-1 flex items-start justify-between">
                <span className="w-40 truncate text-xs text-on-surface">Dockerize Node App</span>
                <span className="text-[10px] text-outline">Yesterday</span>
              </div>
              <p className="line-clamp-1 text-[12px] text-on-surface-variant opacity-70">Help me optimize the multi-stage build.</p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col bg-background">
          <div className="flex-1 space-y-6 overflow-y-auto px-10 py-8 z-10">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "You" ? "justify-end" : "justify-start"} group`}>
                <div className={msg.from === "You" ? "max-w-[80%]" : "max-w-[90%] w-full"}>
                  <div
                    className={`flex items-center gap-2 mb-2 ${msg.from === "You" ? "justify-end" : ""}`}
                  >
                    {msg.from === "AI" && (
                      <div className="flex size-6 items-center justify-center rounded bg-primary">
                        <Zap size={14} className="text-on-primary font-bold" />
                      </div>
                    )}
                    <span className={`text-xs ${msg.from === "AI" ? "font-bold uppercase tracking-wider text-primary" : "font-bold text-on-surface"}`}>
                      {msg.from === "AI" ? "DevLaunch AI" : "You"}
                    </span>
                    <span className="text-xs text-outline">14:23 PM</span>
                  </div>
                  {msg.from === "You" ? (
                    <div className="rounded-xl rounded-tr-none border border-white/10 bg-primary px-5 py-4 text-sm text-on-primary shadow-lg">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="rounded-xl rounded-tl-none border border-outline-variant/50 bg-surface-container-highest/80 px-6 py-6 text-sm text-on-surface shadow-2xl backdrop-blur-sm">
                      <div className="space-y-4 text-sm text-on-surface">
                        <p>{msg.text}</p>
                        {i === 0 && <CodeBlock />}
                        <ul className="list-disc space-y-2 pl-5 text-on-surface-variant">
                          <li><strong className="text-on-surface">Performance:</strong> Memoize the highlighted output to prevent re-renders on large files.</li>
                          <li><strong className="text-on-surface">Accessibility:</strong> Ensure contrast ratios meet WCAG 2.1 AA standards for code tokens.</li>
                          <li><strong className="text-on-surface">Theming:</strong> Synchronize the highlighter theme with your DevLaunch monochrome config.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {msg.from === "AI" && (
                    <div className="mt-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded p-2 text-outline transition-colors hover:bg-surface-variant hover:text-primary">
                        <ThumbsUp size={16} />
                      </button>
                      <button className="rounded p-2 text-outline transition-colors hover:bg-surface-variant hover:text-primary">
                        <ThumbsDown size={16} />
                      </button>
                      <button className="rounded p-2 text-outline transition-colors hover:bg-surface-variant hover:text-primary">
                        <RefreshCw size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="h-32" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
            <form onSubmit={askQuestion} className="relative mx-auto max-w-4xl">
              <div className="relative rounded border-2 border-outline-variant bg-black p-2 shadow-2xl transition-all focus-within:border-primary">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask DevLaunch anything about your tech stack..."
                  rows={1}
                  className="w-full resize-none bg-transparent px-4 py-3 text-sm text-on-surface outline-none placeholder:text-outline/50"
                  style={{ minHeight: "52px", maxHeight: "200px" }}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                  }}
                />
                <div className="flex items-center justify-between px-2 pb-1">
                  <div className="flex items-center gap-1">
                    <button type="button" className="rounded p-2 text-outline transition-all hover:bg-white/10 hover:text-primary" title="Attach Code File">
                      <Paperclip size={20} />
                    </button>
                    <button type="button" className="rounded p-2 text-outline transition-all hover:bg-white/10 hover:text-primary" title="Insert Snippet">
                      <Code size={20} />
                    </button>
                    <button type="button" className="rounded p-2 text-outline transition-all hover:bg-white/10 hover:text-primary" title="Voice Input">
                      <Mic size={20} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="border-r border-outline-variant/30 px-2 text-xs text-outline">Markdown Supported</span>
                    <button
                      type="submit"
                      className="flex size-10 items-center justify-center rounded bg-primary text-on-primary shadow-lg transition-all hover:brightness-90 active:scale-95"
                    >
                      <ArrowUp size={18} className="font-bold" />
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-outline">
                DevLaunch AI can make mistakes. Verify critical code in production environments.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
