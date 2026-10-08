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
| Backend (FastAPI + PostgreSQL) | Built: API, migrations, seed mechanism, tests |
| Docker Compose | Built: runs the full stack |
| Portfolio content | Seeded from the résumé in `content/`: projects, experience, education, publication, skills. Research: the IEEE-published CyberResponse paper |

## Run everything (Docker)

Requirements: Docker Desktop.

```bash
docker compose up --build
```

- Site: http://localhost:3000
- API: http://localhost:8000 (interactive docs at `/docs`)

On start, the backend applies migrations and loads `backend/app/seed/portfolio.json`; no manual database setup is needed.

If ports 3000, 8000 or 5432 are already used on your machine, copy `.env.example` to `.env` and change `FRONTEND_PORT`, `BACKEND_PORT` or `POSTGRES_PORT`.

```bash
docker compose down        # stop
docker compose down -v     # stop and delete the database volume
```

### Troubleshooting

- **Which URL?** Open `http://localhost:<FRONTEND_PORT>` (3000 by default, or the value in `.env`). The container log always says `localhost:3000`; that is the port inside the container, not on your machine.
- **"Bad Request" / "431" in the browser while the API works:** browsers send every `localhost` cookie to every port, and other local apps can make those headers too large for Node.js. The frontend raises Node's header limit to 64 KB; if it still happens, clear cookies for `localhost` or try a private window.
- **Projects "unavailable" with `npm run dev`:** the dev server reads `API_BASE_URL` from `frontend/.env.local` (default `http://localhost:8000`). Point it at the portfolio backend, e.g. `http://localhost:18000` if you changed `BACKEND_PORT`. The server log shows which URL it called.
- **Port already allocated:** another app is using that port. Change `FRONTEND_PORT`, `BACKEND_PORT` or `POSTGRES_PORT` in `.env`.

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

Accessibility is checked with axe-core (WCAG 2.2 A/AA) in both themes, a keyboard walkthrough of focus order and indicators, and reduced-motion checks.

### Structure

```text
frontend/
  app/                 routes: /, /about, /projects, /projects/[slug], /experience, /research, /ai-lab, /contact
  components/
    hero/              Hero, neural mesh (React Three Fiber, lazy-loaded, client-only)
    layout/            header, footer, page thread, page hero band
    navigation/        nav links with sliding marker, theme toggle
    projects/          spotlights, flip-card rail, editorial index, per-project visuals
    experience/        numbered list
    architecture/      Living System diagram
    motion/            cursor companion, reveals, magnetic CTAs, parallax
    technology/        technology list with logos (Simple Icons, CC0)
    ui/                section heading, reveal, states, badges, terminal
  lib/
    api/               typed server-side client for the FastAPI backend
    config/site.ts     identity copy and external links (single source)
    techIcons.ts       technology → logo mapping (exact brands or makers only)
    visuals.ts         project visual → accent colour
    content/           content about the site itself (build roadmap, architecture layers)
  app/icon.tsx, app/apple-icon.tsx, app/opengraph-image.tsx
                       generated browser icon and link-preview image
  assets/fonts/        static brand fonts (OFL) used by the generated images
  tests/               Vitest tests
```

### API contract

The frontend expects these endpoints (CLAUDE.md "Phase 1 API"). Response shapes are defined in `frontend/lib/api/types.ts`; the backend's Pydantic schemas should match them.

- `GET /api/projects`, `GET /api/projects/{slug}`
- `GET /api/experience`, `GET /api/education`
- `GET /api/research`, `GET /api/publications`
- `GET /api/skills`

Data is fetched on the server per request. The browser never calls the backend directly, and error details are logged on the server, never shown to visitors.

### Frontend configuration

- `API_BASE_URL`: backend address (see `frontend/.env.example`). Never commit `.env` files.
- `SITE_URL`: the site's public address, used for absolute link-preview URLs. In Docker it is passed at build time (set it in `.env`).
- External links (GitHub, LinkedIn, email) live in `frontend/lib/config/site.ts`. LinkedIn and email are hidden until set there.

## Backend

Requirements: Python 3.12 or newer, and PostgreSQL (the Compose `postgres` service works: `docker compose up postgres`).

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -e ".[dev]"
cp .env.example .env              # DATABASE_URL for your PostgreSQL
.venv/bin/alembic upgrade head    # create tables
.venv/bin/python -m app.seed      # load portfolio content
.venv/bin/uvicorn app.main:app --reload
```

| Command | What it does |
|---|---|
| `.venv/bin/pytest` | Tests (use in-memory SQLite, no database needed) |
| `.venv/bin/ruff check .` / `.venv/bin/ruff format .` | Lint / format |
| `.venv/bin/alembic revision --autogenerate -m "..."` | New migration after a model change |

### Structure

```text
backend/
  app/
    api/routes/     thin route handlers
    services/       business logic (e.g. not-found handling)
    repositories/   database queries
    models/         SQLAlchemy models
    schemas/        Pydantic response schemas (match frontend/lib/api/types.ts)
    core/           settings, structured error handling
    db/             engine, session, declarative base
    seed/           seed file, its validation schema, and loader
  alembic/          migrations
  tests/
```

### Errors

Errors are JSON: `{"error": {"code": "...", "message": "..."}}`, with codes `not_found` (404), `validation_error` (422), `database_unavailable` (503) and `internal_error` (500). Stack traces are logged on the server and never returned.

`GET /health` returns `{"status": "ok", "database": "ok"}`, or 503 with `"degraded"` when PostgreSQL is unreachable.

## Portfolio content (seed file)

All portfolio content lives in `backend/app/seed/portfolio.json`. Seeding replaces the database content with the file, so the file is the single source of truth and seeding twice gives the same result.

The file is validated strictly: unknown fields and statuses fail with a clear message. Only add verified information.

```json
{
  "projects": [
    {
      "slug": "my-project",
      "title": "My Project",
      "summary": "One sentence.",
      "description": "Paragraphs separated by a blank line.",
      "status": "prototype",
      "technologies": ["Python", "FastAPI"],
      "repository_url": null,
      "demo_url": null,
      "paper_url": null,
      "period": "2026",
      "category": "Retrieval",
      "highlights": ["One verified key point"],
      "visual": "pipeline",
      "featured": true
    }
  ],
  "experience": [{ "organization": "", "role": "", "location": null, "start_date": "2024-01", "end_date": null, "summary": null, "highlights": [], "technologies": [] }],
  "education": [{ "institution": "", "degree": "", "field_of_study": null, "start_date": "2020-09", "end_date": "2024-06", "summary": null }],
  "research": [{ "title": "", "summary": null, "status": "in_progress", "url": null }],
  "publications": [{ "title": "", "venue": null, "year": 2025, "authors": [], "url": null }],
  "skills": [{ "name": "Python", "category": "Languages" }]
}
```

- Project status: `planned`, `prototype`, `experimental`, `in_progress`, `active`, `completed`
- Project visual: `agents`, `pipeline`, `services`, `vectors`, `lowrank`, `app` or `network` (artwork shown for the project)
- Optional project fields: `period`, `category`, `highlights` (verified key points), `paper_url`
- Research status: `planned`, `in_progress`, `completed`, `published`
- Dates: `YYYY-MM` or `YYYY-MM-DD`; `end_date: null` means ongoing
- List order in the file is the display order (featured projects first)

After editing, restart the backend (`docker compose restart backend`) or run `python -m app.seed`.
