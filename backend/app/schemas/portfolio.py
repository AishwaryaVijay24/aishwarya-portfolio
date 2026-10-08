"""API response schemas. Field names match the frontend contract in frontend/lib/api/types.ts."""

from datetime import date
from typing import Literal

from pydantic import BaseModel, ConfigDict

ProjectStatus = Literal["planned", "prototype", "experimental", "in_progress", "active", "completed"]
ProjectVisual = Literal["agents", "pipeline", "services", "vectors", "lowrank", "app", "network"]
ResearchStatus = Literal["planned", "in_progress", "completed", "published"]


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class ProjectOut(ORMModel):
    slug: str
    title: str
    summary: str | None
    description: str | None
    status: ProjectStatus
    technologies: list[str]
    period: str | None
    category: str | None
    highlights: list[str]
    repository_url: str | None
    demo_url: str | None
    paper_url: str | None
    visual: ProjectVisual
    featured: bool


class ExperienceOut(ORMModel):
    id: int
    organization: str
    role: str
    location: str | None
    start_date: date
    end_date: date | None
    summary: str | None
    highlights: list[str]
    technologies: list[str]


class EducationOut(ORMModel):
    id: int
    institution: str
    degree: str
    field_of_study: str | None
    start_date: date | None
    end_date: date | None
    summary: str | None


class ResearchOut(ORMModel):
    id: int
    title: str
    summary: str | None
    status: ResearchStatus
    url: str | None


class PublicationOut(ORMModel):
    id: int
    title: str
    venue: str | None
    year: int | None
    authors: list[str]
    url: str | None


class SkillOut(ORMModel):
    id: int
    name: str
    category: str


class HealthOut(BaseModel):
    status: Literal["ok", "degraded"]
    database: Literal["ok", "unavailable"]
