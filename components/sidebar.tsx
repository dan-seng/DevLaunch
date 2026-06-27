"use client";

import { useState } from "react";
import { Settings, HelpCircle, Sun, Moon, X } from "lucide-react";
import { LogoMark } from "./logo-mark";
import { views } from "@/data/views";
import type { DashboardView } from "@/data/types";
import { useTheme } from "./theme-provider";
import { SettingsModal } from "./settings-modal";

export function Sidebar({
  activeView,
  setActiveView,
  mobileOpen,
  onMobileClose,
}: {
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const { theme, toggle } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const inner = (
    <>
      <div className="mb-8 flex items-center gap-3 px-2">
        <LogoMark />
        <div>
          <h1 className="text-base font-bold tracking-tight text-on-surface">
            DevLaunch
          </h1>
          <p className="text-[10px] tracking-wider text-on-surface-variant font-mono">
            AI Analysis Engine
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5">
        {views.map(({ id, icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveView(id);
              onMobileClose?.();
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
              activeView === id
                ? "bg-overlay font-semibold text-on-surface"
                : "text-on-surface-variant hover:bg-overlay hover:text-on-surface"
            }`}
          >
            <span className={activeView === id ? "text-on-surface" : "text-on-surface-variant"}>
              {icon}
            </span>
            <span>{id}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-0.5 pt-4">
        <button
          onClick={toggle}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-all hover:bg-overlay hover:text-on-surface"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button onClick={() => setSettingsOpen(true)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-all hover:bg-overlay hover:text-on-surface">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <a
          href="https://github.com/dan-seng/DevLaunch/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface-variant transition-all hover:bg-overlay hover:text-on-surface"
        >
          <HelpCircle size={18} />
          <span>Support</span>
        </a>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-full w-[280px] flex-col border-r border-outline-variant/50 bg-background p-5 lg:flex">
        {inner}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <aside className="relative flex h-full w-[280px] flex-col border-r border-outline-variant/50 bg-background p-5 shadow-2xl animate-in slide-in-from-left">
            <button
              onClick={onMobileClose}
              className="absolute right-4 top-5 text-on-surface-variant hover:text-on-surface"
            >
              <X size={18} />
            </button>
            {inner}
          </aside>
        </div>
      )}

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
