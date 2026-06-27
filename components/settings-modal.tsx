"use client";

import { useState, useEffect } from "react";
import { X, Eye, EyeOff, Check, Trash2, Sun, Moon, KeyRound } from "lucide-react";
import { useTheme } from "./theme-provider";

export function SettingsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { theme, toggle } = useTheme();
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (open) {
      const stored = window.localStorage.getItem("devlaunch-gemini-key") || "";
      setApiKey(stored);
      setSaved(false);
    }
  }, [open]);

  function saveKey() {
    if (apiKey.trim()) {
      window.localStorage.setItem("devlaunch-gemini-key", apiKey.trim());
    } else {
      window.localStorage.removeItem("devlaunch-gemini-key");
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function clearHistory() {
    const keys = ["chatSessions", "analysisResult", "appState", "activeView"];
    for (const key of keys) {
      window.localStorage.removeItem(key);
    }
    window.location.reload();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-outline-variant/50 bg-surface-container-low p-6 shadow-2xl animate-in fade-in zoom-in-95">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-on-surface">Settings</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-overlay hover:text-on-surface">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-on-surface">
              <KeyRound size={16} />
              Gemini API Key
            </label>
            <p className="mb-3 text-xs text-on-surface-variant/70">
              Provide your own Gemini API key to bypass free-tier rate limits.
              Stored locally in your browser.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => { setApiKey(e.target.value); setSaved(false); }}
                  placeholder="AIzaSy..."
                  className="w-full rounded-lg border border-outline-variant/50 bg-surface-container py-2 pl-3 pr-10 text-sm font-mono text-on-surface placeholder-on-surface-variant/30 outline-none transition-colors focus:border-on-surface-variant"
                />
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-on-surface-variant/50 hover:text-on-surface"
                >
                  {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <button
                onClick={saveKey}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  saved
                    ? "bg-primary/20 text-primary"
                    : "bg-on-surface text-surface hover:brightness-90"
                }`}
              >
                {saved ? <Check size={16} /> : "Save"}
              </button>
            </div>
          </div>

          <div className="h-px bg-outline-variant/30" />

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-on-surface">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              Theme
            </label>
            <button
              onClick={toggle}
              className="flex w-full items-center justify-between rounded-lg border border-outline-variant/50 bg-surface-container px-4 py-2.5 text-sm text-on-surface transition-all hover:bg-surface-container-high"
            >
              <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
              <span className="text-xs text-on-surface-variant">Click to toggle</span>
            </button>
          </div>

          <div className="h-px bg-outline-variant/30" />

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-on-surface">
              <Trash2 size={16} />
              Clear History
            </label>
            <p className="mb-3 text-xs text-on-surface-variant/70">
              Remove all cached analyses, chat sessions, and reset the app to its initial state.
            </p>
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all hover:bg-red-500/20"
            >
              <Trash2 size={16} />
              Clear all data and reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
