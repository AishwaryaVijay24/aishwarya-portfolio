"""FastAPI application: read-only portfolio API (CLAUDE.md "Phase 1 API")."""

import logging

from fastapi import FastAPI

from app.api.routes import content, health, projects
from app.core.config import get_settings
from app.core.errors import register_error_handlers

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="Aishwarya Vijay Portfolio API",
        version="0.1.0",
        # Interactive docs only outside production.
        docs_url="/docs" if settings.app_env != "production" else None,
        redoc_url=None,
    )
    register_error_handlers(app)
    app.include_router(health.router)
    app.include_router(projects.router)
    app.include_router(content.router)
    return app


app = create_app()
