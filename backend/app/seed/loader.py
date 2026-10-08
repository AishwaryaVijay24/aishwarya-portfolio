"""Loads verified portfolio content into the database.

The seed file is the single source of truth for Phase 1 content, so seeding
replaces every table in one transaction. Running it twice gives the same result.
"""

import json
from pathlib import Path

from sqlalchemy import delete
from sqlalchemy.orm import Session

from app.models import Education, Experience, Project, Publication, Research, Skill
from app.seed.schema import SeedFile

DEFAULT_SEED_FILE = Path(__file__).with_name("portfolio.json")


def load_seed_file(path: Path = DEFAULT_SEED_FILE) -> SeedFile:
    return SeedFile.model_validate(json.loads(path.read_text(encoding="utf-8")))


def apply_seed(session: Session, data: SeedFile) -> dict[str, int]:
    tables = [
        (Project, data.projects),
        (Experience, data.experience),
        (Education, data.education),
        (Research, data.research),
        (Publication, data.publications),
        (Skill, data.skills),
    ]
    try:
        for model, _ in tables:
            session.execute(delete(model))
        for model, items in tables:
            session.add_all(model(**item.model_dump(), sort_order=index) for index, item in enumerate(items))
        session.commit()
    except Exception:
        session.rollback()
        raise
    return {model.__tablename__: len(items) for model, items in tables}
