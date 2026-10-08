# Aishwarya AI Engineering Portfolio

## PROJECT MISSION

Build a polished, production-oriented personal portfolio for Aishwarya Vijay.

This is not a generic developer portfolio.

The website must communicate Aishwarya's positioning at the intersection of:

* AI Engineering
* Full-Stack Software Engineering
* Backend Engineering
* Agentic AI
* LLMs
* RAG
* MCP
* Cloud Engineering
* AWS
* Kubernetes
* AI Research

The portfolio itself should demonstrate these engineering capabilities over time.

The final system will eventually include:

Next.js
→ FastAPI
→ PostgreSQL
→ AI/RAG
→ Portfolio Agent
→ MCP
→ Docker
→ Kubernetes
→ AWS
→ CI/CD
→ Observability

IMPORTANT:

Today we are ONLY building Phase 1.

Do not implement AWS, Kubernetes, MCP, agents, Terraform, or production infrastructure yet.

Build a strong foundation first.

---

# PHASE 1 GOAL

By the end of Phase 1, the complete portfolio must run locally on a Mac using Docker Compose.

Required:

* polished Next.js frontend
* FastAPI backend
* PostgreSQL database
* database migrations
* seeded portfolio data
* frontend/backend API integration
* Dockerfiles
* Docker Compose
* responsive UI
* reusable components
* clean project structure
* basic tests
* README setup instructions

The application must be runnable with:

docker compose up --build

---

# TECHNOLOGY STACK

## Frontend

* Next.js
* TypeScript
* React
* Tailwind CSS
* shadcn/ui where useful
* Framer Motion where useful (the `motion` package)
* React Three Fiber + Drei for the single hero 3D scene only (see DESIGN.md §8)

Use modern Next.js conventions.

Prefer server components where appropriate.

Use client components only when interactivity requires them.

---

## Backend

* Python
* FastAPI
* Pydantic
* SQLAlchemy
* Alembic

Backend structure:

backend/
app/
api/
core/
db/
models/
schemas/
services/
repositories/
tests/

Keep route handlers thin.

Business logic belongs in services.

Database access belongs in repositories/services rather than directly inside route handlers.

---

## Database

PostgreSQL.

Use SQLAlchemy models.

Use Alembic migrations.

Phase 1 database entities:

* projects
* experience
* education
* research
* publications
* skills

Keep the schema simple.

Do not over-engineer relationships.

---

# PHASE 1 API

Implement:

GET /health

GET /api/projects

GET /api/projects/{slug}

GET /api/experience

GET /api/education

GET /api/research

GET /api/publications

GET /api/skills

API responses must be typed and validated with Pydantic.

Return appropriate HTTP status codes.

---

# FRONTEND INFORMATION ARCHITECTURE

Create these pages:

/

/about

/projects

/projects/[slug]

/experience

/research

/ai-lab

/contact

The AI Lab page is Phase 1 UI only.

Do NOT implement the AI agent yet.

Instead, create a polished placeholder explaining that the Portfolio Agent is coming in a future phase.

---

# HOMEPAGE

The homepage must immediately communicate:

Aishwarya Vijay

AI × Software Engineering

A short positioning statement.

Primary actions:

Explore my work

Talk to my AI

The hero should feel like a modern engineering product.

Avoid generic portfolio templates.

---

# VISUAL DESIGN

The UI is extremely important.

Prioritize:

* excellent typography
* spacing
* hierarchy
* responsive layout
* subtle motion
* polished cards
* clean navigation
* tasteful gradients
* technical visual elements
* accessibility
* dark/light mode

The design should feel premium and modern.

Avoid:

* excessive neon
* excessive glassmorphism
* excessive animations
* giant gradients
* generic AI chatbot aesthetics
* clutter
* unnecessary 3D elements
* template-like layouts

Use animation to communicate structure, not decoration.

---

# DESIGN LANGUAGE

The visual identity should communicate:

Engineering
+
AI
+
Research
+
Systems

Use subtle technical motifs such as:

* grid backgrounds
* node/connection diagrams
* architecture flows
* terminal-style details
* system status indicators
* technical metadata
* animated connection lines

Do not make the website look like a cybersecurity dashboard.

---

# COMPONENT SYSTEM

Create reusable components.

Example:

components/
layout/
navigation/
hero/
projects/
experience/
research/
technology/
architecture/
ui/

Avoid duplicating UI.

Project cards should be reusable.

Technology badges should be reusable.

Buttons should use a consistent design system.

---

# PROJECT DATA

Do not hardcode project information throughout JSX.

Project information must come from the backend API.

For Phase 1, seed the database with verified information about:

* CyberResponse
* Resurgent Intelligence

Clearly label experimental/planned projects appropriately.

Never invent metrics.

Never invent users.

Never invent production usage.

Never invent technologies that have not actually been used.

---

# CONTENT TRUTHFULNESS

This rule is critical.

Never fabricate:

* employment history
* metrics
* project results
* users
* revenue
* publications
* awards
* technologies
* cloud deployments
* production systems

