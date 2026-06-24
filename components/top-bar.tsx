"use client";

import { Menu, ChevronRight, Search, Bell, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DashboardView } from "@/data/types";

export function TopBar({
  activeView,
  onNewScan,
  onMenuClick,
}: {
  activeView: DashboardView;
  onNewScan: () => void;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-outline-variant/50 bg-background/80 px-4 md:px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-1 text-on-surface-variant hover:text-on-surface lg:hidden"
        >
          <Menu size={18} />
        </button>
        <div className="hidden items-center gap-2 text-sm text-on-surface-variant sm:flex">
          <span>Dashboard</span>
          <ChevronRight size={12} />
          <span className="font-semibold text-on-surface">{activeView}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1.5 text-on-surface-variant transition-colors hover:text-on-surface">
          <Search size={16} />
        </button>
        <button className="relative p-1.5 text-on-surface-variant transition-colors hover:text-on-surface">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-on-surface" />
        </button>
        <div className="mx-1 h-5 w-px bg-outline-variant" />
        <Button variant="ghost" size="sm" onClick={onNewScan} className="text-xs">
          <RefreshCw size={13} />
          New Scan
        </Button>
      </div>
    </header>
  );
}
