"""Validation for the seed file. Strict on purpose: unknown fields and invented statuses fail loudly."""

import re
from datetime import date
from typing import Annotated

from pydantic import BaseModel, BeforeValidator, ConfigDict, Field

from app.schemas.portfolio import ProjectStatus, ProjectVisual, ResearchStatus

_MONTH = re.compile(r"^\d{4}-\d{2}$")


def _partial_date(value: object) -> object:
    """Accept 'YYYY-MM' (stored as the 1st of the month) as well as full ISO dates."""
    if isinstance(value, str) and _MONTH.match(value):
        year, month = value.split("-")
        return date(int(year), int(month), 1)
    return value


PartialDate = Annotated[date, BeforeValidator(_partial_date)]
Slug = Annotated[str, Field(pattern=r"^[a-z0-9]+(?:-[a-z0-9]+)*$", max_length=120)]


class Strict(BaseModel):
    model_config = ConfigDict(extra="forbid")


class SeedProject(Strict):
    slug: Slug
    title: str = Field(min_length=1, max_length=200)
    summary: str | None = None
    description: str | None = None
    status: ProjectStatus
    technologies: list[str] = []
    period: str | None = Field(default=None, max_length=40)
    category: str | None = Field(default=None, max_length=80)
    highlights: list[str] = []
    repository_url: str | None = None
    demo_url: str | None = None
    paper_url: str | None = None
    visual: ProjectVisual = "network"
    featured: bool = False


class SeedExperience(Strict):
    organization: str
    role: str
    location: str | None = None
    start_date: PartialDate
    end_date: PartialDate | None = None
    summary: str | None = None
    highlights: list[str] = []
    technologies: list[str] = []


class SeedEducation(Strict):
    institution: str
    degree: str
    field_of_study: str | None = None
    start_date: PartialDate | None = None
    end_date: PartialDate | None = None
    summary: str | None = None


class SeedResearch(Strict):
    title: str
    summary: str | None = None
    status: ResearchStatus
    url: str | None = None


class SeedPublication(Strict):
    title: str
    venue: str | None = None
    year: int | None = Field(default=None, ge=1900, le=2100)
    authors: list[str] = []
    url: str | None = None


class SeedSkill(Strict):
    name: str
    category: str


class SeedFile(Strict):
    projects: list[SeedProject] = []
    experience: list[SeedExperience] = []
    education: list[SeedEducation] = []
    research: list[SeedResearch] = []
    publications: list[SeedPublication] = []
    skills: list[SeedSkill] = []
