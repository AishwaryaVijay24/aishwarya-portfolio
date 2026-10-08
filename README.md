# Aishwarya Vijay · AI × Software Engineering

Personal portfolio, built as a real software product:

```text
Browser → Next.js → FastAPI → PostgreSQL
```

- `CLAUDE.md`: engineering and build instructions
- `DESIGN.md`: visual and interaction source of truth
- `design/inspiration/`: raw design references

## Status

Phase 1 is in progress.

| Part | Status |
|---|---|
| Frontend (Next.js) | Built: all pages, design system, motion, tests |
| Backend (FastAPI + PostgreSQL) | Not started |
| Docker Compose | Not started |

Until the backend exists, pages that read portfolio data (projects, experience, research, skills) show a "data unavailable" state. That is expected.

## Frontend

Requirements: Node.js 22 or newer (developed on Node 24).

```bash
cd frontend
cp .env.example .env.local   # sets API_BASE_URL, the FastAPI address used by the server
npm install
npm run dev                  # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm test` | Unit and component tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |

### Structure

```text
frontend/
  app/                 routes: /, /about, /projects, /projects/[slug], /experience, /research, /ai-lab, /contact
  components/
    hero/              Hero, neural mesh (React Three Fiber, lazy-loaded, client-only)
    layout/            header, footer, page thread, page hero band
    navigation/        nav links with sliding marker, theme toggle
    projects/          project cards, layered tilt, generated network art
    experience/        numbered list
    architecture/      Living System diagram
    motion/            robot cursor companion
    technology/        technology list
    ui/                section heading, reveal, states, badges, terminal
  lib/
    api/               typed server-side client for the FastAPI backend
    config/site.ts     identity copy and external links (single source)
    content/           content about the site itself (build roadmap, architecture layers)
  tests/               Vitest tests
```

### API contract

The frontend expects these endpoints (CLAUDE.md "Phase 1 API"). Response shapes are defined in `frontend/lib/api/types.ts`; the backend's Pydantic schemas should match them.

- `GET /api/projects`, `GET /api/projects/{slug}`
- `GET /api/experience`, `GET /api/education`
- `GET /api/research`, `GET /api/publications`
- `GET /api/skills`

Data is fetched on the server per request. The browser never calls the backend directly, and error details are logged on the server, never shown to visitors.

### Configuration

- `API_BASE_URL`: backend address (see `frontend/.env.example`). Never commit `.env` files.
- External links (GitHub, LinkedIn, email) live in `frontend/lib/config/site.ts`. LinkedIn and email are hidden until set there.
