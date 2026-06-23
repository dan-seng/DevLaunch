import { DashboardView } from "./types";
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  GitBranch,
  MessageSquare,
  FileText,
  BarChart3,
} from "lucide-react";

export const views: { id: DashboardView; icon: React.ReactNode }[] = [
  { id: "Overview", icon: <LayoutDashboard size={20} /> },
  { id: "AI Summary", icon: <Sparkles size={20} /> },
  { id: "Tech Stack", icon: <Layers size={20} /> },
  { id: "Project Structure", icon: <GitBranch size={20} /> },
  { id: "AI Chat", icon: <MessageSquare size={20} /> },
  { id: "README Generator", icon: <FileText size={20} /> },
  { id: "Insights", icon: <BarChart3 size={20} /> },
];
