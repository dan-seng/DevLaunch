"use client";

import { Crown, Settings, HelpCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <aside className="fixed left-0 top-0 z-50 hidden h-full w-[280px] flex-col border-r border-outline-variant bg-surface-container p-5 lg:flex">
      <div className="mb-6 flex items-start gap-3 px-2">
        <div className="mt-1">
          <LogoMark />
        </div>
        <div>
          <h1 className="text-xl font-black text-primary tracking-tight">DevLaunch</h1>
          <p className="text-xs text-on-surface-variant/70" style={{ fontFamily: "var(--font-jetbrains)" }}>AI Analysis Engine</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {views.map(({ id, icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
              activeView === id
                ? "bg-white text-on-primary font-bold"
                : "text-on-surface-variant hover:bg-surface-variant/30"
            }`}
          >
            {icon}
            <span style={activeView !== id ? { fontFamily: "var(--font-jetbrains)" } : undefined}>{id}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="mb-1 text-sm font-bold text-primary" style={{ fontFamily: "var(--font-jetbrains)" }}>Upgrade to Pro</p>
          <p className="mb-3 text-xs leading-tight text-on-surface-variant">
            Unlock deep code forensics and unlimited analysis.
          </p>
          <Button className="w-full" size="sm">
            <Crown size={14} />
            Upgrade
          </Button>
        </div>

        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-variant/30" style={{ fontFamily: "var(--font-jetbrains)" }}>
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-variant/30" style={{ fontFamily: "var(--font-jetbrains)" }}>
            <HelpCircle size={18} />
            <span>Support</span>
          </button>
        </div>

        <div className="flex items-center gap-3 border-t border-outline-variant pt-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-surface-container-highest">
            <User size={16} className="text-on-surface-variant" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-on-surface">Alex Riveria</p>
            <p className="text-[10px] text-on-surface-variant">Lead Architect</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
