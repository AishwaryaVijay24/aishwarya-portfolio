from sqlalchemy import CheckConstraint, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base

RESEARCH_STATUSES = ("planned", "in_progress", "completed", "published")


class Research(Base):
    __tablename__ = "research"
    __table_args__ = (CheckConstraint(f"status IN {RESEARCH_STATUSES}", name="ck_research_status"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(300))
    summary: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(20))
    url: Mapped[str | None] = mapped_column(String(500))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
