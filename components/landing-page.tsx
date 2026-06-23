"use client";

import { FormEvent } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  Terminal,
  Globe,
  AtSign,
  GitBranch,
  MessageSquare,
  FileText,
  BarChart3,
  Code2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./logo-mark";
import { samples } from "@/data/samples";

export function LandingPage({
  repoUrl,
  setRepoUrl,
  analyze,
  pickSample,
}: {
  repoUrl: string;
  setRepoUrl: (value: string) => void;
  analyze: (event: FormEvent<HTMLFormElement>) => void;
  pickSample: (repo: string) => void;
}) {
  const logos = [
    "vercel",
    "linear",
    "stripe",
    "github",
    "raycast",
    "supabase",
  ];

  const capabilities = [
    {
      icon: <Code2 size={22} />,
      title: "Real-time Analysis",
      body: "Walks the full file tree, extracts metadata, and builds a complete structural map of any public repository.",
      span: "wide",
    },
    {
      icon: <Search size={22} />,
      title: "Tech Stack Detection",
      body: "Deterministic framework and language identification — no AI guesswork, just config-file inspection.",
      span: "narrow",
    },
    {
      icon: <MessageSquare size={22} />,
      title: "AI Chat",
      body: "Ask questions grounded in real files. Retrieval-augmented answers, not generic hallucination.",
      span: "narrow",
    },
    {
      icon: <GitBranch size={22} />,
      title: "Structure Map",
      body: "Interactive collapsible tree that mirrors the repository layout.",
      span: "narrow",
    },
    {
      icon: <FileText size={22} />,
      title: "Documentation",
      body: "Auto-generate a professional README from the repository context.",
      span: "narrow",
    },
    {
      icon: <BarChart3 size={22} />,
      title: "Project Insights",
      body: "Health scores across documentation, architecture, configuration, and maintainability.",
      span: "narrow",
    },
  ];

  return (
    <main className="min-h-[100dvh] bg-background text-on-surface">
      <nav className="sticky top-0 z-50 border-b border-white/[0.04] bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-base font-bold tracking-tight text-white">
              DevLaunch
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden items-center gap-2 sm:inline-flex"
            >
              <Terminal size={15} />
              GitHub
            </Button>
            <Button size="sm" className="px-5">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-0 px-5 pt-20 md:grid-cols-2 md:px-8 md:pt-28">
        <div className="absolute -top-20 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[140px] md:left-1/4" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 md:pr-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 block text-[11px] font-mono uppercase tracking-[0.2em] text-white/40"
          >
            AI Repository Intelligence
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.08] tracking-tight text-white"
          >
            Understand Any GitHub
            <br />
            <span className="text-white/60">Repository in Minutes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 max-w-md text-sm leading-relaxed text-white/50"
          >
            Paste a URL. Get instant architecture analysis, tech stack detection,
            and AI-powered documentation. No sign-up required.
          </motion.p>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={analyze}
          >
            <div className="flex flex-col gap-2 rounded-xl border border-white/[0.10] bg-white/[0.03] p-1.5 md:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 transition-colors focus-within:border-white/20">
                <Search size={15} className="shrink-0 text-white/30" />
                <input
                  value={repoUrl}
                  onChange={(event) => setRepoUrl(event.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="flex shrink-0 items-center gap-2 px-6"
              >
                Analyze
                <Sparkles size={14} />
              </Button>
            </div>
          </motion.form>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {["TypeScript", "React", "Next.js", "Python", "Go", "Rust"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] leading-none tracking-wider text-white/40"
                >
                  {item}
                </span>
              )
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-10 hidden md:mt-0 md:block"
        >
          <div className="sticky top-28 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-6">
            <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <div className="flex gap-1.5">
                <div className="size-2.5 rounded-full bg-red-500/60" />
                <div className="size-2.5 rounded-full bg-yellow-500/60" />
                <div className="size-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] font-mono tracking-wider text-white/30">
                analysis/preview
              </span>
            </div>
            <div className="space-y-2.5 font-mono text-xs leading-relaxed">
              <div className="flex">
                <span className="shrink-0 text-white/25">{">"}</span>
                <span className="ml-2 text-white/60">scan --repo react --deep</span>
              </div>
              <div className="flex">
                <span className="shrink-0 text-white/25">{">"}</span>
                <span className="ml-2 text-white/70">Framework: React v18.2</span>
              </div>
              <div className="flex">
                <span className="shrink-0 text-white/25">{">"}</span>
                <span className="ml-2 text-white/70">Language: TypeScript</span>
              </div>
              <div className="flex">
                <span className="shrink-0 text-white/25">{">"}</span>
                <span className="ml-2 text-white/70">Files: 1,247</span>
              </div>
              <div className="flex">
                <span className="shrink-0 text-white/25">{">"}</span>
                <span className="ml-2 text-[#22D3EE]">Structure: 14 directories</span>
              </div>
              <div className="mt-3 flex">
                <span className="shrink-0 text-white/25">$</span>
                <span className="ml-2 animate-pulse text-white/40">_</span>
              </div>
            </div>
            <div className="mt-5 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3">
              <div className="mb-1.5 text-[10px] text-white/30">
                QUICK STATS
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Files", value: "1.2k" },
                  { label: "Deps", value: "47" },
                  { label: "Score", value: "89" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-lg font-bold text-white">{s.value}</div>
                    <div className="text-[9px] tracking-wider text-white/30 font-mono">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-20 md:px-8 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-y border-white/[0.04] py-8"
        >
          <span className="text-[10px] tracking-[0.25em] text-white/30 font-mono">
            Trusted by
          </span>
          {logos.map((slug) => (
            <img
              key={slug}
              src={`https://cdn.simpleicons.org/${slug}/888`}
              alt={slug}
              className="h-5 opacity-30 grayscale transition-all hover:opacity-60"
            />
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-28 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex items-center justify-between"
        >
          <h2 className="text-lg font-bold tracking-tight text-white">
            Featured Repositories
          </h2>
          <div className="mx-6 h-px flex-1 bg-white/[0.04]" />
          <button className="flex items-center gap-1 text-sm text-white/40 transition-all hover:text-white/70">
            View all
            <ArrowRight size={14} />
          </button>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-[1.6fr_1fr_1fr]">
          {samples.slice(0, 3).map((sample, i) => (
            <motion.button
              key={sample.repo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => pickSample(sample.repo)}
              className={`group cursor-pointer rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 text-left transition-all hover:border-white/[0.12] hover:bg-white/[0.04] ${
                i === 0
                  ? "md:row-span-2 md:flex md:flex-col md:justify-between"
                  : ""
              }`}
            >
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-white/[0.06] text-white/80">
                    {sample.icon}
                  </div>
                  <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[9px] tracking-wider text-white/40 font-mono">
                    {sample.stars}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold tracking-tight text-white transition-colors group-hover:text-white/80">
                  {sample.repo}
                </h3>
                <p
                  className={`text-sm leading-relaxed text-white/50 ${
                    i === 0 ? "" : "line-clamp-2"
                  }`}
                >
                  {sample.summary}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {sample.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono tracking-[0.15em] text-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-5 pb-28 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="text-lg font-bold tracking-tight text-white">
            Capabilities
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-[2fr_1fr_1fr]">
          {capabilities.slice(0, 3).map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all hover:border-white/[0.10] ${
                i === 0 ? "md:row-span-2 md:flex md:flex-col md:justify-center" : ""
              }`}
            >
              <div
                className={`mb-4 flex size-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/70 ${
                  i === 0 ? "size-12" : ""
                }`}
              >
                {cap.icon}
              </div>
              <h3 className="mb-2 text-base font-bold tracking-tight text-white">
                {cap.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                {cap.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr_1fr]">
          {capabilities.slice(3).map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 text-center transition-all hover:border-white/[0.10]"
            >
              <div className="mb-4 flex justify-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/70">
                  {cap.icon}
                </div>
              </div>
              <h4 className="mb-2 text-sm font-bold tracking-tight text-white">
                {cap.title}
              </h4>
              <p className="text-xs leading-relaxed text-white/50">
                {cap.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.04]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-5 py-24 text-center md:px-8"
        >
          <h2 className="text-xl font-bold tracking-tight text-white">
            Ready to analyze your first repository?
          </h2>
          <p className="mb-2 max-w-md text-sm text-white/50">
            Paste any public GitHub URL and get a full breakdown in seconds.
          </p>
          <Button
            size="lg"
            onClick={() => document.querySelector("input")?.focus()}
            className="px-8"
          >
            Get Started
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </section>

      <footer className="border-t border-white/[0.04] bg-white/[0.01]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-tight text-white/30">D</span>
            <span className="text-xs text-white/30">
              2024 DevLaunch AI
            </span>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Status"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/40 transition-colors hover:text-white/60"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex size-8 items-center justify-center rounded-full border border-white/[0.06] transition-all hover:bg-white/[0.04]">
              <Globe size={14} className="text-white/40" />
            </div>
            <div className="flex size-8 items-center justify-center rounded-full border border-white/[0.06] transition-all hover:bg-white/[0.04]">
              <AtSign size={14} className="text-white/40" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
