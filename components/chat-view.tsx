"use client";

import { FormEvent } from "react";
import { Plus, Zap, ThumbsUp, ThumbsDown, RefreshCw, Paperclip, Code, Mic, ArrowUp } from "lucide-react";

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
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-72 shrink-0 flex-col border-r border-white/[0.06] bg-background">
          <div className="border-b border-white/[0.04] p-4">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] py-2.5 text-sm text-white/80 transition-all hover:bg-white/[0.08] active:scale-[0.98]">
              <Plus size={16} />
              <span>New Conversation</span>
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 p-6">
            <p className="text-center text-xs text-white/20 font-mono">
              Thread history coming soon
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-background min-w-0">
          <div className="flex-1 space-y-6 overflow-y-auto px-8 py-8">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-white/20 font-mono">Ask a question about the repository.</p>
              </div>
            ) : null}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "You" ? "justify-end" : "justify-start"} group`}>
                <div className={msg.from === "You" ? "max-w-[80%]" : "max-w-[90%] w-full"}>
                  <div
                    className={`flex items-center gap-2 mb-2 ${msg.from === "You" ? "justify-end" : ""}`}
                  >
                    {msg.from === "AI" && (
                      <div className="flex size-6 items-center justify-center rounded bg-white">
                        <Zap size={13} className="text-black" />
                      </div>
                    )}
                    <span className={`text-xs ${msg.from === "AI" ? "font-semibold uppercase tracking-wider text-white/70" : "font-semibold text-white/70"}`}>
                      {msg.from === "AI" ? "DevLaunch AI" : "You"}
                    </span>
                  </div>
                  {msg.from === "You" ? (
                    <div className="rounded-2xl rounded-tr-sm border border-white/[0.08] bg-white px-5 py-3.5 text-sm text-black shadow-lg">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.03] px-6 py-5 text-sm text-white/90 shadow-xl">
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  )}
                  {msg.from === "AI" && (
                    <div className="mt-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60">
                        <ThumbsUp size={14} />
                      </button>
                      <button className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60">
                        <ThumbsDown size={14} />
                      </button>
                      <button className="rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/60">
                        <RefreshCw size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="h-40" />
          </div>

          <div className="border-t border-white/[0.06] bg-gradient-to-t from-background via-background to-background px-6 pt-4 pb-6">
            <form onSubmit={askQuestion} className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-white/[0.10] bg-black p-2 shadow-2xl transition-all focus-within:border-white/30">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask DevLaunch anything about your tech stack..."
                  rows={1}
                  className="w-full resize-none bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
                  style={{ minHeight: "52px", maxHeight: "200px" }}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                  }}
                />
                <div className="flex items-center justify-between px-2 pb-1">
                  <div className="flex items-center gap-1">
                    <button type="button" className="rounded-lg p-2 text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/60" title="Attach Code File">
                      <Paperclip size={18} />
                    </button>
                    <button type="button" className="rounded-lg p-2 text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/60" title="Insert Snippet">
                      <Code size={18} />
                    </button>
                    <button type="button" className="rounded-lg p-2 text-white/30 transition-all hover:bg-white/[0.06] hover:text-white/60" title="Voice Input">
                      <Mic size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="pr-3 text-[10px] font-mono text-white/20">Markdown</span>
                    <button
                      type="submit"
                      className="flex size-9 items-center justify-center rounded-xl bg-white text-black shadow-lg transition-all hover:brightness-90 active:scale-95"
                    >
                      <ArrowUp size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-[10px] font-mono text-white/20">
                DevLaunch AI can make mistakes. Verify critical code in production environments.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
