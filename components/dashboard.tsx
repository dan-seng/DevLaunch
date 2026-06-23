"use client";

import { FormEvent } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { OverviewView } from "./overview-view";
import { SummaryView } from "./summary-view";
import { TechStackView } from "./tech-stack-view";
import { StructureView } from "./structure-view";
import { ChatView } from "./chat-view";
import { ReadmeView } from "./readme-view";
import { InsightsView } from "./insights-view";
import type { DashboardView } from "@/data/types";

export function Dashboard({
  activeView,
  setActiveView,
  onNewScan,
  messages,
  chatInput,
  setChatInput,
  askQuestion,
}: {
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
  onNewScan: () => void;
  messages: { from: string; text: string }[];
  chatInput: string;
  setChatInput: (value: string) => void;
  askQuestion: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="min-h-screen bg-background text-on-surface">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <section className="flex min-h-screen flex-col lg:ml-[280px]">
        <TopBar activeView={activeView} onNewScan={onNewScan} />
        <div className="mx-auto w-full max-w-[1440px] flex-1 px-6 py-8">
          {activeView === "Overview" ? <OverviewView setActiveView={setActiveView} /> : null}
          {activeView === "AI Summary" ? <SummaryView /> : null}
          {activeView === "Tech Stack" ? <TechStackView /> : null}
          {activeView === "Project Structure" ? <StructureView /> : null}
          {activeView === "AI Chat" ? (
            <ChatView messages={messages} chatInput={chatInput} setChatInput={setChatInput} askQuestion={askQuestion} />
          ) : null}
          {activeView === "README Generator" ? <ReadmeView /> : null}
          {activeView === "Insights" ? <InsightsView /> : null}
        </div>
      </section>
    </main>
  );
}
