"use client";

import { FormEvent } from "react";
import { motion } from "motion/react";
import {
  Link,
  Sparkles,
  ArrowRight,
  Terminal,
  Globe,
  AtSign,
  GitBranch,
  MessageSquare,
  FileText,
  BarChart3,
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

  return (
    <main className="min-h-[100dvh] bg-background text-on-surface">
      <nav className="sticky top-0 z-50 border-b border-outline-variant/40 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-base font-bold text-primary">DevLaunch</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            {["Features", "Docs", "Pricing", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-on-surface-variant/70 transition-colors hover:text-primary"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex items-center gap-2">
              <Terminal size={15} />
              GitHub
            </Button>
            <Button size="sm" className="px-5">Get Started</Button>
          </div>
        </div>
      </nav>

      <section className="relative mx-auto max-w-[1440px] px-5 pt-24 pb-16 text-center md:px-8 md:pt-24">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[140px]" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-5 max-w-4xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight"
        >
          Understand Any <br />
          <span className="text-primary/80">Repository with AI</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-12 max-w-xl text-base leading-relaxed text-on-surface-variant/80"
        >
          Paste a GitHub URL and get instant architecture analysis, tech stack detection, and full documentation. No setup required.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={analyze}
          className="mx-auto mb-14 max-w-2xl"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.04] p-2 shadow-2xl md:flex-row md:gap-2">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/[0.10] bg-[#1a1a1a] px-4 transition-colors focus-within:border-white/30">
              <Link size={16} className="shrink-0 text-on-surface-variant/60" />
              <input
                value={repoUrl}
                onChange={(event) => setRepoUrl(event.target.value)}
                placeholder="https://github.com/username/repository"
                className="h-12 w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/60"
              />
            </div>
            <Button type="submit" size="lg" className="flex shrink-0 items-center gap-2 px-6">
              Analyze
              <Sparkles size={15} />
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["TypeScript", "React", "Next.js", "Python", "Go", "Rust"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] leading-none text-on-surface-variant/70"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.form>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-20 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-y border-white/[0.04] py-8">
          <span className="text-[11px] tracking-wider text-on-surface-variant/40 font-mono-label">Trusted by</span>
          {logos.map((slug) => (
            <img
              key={slug}
              src={`https://cdn.simpleicons.org/${slug}/888`}
              alt={slug}
              className="h-5 opacity-40 grayscale transition-all hover:opacity-70"
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-28 md:px-8">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-on-surface">Featured repositories</h2>
          <div className="mx-6 h-px flex-1 bg-white/[0.04]" />
          <button className="flex items-center gap-1 text-sm text-on-surface-variant/60 transition-all hover:text-primary">
            View all
            <ArrowRight size={15} />
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-[1.6fr_1fr_1fr]">
          {samples.slice(0, 3).map((sample, i) => (
            <motion.button
              key={sample.repo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => pickSample(sample.repo)}
              className={`group cursor-pointer rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-left transition-all hover:border-white/[0.12] hover:bg-white/[0.04] ${i === 0 ? "md:row-span-2 md:flex md:flex-col md:justify-between" : ""}`}
            >
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-white/[0.06] text-white">
                    {sample.icon}
                  </div>
                  <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] text-on-surface-variant/60">
                    {sample.stars}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-on-surface transition-colors group-hover:text-primary/90">
                  {sample.repo}
                </h3>
                <p className={`text-sm leading-relaxed text-on-surface-variant/60 ${i === 0 ? "" : "line-clamp-2"}`}>
                  {sample.summary}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {sample.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-28 md:px-8">
        <div className="mb-10">
          <h2 className="text-lg font-bold text-on-surface">Capabilities</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-[1.6fr_1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
          >
            <p className="mb-2 text-[11px] tracking-wider text-on-surface-variant/40 font-mono-label">Intelligence</p>
            <h3 className="mb-3 text-xl font-bold text-white">Real-time Code Analysis</h3>
            <p className="max-w-md text-sm leading-relaxed text-on-surface-variant/60">
              Maps dependency graphs, identifies design patterns, and highlights technical debt in seconds.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center"
          >
            <GitBranch size={28} className="mb-3 text-white" />
            <h4 className="mb-1 text-sm font-bold text-white">Structure Map</h4>
            <p className="text-xs text-on-surface-variant/50">Visual file tree</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center"
          >
            <MessageSquare size={28} className="mb-3 text-white" />
            <h4 className="mb-1 text-sm font-bold text-white">AI Context</h4>
            <p className="text-xs text-on-surface-variant/50">Chat with source</p>
          </motion.div>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1.6fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center"
          >
            <FileText size={28} className="mb-3 text-white" />
            <h4 className="mb-1 text-sm font-bold text-white">Docs Gen</h4>
            <p className="text-xs text-on-surface-variant/50">Auto README</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-8"
          >
            <h4 className="mb-1 text-sm font-bold text-white">Dependency Insights</h4>
            <p className="text-xs leading-relaxed text-on-surface-variant/50">
              Visualize your dependency graph. Spot circular deps, outdated packages, and security vulnerabilities.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center"
          >
            <BarChart3 size={28} className="mb-3 text-white" />
            <h4 className="mb-1 text-sm font-bold text-white">Metrics</h4>
            <p className="text-xs text-on-surface-variant/50">Health scores</p>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/[0.04]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-5 py-20 text-center md:px-8">
          <h2 className="text-xl font-bold text-on-surface">Ready to analyze your first repository?</h2>
          <p className="mb-2 max-w-md text-sm text-on-surface-variant/60">
            Paste any public GitHub URL and get a full breakdown in seconds.
          </p>
          <Button size="lg" onClick={() => document.querySelector("input")?.focus()} className="px-8">
            Get Started
            <ArrowRight size={16} />
          </Button>
        </div>
      </section>

      <footer className="border-t border-white/[0.04] bg-white/[0.01]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            <span className="text-xs tracking-tight text-on-surface-variant/40">D</span>
            <span className="text-xs text-on-surface-variant/40">2024 DevLaunch AI</span>
          </div>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Changelog", "Status"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-on-surface-variant/50 transition-colors hover:text-on-surface-variant"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="flex size-9 items-center justify-center rounded-full border border-white/[0.06] transition-all hover:bg-white/[0.04]">
              <Globe size={15} className="text-on-surface-variant/50" />
            </div>
            <div className="flex size-9 items-center justify-center rounded-full border border-white/[0.06] transition-all hover:bg-white/[0.04]">
              <AtSign size={15} className="text-on-surface-variant/50" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
