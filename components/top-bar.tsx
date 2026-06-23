"use client";

import { Menu, ChevronRight, Search, Bell, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardView } from "@/data/types";

export function TopBar({ activeView, onNewScan }: { activeView: DashboardView; onNewScan: () => void }) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.06] bg-background/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Menu size={18} className="text-white/40" />
        <div className="flex items-center gap-2 text-sm text-white/40">
          <span>Dashboard</span>
          <ChevronRight size={12} />
          <span className="font-semibold text-white">{activeView}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1.5 text-white/40 transition-colors hover:text-white/70">
          <Search size={16} />
        </button>
        <button className="relative p-1.5 text-white/40 transition-colors hover:text-white/70">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-white" />
        </button>
        <div className="mx-1 h-5 w-px bg-white/[0.06]" />
        <Button variant="ghost" size="sm" onClick={onNewScan} className="text-xs">
          <RefreshCw size={13} />
          New Scan
        </Button>
      </div>
    </header>
  );
}
