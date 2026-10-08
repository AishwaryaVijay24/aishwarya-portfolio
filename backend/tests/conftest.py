"""Test fixtures: an in-memory SQLite database seeded through the real seed loader."""

from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app import models  # noqa: F401  (registers tables)
from app.db.base import Base
from app.db.session import get_db
from app.main import create_app
from app.seed.loader import apply_seed
from app.seed.schema import SeedFile

SAMPLE = SeedFile.model_validate(
    {
        "projects": [
            {"slug": "second", "title": "Second Project", "status": "planned"},
            {
                "slug": "first",
                "title": "First Project",
                "status": "prototype",
                "technologies": ["Python", "FastAPI"],
                "featured": True,
            },
        ],
        "experience": [
            {
                "organization": "Org A",
                "role": "Engineer",
                "start_date": "2023-05",
                "highlights": ["Did a thing"],
            },
        ],
        "education": [
            {"institution": "University", "degree": "BSc", "start_date": "2019-09", "end_date": "2023-06"}
        ],
        "research": [{"title": "A research question", "status": "in_progress"}],
        "publications": [{"title": "A paper", "year": 2025, "authors": ["A. Author"]}],
        "skills": [
            {"name": "TypeScript", "category": "Languages"},
            {"name": "FastAPI", "category": "Backend"},
            {"name": "Python", "category": "Languages"},
        ],
    }
)


@pytest.fixture
def session_factory() -> Iterator[sessionmaker[Session]]:
    engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
    Base.metadata.create_all(engine)
    yield sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)
    engine.dispose()


@pytest.fixture
def session(session_factory) -> Iterator[Session]:
    with session_factory() as s:
        yield s


@pytest.fixture
def seeded(session) -> Session:
    apply_seed(session, SAMPLE)
    return session


@pytest.fixture
def client(session_factory, seeded) -> Iterator[TestClient]:
    app = create_app()

    def override() -> Iterator[Session]:
        with session_factory() as s:
            yield s

    app.dependency_overrides[get_db] = override
    with TestClient(app, raise_server_exceptions=False) as c:
        yield c
