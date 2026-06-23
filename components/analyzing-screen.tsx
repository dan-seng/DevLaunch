"use client"

import { Check, RefreshCw } from "lucide-react"
import { LogoMark } from "./logo-mark"
import { loadingSteps } from "@/data/loading-steps"

export function AnalyzingScreen({ progress, step }: { progress: number; step: number }) {
  return (
    <main className="grid min-h-screen place-items-center overflow-hidden bg-background px-4 text-on-surface">
      <div className="absolute left-[-10%] top-[-10%] size-[40%] rounded-full bg-white/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] size-[40%] rounded-full bg-white/5 blur-[120px]" />
      <div className="relative z-10 w-full max-w-[480px] animate-[fade-up_0.45s_ease-out]">
        <div className="mb-8 flex flex-col items-center space-y-4">
          <div className="size-16">
            <LogoMark />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface">DevLaunch</h1>
          <p className="text-sm text-on-surface-variant/70 font-mono">AI Analysis Engine v2.4.0</p>
        </div>
        <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-high/40 shadow-2xl backdrop-blur-xl">
          <div className="flex items-end justify-between border-b border-outline-variant bg-surface-container-high/60 p-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-on-surface-variant font-mono">Operation Status</span>
              <h2 className="text-2xl font-bold text-on-surface">Analyzing Project...</h2>
            </div>
            <span className="text-2xl font-black text-white">{progress}%</span>
          </div>
          <div className="space-y-5 p-6">
            {loadingSteps.map((label, index) => {
              const complete = index < step;
              const active = index === step;
              return (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex size-6 items-center justify-center">
                    {complete ? (
                      <div className="flex size-6 items-center justify-center rounded-full border border-white/20 bg-white/10">
                        <Check size={14} className="text-white" />
                      </div>
                    ) : active ? (
                      <RefreshCw size={20} className="animate-spin text-white" style={{ animationDuration: "2s" }} />
                    ) : (
                      <div className="flex size-6 items-center justify-center rounded-full border border-outline-variant">
                        <div className="size-1.5 rounded-full bg-outline-variant" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={
                        complete
                          ? "text-on-surface-variant line-through opacity-50"
                          : active
                            ? "font-semibold text-on-surface"
                            : "text-on-surface-variant opacity-40"
                      }
                    >
                      {label}
                    </p>
                    {active ? (
                      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-2/3 rounded-full bg-white progress-shimmer" />
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t border-outline-variant bg-black px-6 py-4">
            <div className="mb-1 flex items-center gap-2">
              <div className="size-2 animate-pulse rounded-full bg-white" />
              <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant/60 font-mono">
                Terminal Output
              </span>
            </div>
            <div className="overflow-hidden whitespace-nowrap font-mono text-xs text-on-surface/70">
              <span className="text-on-surface-variant/40 font-mono">$</span> scan --dir ./src --deep <br />
              <span className="text-on-surface">Found:</span> React v18.2, TailwindCSS v3.4, TypeScript...
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-sm italic text-on-surface-variant/60">
          &ldquo;DevLaunch uses neural mapping to understand your file dependencies.&rdquo;
        </p>
      </div>
    </main>
  );
}
