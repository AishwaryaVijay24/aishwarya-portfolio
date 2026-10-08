from sqlalchemy import Boolean, CheckConstraint, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, JSONList

# Honest status vocabulary: planned, prototype and experimental work must be labelled as such.
PROJECT_STATUSES = ("planned", "prototype", "experimental", "in_progress", "active", "completed")


class Project(Base):
    __tablename__ = "projects"
    __table_args__ = (CheckConstraint(f"status IN {PROJECT_STATUSES}", name="ck_projects_status"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    summary: Mapped[str | None] = mapped_column(Text)
    description: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(20))
    technologies: Mapped[list[str]] = mapped_column(JSONList, default=list)
    repository_url: Mapped[str | None] = mapped_column(String(500))
    demo_url: Mapped[str | None] = mapped_column(String(500))
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
