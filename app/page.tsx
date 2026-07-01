"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import type { AnalysisResult } from "@/lib/analysis-types";
import type { AppState, DashboardView } from "@/data/types";
import { loadingSteps } from "@/data/loading-steps";
import { AnalyzingScreen } from "@/components/analyzing-screen";
import { Dashboard } from "@/components/dashboard";
import { LandingPage } from "@/components/landing-page";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface ChatSession {
  id: string;
  label: string;
  messages: { from: string; text: string }[];
}

const INITIAL_MESSAGES = [
  {
    from: "AI",
    text: "Ask me where a feature lives, which files matter, or how this repository is structured.",
  },
];

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function makeSession(messages?: { from: string; text: string }[]): ChatSession {
  return {
    id: generateSessionId(),
    label: "",
    messages: messages ?? INITIAL_MESSAGES,
  };
}

export default function DevLaunchApp() {
  const [appState, setAppState, hydrated] = useLocalStorage<AppState>("appState", "landing");
  const [repoUrl, setRepoUrl] = useState("");
  const [activeView, setActiveView] = useLocalStorage<DashboardView>("activeView", "Overview");
  const [step, setStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useLocalStorage<AnalysisResult | null>("analysisResult", null);
  const [analysisError, setAnalysisError] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatSessions, setChatSessions] = useLocalStorage<ChatSession[]>("chatSessions", [makeSession()]);

  const activeSession = chatSessions[0];
  const messages = activeSession?.messages ?? INITIAL_MESSAGES;

  function updateActiveMessages(updater: (prev: { from: string; text: string }[]) => { from: string; text: string }[]) {
    setChatSessions((prev) => {
      if (prev.length === 0) return [makeSession(updater([]))];
      const updated = { ...prev[0], messages: updater(prev[0].messages) };
      return [updated, ...prev.slice(1)];
    });
  }

  function onNewSession() {
    setChatSessions((prev) => [
      makeSession(),
      ...prev.map((s) => ({
        ...s,
        label: s.label || s.messages.find((m) => m.from === "You")?.text.slice(0, 40) || "Chat",
      })),
    ]);
  }

  function handleSelectSession(id: string) {
    setChatSessions((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx <= 0) return prev;
      const session = { ...prev[idx] };
      const rest = prev.filter((_, i) => i !== idx);
      return [session, ...rest];
    });
  }

  // Reset stale states on hydration — analyzing can't survive a refresh
  useEffect(() => {
    if (hydrated) {
      if (appState === "analyzing") {
        setAppState("landing");
      } else if (appState === "dashboard" && !analysisResult) {
        setAppState("landing");
      }
    }
  }, [hydrated]);

  const startAnalysis = useCallback(async (url?: string) => {
    const targetUrl = url || repoUrl;
    if (!targetUrl) return;

    if (analysisResult?.analysisId) {
      try {
        await fetch(`/api/v1/analysis/${analysisResult.analysisId}`, { method: "DELETE" });
      } catch { /* skip */ }
    }

    setStep(0);
    setAnalysisError("");
    setAppState("analyzing");

    try {
      const res = await fetch("/api/v1/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Analysis failed");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let hasResult = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);
            if (event.type === "progress") {
              setStep(event.step);
            } else if (event.type === "result") {
              setAnalysisResult(event.data);
              hasResult = true;
            } else if (event.type === "error") {
              setAnalysisError(event.message);
            }
          } catch {
            // skip malformed lines
          }
        }
      }

      if (hasResult) {
        window.setTimeout(() => {
          setAppState("dashboard");
          setActiveView("Overview");
        }, 450);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Analysis failed";
      setAnalysisError(message);
    }
  }, [repoUrl]);

  function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startAnalysis();
  }

  function handleSamplePick(repo: string) {
    const url = `https://github.com/${repo}`;
    setRepoUrl(url);
    startAnalysis(url);
  }

  async function onNewScan() {
    if (analysisResult?.analysisId) {
      try {
        await fetch(`/api/v1/analysis/${analysisResult.analysisId}`, { method: "DELETE" });
      } catch { /* skip */ }
    }
    setAppState("landing");
    setAnalysisResult(null);
    setAnalysisError("");
    setChatSessions([makeSession()]);
    setChatInput("");
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("appState");
      window.localStorage.removeItem("analysisResult");
      window.localStorage.removeItem("chatSessions");
      window.localStorage.removeItem("activeView");
    }
  }

  async function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question || !analysisResult) return;

    updateActiveMessages((current) => [
      ...current,
      { from: "You", text: question },
    ]);
    setChatInput("");
    setChatLoading(true);

    try {
      const apiKey = localStorage.getItem("devlaunch-gemini-key");
      const res = await fetch(`/api/v1/analysis/${analysisResult.analysisId}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Chat failed");
      }

      const data = await res.json();
      updateActiveMessages((current) => [
        ...current,
        { from: "AI", text: data.answer },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Chat failed";
      updateActiveMessages((current) => [
        ...current,
        { from: "AI", text: `Error: ${message}` },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="size-2 animate-pulse rounded-full bg-white/30" />
      </div>
    );
  }

  if (appState === "analyzing") {
    return (
      <AnalyzingScreen
        progress={Math.round(((step + 1) / loadingSteps.length) * 100)}
        step={step}
        error={analysisError}
      />
    );
  }

  if (appState === "dashboard" && analysisResult) {
    return (
      <Dashboard
        analysisResult={analysisResult}
        activeView={activeView}
        setActiveView={setActiveView}
        onNewScan={onNewScan}
        messages={messages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        askQuestion={askQuestion}
        chatLoading={chatLoading}
        chatSessions={chatSessions}
        onNewSession={onNewSession}
        onSelectSession={handleSelectSession}
      />
    );
  }

  return (
    <LandingPage
      repoUrl={repoUrl}
      setRepoUrl={setRepoUrl}
      analyze={analyze}
      pickSample={handleSamplePick}
      error={analysisError}
    />
  );
}
