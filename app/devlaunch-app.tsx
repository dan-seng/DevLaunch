"use client";

import { FormEvent, useEffect, useState } from "react";
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
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "AI",
      text: "Ask me where a feature lives, which files matter, or how this repository is structured.",
    },
  ]);

  useEffect(() => {
    if (appState !== "analyzing") return;
    const interval = window.setInterval(() => {
      setStep((current) => {
        if (current >= loadingSteps.length - 1) {
          window.clearInterval(interval);
          window.setTimeout(() => {
            setAppState("dashboard");
            setActiveView("Overview");
          }, 450);
          return current;
        }
        return current + 1;
      });
    }, 800);
    return () => window.clearInterval(interval);
  }, [appState]);

  function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startAnalysis();
  }

  function startAnalysis() {
    setStep(0);
    setAppState("analyzing");
  }

  function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question) return;
    setMessages((current) => [
      ...current,
      { from: "You", text: question },
      {
        from: "AI",
        text: "The likely entry point is app/page.tsx, with repository analysis planned under services/analysis.service.ts and API delegation through app/api/v1 routes.",
      },
    ]);
    setChatInput("");
  }

  if (appState === "analyzing") {
    return <AnalyzingScreen progress={Math.round(((step + 1) / loadingSteps.length) * 100)} step={step} />;
  }

  if (appState === "dashboard") {
    return (
      <Dashboard
        activeView={activeView}
        setActiveView={setActiveView}
        onNewScan={() => setAppState("landing")}
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
      pickSample={(repo) => {
        setRepoUrl(`https://github.com/${repo}`);
        startAnalysis();
      }}
    />
  );
}
