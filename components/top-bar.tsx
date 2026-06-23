"use client";

import { Menu, ChevronRight, Search, Bell, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardView } from "@/data/types";

export function TopBar({ activeView, onNewScan }: { activeView: DashboardView; onNewScan: () => void }) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-outline-variant bg-black/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <Menu size={20} className="text-on-surface-variant" />
        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
          <span>Dashboard</span>
          <ChevronRight size={14} />
          <span className="font-semibold text-on-surface">{activeView}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-on-surface-variant transition-all hover:text-primary">
          <Search size={18} />
        </button>
        <button className="relative p-2 text-on-surface-variant transition-all hover:text-primary">
          <Bell size={18} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-white" />
        </button>
        <div className="mx-2 h-6 w-px bg-outline-variant" />
        <Button variant="ghost" size="sm" onClick={onNewScan}>
          <Upload size={14} />
          New Scan
        </Button>
      </div>
    </header>
  );
}
