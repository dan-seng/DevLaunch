# DevLaunch

**Repository Intelligence** — Paste any public GitHub URL and get a full structural, technological, and AI-powered analysis in seconds.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Google Gemini.

---

## Features

- **Automated repo analysis** — shallow-clones any public GitHub repo, walks the full file tree, counts files/folders/lines of code
- **Tech stack detection** — deterministic framework & language identification from config files (`package.json`, `Dockerfile`, etc.)
- **Interactive structure viewer** — resizable 3-pane explorer with syntax-highlighted code viewer, file search, and inspector sidebar
- **AI summary** — balanced, critical project overview via Google Gemini
- **AI chat** — RAG-style Q&A across your codebase (keyword index → relevant files → Gemini)
- **README generator** — one-click generation of professional project READMEs
- **Health insights** — computed scores for health, maintainability, documentation, and architecture
- **Dark/light theme** — full dual-theme support persisted to localStorage
- **Cleanup** — cloned repos are auto-pruned after 1 hour; no leaked disk space

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Animation | Motion (Framer Motion v12) |
| AI | Google Gemini 2.5 Flash (`@google/genai`) |
| Git | `simple-git` (shallow clone) |
| Markdown | `react-markdown`, `rehype-highlight`, `remark-gfm` |
| Icons | Lucide React |
| Code highlighting | highlight.js / PrismJS |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Google Gemini API key](https://aistudio.google.com/apikey) (free tier: 20 requests/day)

### Installation

```bash
git clone https://github.com/dan-seng/DevLaunch.git
cd DevLaunch
npm install
```

### Environment

Copy `.env.example` to `.env` and add your Gemini key:

```bash
cp .env.example .env
```

```
GEMINI_API_KEY=your_key_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Paste a GitHub URL and click **Analyze**.

### Production

```bash
npm run build
npm start
```

---

## Usage

1. **Landing page** — enter any public GitHub URL (or pick a sample repo)
2. **Analysis** — the server clones, scans, detects tech, computes insights, builds a search index
3. **Dashboard** — seven views to explore the result:
   - **Overview** — score, file stats, language distribution, quick navigation
   - **AI Summary** — auto-generated project summary (requires Gemini)
   - **Tech Stack** — languages, frameworks, dependencies, entry points
   - **Project Structure** — interactive file tree with code viewer and inspector
   - **AI Chat** — ask questions about the codebase (requires Gemini)
   - **README Generator** — generate a formatted README (requires Gemini)
   - **Insights** — health scores, dependency analysis, structural metrics

---

## API

All routes are under `/api/v1/`:

| Method | Route | Description |
|---|---|---|
| POST | `/analyze` | Start analysis (NDJSON stream) |
| GET | `/analysis/:id` | Get stored analysis result |
| DELETE | `/analysis/:id` | Delete analysis + cloned repo |
| POST | `/analysis/:id/summary` | Generate AI summary |
| POST | `/analysis/:id/chat` | Ask a question |
| POST | `/analysis/:id/readme` | Generate README |
| GET | `/analysis/:id/file?path=` | Read file contents |

---

## Project Structure

```
app/
  page.tsx                  # Main client app (landing → analyzing → dashboard)
  layout.tsx                # Root layout with fonts and ThemeProvider
  privacy/page.tsx          # Privacy policy
  terms/page.tsx            # Terms of service
  api/v1/                   # All API routes
components/                 # 21 React components + 4 UI primitives
  landing-page.tsx          # Animated landing with typing terminal, dot grid
  dashboard.tsx             # Dashboard layout with sidebar routing
  sidebar.tsx               # Navigation + theme toggle + mobile overlay
  structure-view.tsx        # 3-pane file explorer + code viewer
  chat-view.tsx             # AI chat UI
  readme-view.tsx           # README preview/raw/copy/generate
  bg-glow.tsx               # Theme-aware background gradient
  cursor-dots.tsx           # Interactive canvas dot grid
  typing-terminal.tsx       # Typewriter terminal animation
  theme-provider.tsx        # Dark/light context + localStorage
services/                   # 7 backend services
  analysis.service.ts       # Pipeline orchestrator + store + pruning
  github.service.ts         # Clone, validate, metadata, cleanup
  ai.service.ts             # Gemini integration
  file.service.ts           # File walk, read, count
  framework.service.ts      # Config-file-based framework detection
  language.service.ts       # Extension-based language detection
  repositoryIndex.service.ts # Keyword index for AI chat
```

---

## License

MIT
