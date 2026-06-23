"use client";

import { FormEvent, useCallback, useState } from "react";
import type { AnalysisResult } from "@/lib/analysis-types";
import type { AppState, DashboardView } from "@/data/types";
import { loadingSteps } from "@/data/loading-steps";
import { AnalyzingScreen } from "@/components/analyzing-screen";
import { Dashboard } from "@/components/dashboard";
import { LandingPage } from "@/components/landing-page";

export default function DevLaunchApp() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [repoUrl, setRepoUrl] = useState("");
  const [activeView, setActiveView] = useState<DashboardView>("Overview");
  const [step, setStep] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "AI",
      text: "Ask me where a feature lives, which files matter, or how this repository is structured.",
    },
  ]);

  const startAnalysis = useCallback(async (url?: string) => {
    const targetUrl = url || repoUrl;
    if (!targetUrl) return;

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

  function onNewScan() {
    setAppState("landing");
    setAnalysisResult(null);
    setAnalysisError("");
    setMessages([
      {
        from: "AI",
        text: "Ask me where a feature lives, which files matter, or how this repository is structured.",
      },
    ]);
    setChatInput("");
  }

  async function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question || !analysisResult) return;

    setMessages((current) => [
      ...current,
      { from: "You", text: question },
    ]);
    setChatInput("");

    try {
      const res = await fetch(`/api/v1/analysis/${analysisResult.analysisId}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Chat failed");
      }

      const data = await res.json();
      setMessages((current) => [
        ...current,
        { from: "AI", text: data.answer },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Chat failed";
      setMessages((current) => [
        ...current,
        { from: "AI", text: `Error: ${message}` },
      ]);
    }
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
