"use client";

import { FormEvent } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  GitBranch,
  MessageSquare,
  FileText,
  BarChart3,
  Code2,
  Search,
  Sun,
  Moon,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./logo-mark";
import { useTheme } from "./theme-provider";
import { BgGlow } from "./bg-glow";
import { CursorDots } from "./cursor-dots";
import { TypingTerminal } from "./typing-terminal";

export function LandingPage({
  repoUrl,
  setRepoUrl,
  analyze,
  pickSample,
  error,
}: {
  repoUrl: string;
  setRepoUrl: (value: string) => void;
  analyze: (event: FormEvent<HTMLFormElement>) => void;
  pickSample: (url: string) => void;
  error: string | null;
}) {
  const { theme, toggle } = useTheme();
  const logos = ["vercel", "linear", "stripe", "github", "raycast", "supabase"];

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
    <main className="relative z-10 min-h-[100dvh] bg-background text-on-surface">
      <BgGlow />
      <CursorDots />
      <div className="relative z-10">
        <nav className="sticky top-0 z-50 border-b border-outline-variant/30 bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 md:px-8">
            <div className="flex items-center gap-3">
              <LogoMark />
              <span className="text-base font-bold tracking-tight text-on-surface">
                DevLaunch
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggle}
                className="flex size-10 items-center justify-center rounded-lg text-on-surface-variant transition-all hover:bg-overlay hover:text-on-surface"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a
                href="https://github.com/dan-seng/DevLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-lg border border-outline-variant/50 px-4 py-2 text-sm font-medium text-on-surface-variant transition-all hover:bg-overlay hover:text-on-surface sm:inline-flex"
              >
                <Star size={16} />
                Star
              </a>
              <Button size="sm" className="px-5">
                Get Started
              </Button>
            </div>
          </div>
        </nav>

        <section className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-0 px-5 pt-20 md:grid-cols-2 md:px-8 md:pt-28">
          <div className="absolute -top-20 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-on-surface/[0.03] blur-[140px] md:left-1/4" />
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
              className="mb-6 block text-[11px] font-mono uppercase tracking-[0.2em] text-on-surface-variant"
            >
              AI Repository Intelligence
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-5 text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.08] tracking-tight text-on-surface"
            >
              Understand Any GitHub
              <br />
              <span className="text-primary">Repository in Minutes</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-10 max-w-md text-sm leading-relaxed text-on-surface-variant"
            >
              Paste a URL. Get instant architecture analysis, tech stack
              detection, and AI-powered documentation. No sign-up required.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              onSubmit={analyze}
            >
              <div className="flex flex-col gap-2 rounded-xl border border-outline-variant bg-overlay p-1.5 md:flex-row">
                <div className="flex flex-1 items-center gap-3 rounded-lg border border-outline-variant/50 bg-surface-container-high px-4 transition-colors focus-within:border-outline-variant">
                  <Search
                    size={15}
                    className="shrink-0 text-on-surface-variant/70"
                  />
                  <input
                    value={repoUrl}
                    onChange={(event) => setRepoUrl(event.target.value)}
                    placeholder="https://github.com/username/repository"
                    className="h-11 w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-on-surface-variant/70"
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
            {error ? (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 rounded-lg border border-error/30 bg-error/10 px-4 py-2 text-sm text-error"
              >
                {error}
              </motion.p>
            ) : null}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 flex flex-wrap items-center gap-2"
            >
              {["TypeScript", "React", "Next.js", "Python", "Go", "Rust"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-outline-variant/50 bg-surface-container-high px-2.5 py-1 text-[10px] leading-none tracking-wider text-on-surface-variant"
                  >
                    {item}
                  </span>
                ),
              )}
              <a
                href="https://github.com/dan-seng/DevLaunch"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 flex items-center gap-1.5 rounded-full border border-outline-variant/50 bg-surface-container-high px-3 py-1 text-[10px] font-medium tracking-wider text-on-surface-variant transition-all hover:bg-overlay hover:text-on-surface"
              >
                <Star size={12} />
                Star on GitHub
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-10 hidden md:mt-0 md:block"
          >
            <div
              className="sticky top-28 overflow-hidden rounded-2xl border border-outline-variant/50 bg-gradient-to-br from-surface-container-high to-transparent p-6"
              style={{
                boxShadow:
                  "0 25px 60px -15px var(--shadow-glow), 0 8px 20px -8px var(--shadow-glow)",
              }}
            >
              <div className="mb-3 flex items-center gap-2 border-b border-outline-variant/30 pb-3">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-500/60" />
                  <div className="size-2.5 rounded-full bg-yellow-500/60" />
                  <div className="size-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="text-[10px] font-mono tracking-wider text-on-surface-variant/70">
                  analysis/preview
                </span>
              </div>
              <TypingTerminal />
            </div>
          </motion.div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-20 md:px-8 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 border-y border-outline-variant/30 py-8"
          >
            <span className="text-[10px] tracking-[0.25em] text-on-surface-variant/70 font-mono">
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
            <h2 className="text-lg font-bold tracking-tight text-on-surface">
              How it works
            </h2>
            <div className="mx-6 h-px flex-1 bg-outline-variant/30" />
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Enter a repo URL",
                desc: "Paste any public GitHub repository URL into the input above.",
              },
              {
                step: "02",
                title: "Automated analysis",
                desc: "DevLaunch clones, scans, and maps your codebase — structure, technologies, and metrics.",
              },
              {
                step: "03",
                title: "Explore & understand",
                desc: "Browse interactive views, chat with your codebase, generate docs and summaries.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl border border-outline-variant/50 bg-surface-container-low p-7"
              >
                <span className="text-[10px] font-mono tracking-wider text-on-surface-variant/40">
                  {item.step}
                </span>
                <h3 className="mb-2 mt-4 text-base font-bold tracking-tight text-on-surface">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {item.desc}
                </p>
              </motion.div>
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
            <h2 className="text-lg font-bold tracking-tight text-on-surface">
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
                className={`rounded-2xl border border-outline-variant/50 bg-surface-container-low p-7 transition-all hover:border-outline-variant ${
                  i === 0
                    ? "md:row-span-2 md:flex md:flex-col md:justify-center"
                    : ""
                }`}
              >
                <div
                  className={`mb-4 flex size-10 items-center justify-center rounded-xl bg-surface-container-high text-on-surface-variant ${
                    i === 0 ? "size-12" : ""
                  }`}
                >
                  {cap.icon}
                </div>
                <h3 className="mb-2 text-base font-bold tracking-tight text-on-surface">
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">
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
                className="rounded-2xl border border-outline-variant/50 bg-surface-container-low p-7 text-center transition-all hover:border-outline-variant"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-surface-container-high text-on-surface-variant">
                    {cap.icon}
                  </div>
                </div>
                <h4 className="mb-2 text-sm font-bold tracking-tight text-on-surface">
                  {cap.title}
                </h4>
                <p className="text-xs leading-relaxed text-on-surface-variant">
                  {cap.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="border-t border-outline-variant/30">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-[1440px] flex-col items-center gap-4 px-5 py-24 text-center md:px-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-on-surface">
              Ready to analyze your first repository?
            </h2>
            <p className="mb-2 max-w-md text-sm text-on-surface-variant">
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

        <footer className="flex min-h-[80vh] flex-col justify-between border-t border-outline-variant/30 bg-surface-container-low px-6 py-10 md:px-16 md:py-14">
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
            <div className="text-2xl font-medium tracking-tight text-on-surface md:text-3xl">
              Understand any repo
            </div>
            <div className="flex gap-12 md:gap-24">
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Product
                </a>
                <a
                  href="#"
                  className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Docs
                </a>
                <a
                  href="#"
                  className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Changelog
                </a>
                <a
                  href="#"
                  className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Pricing
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="#"
                  className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Blog
                </a>
                <a
                  href="#"
                  className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  Status
                </a>
              </div>
            </div>
          </div>

          <div className="py-8 text-center md:py-12">
            <h1
              className="text-[clamp(4rem,14vw,10rem)] font-bold leading-[0.85] tracking-[-0.04em] text-on-surface"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                transitionProperty: "color",
                transitionDuration: "0.1s",
                transitionTimingFunction: "ease-in-out",
                transitionDelay: "0s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.setProperty("transition-delay", "1s");
                e.currentTarget.style.color = "var(--footer-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty("transition-delay", "0s");
                e.currentTarget.style.color = "";
              }}
            >
              DevLaunch
            </h1>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/30 pt-6 md:flex-row">
            <div className="flex items-center gap-3">
              <LogoMark />
              <span className="text-sm font-bold tracking-tight text-on-surface">
                DevLaunch
              </span>
            </div>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Status"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-on-surface-variant/70 transition-colors hover:text-on-surface"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
