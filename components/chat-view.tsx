"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Plus, Zap, ThumbsUp, ThumbsDown, RefreshCw, Paperclip, Code, Mic, ArrowUp, Copy, Check } from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";

function TypingAnimation({ text, onDone }: { text: string; onDone: () => void }) {
  const [displayed, setDisplayed] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    setDisplayed(0);
    doneRef.current = false;
    if (!text) {
      onDone();
      return;
    }
    const timer = setInterval(() => {
      setDisplayed((prev) => (prev >= text.length ? prev : prev + 2));
    }, 10);
    return () => clearInterval(timer);
  }, [text, onDone]);

  useEffect(() => {
    if (displayed >= text.length && !doneRef.current) {
      doneRef.current = true;
      onDone();
    }
  }, [displayed, text.length, onDone]);

  return (
    <span className="whitespace-pre-wrap">
      {text.slice(0, displayed)}
      {displayed < text.length && (
        <span className="inline-block size-2 rounded-full bg-on-surface/60 animate-pulse ml-1 align-middle" />
      )}
    </span>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 py-3">
      <div className="flex items-center gap-1">
        <span className="size-1.5 rounded-full bg-on-surface/40 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="size-1.5 rounded-full bg-on-surface/40 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="size-1.5 rounded-full bg-on-surface/40 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

export function ChatView({
  messages,
  chatInput,
  setChatInput,
  askQuestion,
  chatLoading,
}: {
  messages: { from: string; text: string }[];
  chatInput: string;
  setChatInput: (value: string) => void;
  askQuestion: (event: FormEvent<HTMLFormElement>) => void;
  chatLoading: boolean;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [animationDone, setAnimationDone] = useState<Record<number, boolean>>({});
  const [messageCopied, setMessageCopied] = useState<Record<number, boolean>>({});
  const [codeCopied, setCodeCopied] = useState<Record<number, boolean>>({});

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        if (form) form.requestSubmit();
      }
    },
    [],
  );

  const latestAIIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].from === "AI") return i;
    }
    return -1;
  })();

  const extractAllCode = (text: string) => {
    const blocks: string[] = [];
    const regex = /```\w*\n([\s\S]*?)```/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      blocks.push(match[1].trim());
    }
    return blocks.join("\n\n");
  };

  const handleCopyMessage = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setMessageCopied((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => setMessageCopied((prev) => ({ ...prev, [index]: false })), 2000);
  };

  const handleCopyCode = (index: number, text: string) => {
    const code = extractAllCode(text);
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCodeCopied((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => setCodeCopied((prev) => ({ ...prev, [index]: false })), 2000);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden w-72 shrink-0 flex-col border-r border-outline-variant/50 bg-background md:flex">
          <div className="border-b border-outline-variant/30 p-4">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-outline-variant/50 bg-overlay py-2.5 text-sm text-on-surface/80 transition-all hover:bg-surface-container active:scale-[0.98]">
              <Plus size={16} />
              <span>New Conversation</span>
            </button>
          </div>
          <div className="flex items-center justify-center flex-1 p-6">
            <p className="text-center text-xs text-on-surface-variant/50 font-mono">
              Thread history coming soon
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-background min-w-0">
          <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-on-surface-variant/50 font-mono">Ask a question about the repository.</p>
              </div>
            ) : null}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "You" ? "justify-end" : "justify-start"} group`}>
                <div className={msg.from === "You" ? "max-w-[80%]" : "max-w-[90%] w-full"}>
                  <div
                    className={`flex items-center gap-2 mb-3 ${msg.from === "You" ? "justify-end" : ""}`}
                  >
                    {msg.from === "AI" && (
                      <div className="flex size-6 items-center justify-center rounded bg-surface-container">
                        <Zap size={13} className="text-on-surface" />
                      </div>
                    )}
                    <span className={`text-xs ${msg.from === "AI" ? "font-semibold uppercase tracking-wider text-on-surface/70" : "font-semibold text-on-surface/70"}`}>
                      {msg.from === "AI" ? "DevLaunch AI" : "You"}
                    </span>
                    {msg.from === "AI" && (
                      <div className="ml-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => handleCopyMessage(i, msg.text)}
                          className="rounded p-1 text-on-surface-variant/50 transition-colors hover:bg-overlay hover:text-on-surface/80"
                          title="Copy message"
                        >
                          {messageCopied[i] ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                        {extractAllCode(msg.text) && (
                          <button
                            onClick={() => handleCopyCode(i, msg.text)}
                            className="rounded p-1 text-on-surface-variant/50 transition-colors hover:bg-overlay hover:text-on-surface/80"
                            title="Copy code only"
                          >
                            {codeCopied[i] ? <Check size={12} /> : <Code size={12} />}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {msg.from === "You" ? (
                    <div className="rounded-2xl rounded-tr-sm border border-outline-variant/50 bg-surface-container px-5 py-3.5 text-sm text-on-surface shadow-lg">
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  ) : (
                    <div className="rounded-2xl rounded-tl-sm border border-outline-variant/30 bg-surface-container-low/60 px-6 py-5 text-sm text-on-surface/90 shadow-xl">
                      {i === latestAIIndex && !animationDone[i] ? (
                        <TypingAnimation
                          text={msg.text}
                          onDone={() => setAnimationDone((prev) => ({ ...prev, [i]: true }))}
                        />
                      ) : (
                        <MarkdownRenderer text={msg.text} />
                      )}
                    </div>
                  )}
                  {msg.from === "AI" && i === latestAIIndex && animationDone[i] && (
                    <div className="mt-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-lg p-1.5 text-on-surface-variant/50 transition-colors hover:bg-overlay hover:text-on-surface/80">
                        <ThumbsUp size={14} />
                      </button>
                      <button className="rounded-lg p-1.5 text-on-surface-variant/50 transition-colors hover:bg-overlay hover:text-on-surface/80">
                        <ThumbsDown size={14} />
                      </button>
                      <button className="rounded-lg p-1.5 text-on-surface-variant/50 transition-colors hover:bg-overlay hover:text-on-surface/80">
                        <RefreshCw size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="max-w-[90%] w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex size-6 items-center justify-center rounded bg-surface-container">
                      <Zap size={13} className="text-on-surface" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-on-surface/70">
                      DevLaunch AI
                    </span>
                  </div>
                  <div className="rounded-2xl rounded-tl-sm border border-outline-variant/30 bg-surface-container-low/60 px-6 py-5 shadow-xl">
                    <ThinkingDots />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-outline-variant/50 bg-gradient-to-t from-background via-background to-background px-4 pt-4 pb-6 md:px-6">
            <form onSubmit={askQuestion} className="mx-auto max-w-4xl">
              <div className="rounded-2xl border border-outline-variant/60 bg-surface-container p-2 shadow-2xl transition-all focus-within:border-outline">
                <textarea
                  ref={textareaRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask DevLaunch anything about your tech stack..."
                  rows={1}
                  className="w-full resize-none bg-transparent px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/50"
                  style={{ minHeight: "52px", maxHeight: "200px" }}
                  onInput={(e) => {
                    const el = e.currentTarget;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                  }}
                />
                <div className="flex items-center justify-between px-2 pb-1">
                  <div className="flex items-center gap-1">
                    <button type="button" className="rounded-lg p-2 text-on-surface-variant/50 transition-all hover:bg-overlay hover:text-on-surface/80" title="Attach Code File" tabIndex={-1}>
                      <Paperclip size={18} />
                    </button>
                    <button type="button" className="rounded-lg p-2 text-on-surface-variant/50 transition-all hover:bg-overlay hover:text-on-surface/80" title="Insert Snippet" tabIndex={-1}>
                      <Code size={18} />
                    </button>
                    <button type="button" className="rounded-lg p-2 text-on-surface-variant/50 transition-all hover:bg-overlay hover:text-on-surface/80" title="Voice Input" tabIndex={-1}>
                      <Mic size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="pr-3 text-[10px] font-mono text-on-surface-variant/50">Markdown</span>
                    <button
                      type="submit"
                      disabled={chatLoading || !chatInput.trim()}
                      className="flex size-9 items-center justify-center rounded-xl bg-on-surface text-surface shadow-lg transition-all hover:brightness-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowUp size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-center text-[10px] font-mono text-on-surface-variant/50">
                DevLaunch AI can make mistakes. Verify critical code in production environments.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