If something is planned:

say it is planned.

If something is experimental:

say it is experimental.

If something is a prototype:

say it is a prototype.

---

# ASSETS

Create:

public/
images/
profile/
projects/
research/
og/

icons/
technologies/
social/

diagrams/
architecture/
projects/

Prefer established icon libraries for technology logos.

Do not download random assets without checking licensing.

Use optimized images.

Use meaningful filenames.

---

# SOCIAL / EXTERNAL LINKS

Initial external links:

* GitHub
* LinkedIn
* email
* publications/research links where applicable

Keep these configurable rather than scattering URLs throughout components.

Create a central configuration/data file for external links.

---

# BACKEND / FRONTEND SEPARATION

The frontend must communicate with the backend through an API layer.

Do not directly connect the browser to PostgreSQL.

Architecture:

Browser
→ Next.js
→ FastAPI
→ PostgreSQL

Keep API client logic in a dedicated frontend module.

Example:

frontend/
lib/
api/
projects.ts
experience.ts
research.ts

---

# ERROR HANDLING

Frontend:

* loading states
* error states
* empty states

Backend:

* validation
* structured errors
* appropriate HTTP status codes

Never expose stack traces to the frontend.

---

# DOCKER

The project must run using Docker Compose.

Services:

frontend
backend
postgres

Development command:

docker compose up --build

Use environment variables.

Provide:

.env.example

Never commit:

.env

---

# DATABASE INITIALIZATION

The application must have a repeatable database setup.

Use:

Alembic migrations

and a seed mechanism.

A new developer should be able to clone the repository and start the application without manually creating database tables.

---

# TESTING

Phase 1 minimum:

Backend:

* health test
* project API tests
* database/repository tests where appropriate

Frontend:

* critical component tests where appropriate

Do not create meaningless tests purely to increase test count.

---

# ACCESSIBILITY

Use:

* semantic HTML
* keyboard navigation
* accessible labels
* sufficient contrast
* reduced-motion support where appropriate
* meaningful alt text

Interactive components must be keyboard accessible.

---

# PERFORMANCE

Do not unnecessarily ship large client-side bundles.

Prefer server rendering where appropriate.

Optimize images.

Avoid unnecessary API calls.

Use loading states rather than blocking the entire application.

---

# FUTURE ARCHITECTURE

The project will eventually evolve into:

Next.js
→ FastAPI
→ AI Agent
→ MCP tools
→ PostgreSQL + pgvector
→ Docker
→ Kubernetes
→ AWS EKS
→ RDS
→ S3
→ ECR
→ CloudWatch
→ GitHub Actions

Do not implement these future layers during Phase 1.

However, structure the code so they can be introduced without rewriting the entire application.

---

# FUTURE PORTFOLIO AGENT

Future agent:

Portfolio Agent

Purpose:

Answer questions about Aishwarya's verified portfolio information.

Potential future tools:

search_projects
get_project
search_experience
search_research
search_publications

The agent must be read-only.

It must never modify portfolio data.

It must never fabricate information.

It must eventually use retrieval/RAG.

Do not implement it during Phase 1.

---

# FUTURE PROJECT EXPLORER

A Project Explorer Agent may be introduced later.

It will explain:

* project architecture
* components
* engineering decisions
* AI workflows
* trade-offs
* implementation details

Do not implement it during Phase 1.

---

# DEVELOPMENT RULES

Before changing code:

1. Inspect the repository.
2. Understand the existing structure.
3. Identify affected files.
4. Make the smallest coherent change.
5. Run relevant tests.
6. Verify the result.

Do not rewrite working code unnecessarily.

Do not introduce frameworks without justification.

Do not create abstractions prematurely.

---

# CLAUDE CODE BEHAVIOR

When implementing a task:

* inspect before editing
* explain important architectural decisions
* keep changes scoped
* use existing patterns
* run tests
* fix errors
* verify behavior
* update documentation when necessary

Never claim something works without checking it.

If a decision has multiple reasonable options, prefer the simplest option that preserves future extensibility.

---

# PHASE 1 DEFINITION OF DONE

Phase 1 is complete when:

1. Next.js frontend works.
2. FastAPI backend works.
3. PostgreSQL works.
4. Docker Compose starts the entire stack.
5. Database migrations work.
6. Database seed data works.
7. Frontend consumes real backend APIs.
8. Projects render dynamically.
9. Experience renders dynamically.
10. Research renders dynamically.
11. Responsive design works.
12. Dark/light mode works.
13. Navigation works.
14. Project detail pages work.
15. Basic tests pass.
16. README contains setup instructions.
17. No secrets are committed.
18. The UI looks polished enough to publicly demonstrate.

Do not move to AWS/Kubernetes until this definition of done is satisfied.

---

# MOST IMPORTANT RULE

Build a beautiful, working product first.

Do not optimize for the number of technologies.

The goal is to demonstrate that Aishwarya can build intelligent production software from frontend to backend and eventually cloud infrastructure.

Every technical decision should support that story.
