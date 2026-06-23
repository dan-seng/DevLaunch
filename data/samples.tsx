import { Layers, Rocket, CheckSquare } from "lucide-react";

export const samples = [
  {
    repo: "reactjs/react",
    stars: "214k stars",
    summary: "The library for web and native user interfaces. Complex architecture with fiber engine analysis.",
    tags: ["TSX", "META", "UI FRAMEWORK"],
    icon: <Layers size={28} />,
  },
  {
    repo: "vercel/next.js",
    stars: "120k stars",
    summary: "The React Framework for the Web. Optimized for production and server-side analysis.",
    tags: ["SERVER COMPONENTS", "TURBOPACK"],
    icon: <Rocket size={28} />,
  },
  {
    repo: "facebook/jest",
    stars: "43k stars",
    summary: "Delightful JavaScript Testing. Analysis of comprehensive testing suites and mock engines.",
    tags: ["TESTING", "CLI"],
    icon: <CheckSquare size={28} />,
  },
];
