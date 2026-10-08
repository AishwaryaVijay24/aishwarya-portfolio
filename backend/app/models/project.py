from sqlalchemy import Boolean, CheckConstraint, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, JSONList

# Honest status vocabulary: planned, prototype and experimental work must be labelled as such.
PROJECT_STATUSES = ("planned", "prototype", "experimental", "in_progress", "active", "completed")
# Visual treatment for the project's artwork, chosen to reflect what the project does.
PROJECT_VISUALS = ("agents", "pipeline", "services", "vectors", "lowrank", "app", "network")


class Project(Base):
    __tablename__ = "projects"
    __table_args__ = (
        CheckConstraint(f"status IN {PROJECT_STATUSES}", name="ck_projects_status"),
        CheckConstraint(f"visual IN {PROJECT_VISUALS}", name="ck_projects_visual"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    summary: Mapped[str | None] = mapped_column(Text)
    description: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(20))
    technologies: Mapped[list[str]] = mapped_column(JSONList, default=list)
    # Short display period, e.g. "2026" or "2026 – present".
    period: Mapped[str | None] = mapped_column(String(40))
    # One-line area, e.g. "AI agents" or "Retrieval research".
    category: Mapped[str | None] = mapped_column(String(80))
    # Verified key points or results, shown separately from the description.
    highlights: Mapped[list[str]] = mapped_column(JSONList, default=list)
    repository_url: Mapped[str | None] = mapped_column(String(500))
    paper_url: Mapped[str | None] = mapped_column(String(500))
    visual: Mapped[str] = mapped_column(String(20), default="network", server_default="network")
    demo_url: Mapped[str | None] = mapped_column(String(500))
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
