from datetime import date

import pytest
from pydantic import ValidationError
from sqlalchemy import func, select

from app.models import Experience, Project
from app.seed.loader import DEFAULT_SEED_FILE, apply_seed, load_seed_file
from app.seed.schema import SeedFile
from tests.conftest import SAMPLE


def test_seed_is_repeatable(session):
    first = apply_seed(session, SAMPLE)
    second = apply_seed(session, SAMPLE)
    assert first == second
    assert session.scalar(select(func.count()).select_from(Project)) == 2


def test_seed_replaces_previous_content(session):
    apply_seed(session, SAMPLE)
    apply_seed(session, SeedFile(projects=SAMPLE.projects[:1]))
    assert [p.slug for p in session.scalars(select(Project))] == ["second"]
    assert session.scalar(select(func.count()).select_from(Experience)) == 0


def test_month_only_dates_become_first_of_month(session):
    apply_seed(session, SAMPLE)
    assert session.scalars(select(Experience)).one().start_date == date(2023, 5, 1)


def test_rejects_invented_project_status():
    with pytest.raises(ValidationError):
        SeedFile.model_validate({"projects": [{"slug": "x", "title": "X", "status": "launched"}]})


def test_rejects_unknown_fields():
    with pytest.raises(ValidationError):
        SeedFile.model_validate(
            {"projects": [{"slug": "x", "title": "X", "status": "planned", "users": 10000}]}
        )


def test_rejects_invalid_slug():
    with pytest.raises(ValidationError):
        SeedFile.model_validate({"projects": [{"slug": "Not A Slug", "title": "X", "status": "planned"}]})


def test_committed_seed_file_is_valid():
    load_seed_file(DEFAULT_SEED_FILE)
