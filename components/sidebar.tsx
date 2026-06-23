"use client";

import { Settings, HelpCircle } from "lucide-react";
import { LogoMark } from "./logo-mark";
import { views } from "@/data/views";
import type { DashboardView } from "@/data/types";

export function Sidebar({
  activeView,
  setActiveView,
}: {
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
}) {
  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-full w-[280px] flex-col border-r border-white/[0.06] bg-background p-5 lg:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <LogoMark />
        <div>
          <h1 className="text-base font-bold tracking-tight text-white">
            DevLaunch
          </h1>
          <p className="text-[10px] tracking-wider text-white/40 font-mono">
            AI Analysis Engine
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5">
        {views.map(({ id, icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
              activeView === id
                ? "bg-white/10 font-semibold text-white"
                : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"
            }`}
          >
            <span className={activeView === id ? "text-white" : "text-white/40"}>
              {icon}
            </span>
            <span>{id}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-0.5 pt-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/40 transition-all hover:bg-white/[0.04] hover:text-white/70">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/40 transition-all hover:bg-white/[0.04] hover:text-white/70">
          <HelpCircle size={18} />
          <span>Support</span>
        </button>
      </div>
    </aside>
  );
}
