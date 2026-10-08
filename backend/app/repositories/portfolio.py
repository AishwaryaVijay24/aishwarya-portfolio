"""Database access for portfolio content. Read-only queries; ordering is decided here."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Education, Experience, Project, Publication, Research, Skill


class PortfolioRepository:
    def __init__(self, session: Session):
        self.session = session

    def list_projects(self) -> list[Project]:
        stmt = select(Project).order_by(Project.featured.desc(), Project.sort_order, Project.id)
        return list(self.session.scalars(stmt))

    def get_project_by_slug(self, slug: str) -> Project | None:
        return self.session.scalars(select(Project).where(Project.slug == slug)).first()

    def list_experience(self) -> list[Experience]:
        stmt = select(Experience).order_by(Experience.sort_order, Experience.start_date.desc(), Experience.id)
        return list(self.session.scalars(stmt))

    def list_education(self) -> list[Education]:
        stmt = select(Education).order_by(Education.sort_order, Education.start_date.desc(), Education.id)
        return list(self.session.scalars(stmt))

    def list_research(self) -> list[Research]:
        return list(self.session.scalars(select(Research).order_by(Research.sort_order, Research.id)))

    def list_publications(self) -> list[Publication]:
        stmt = select(Publication).order_by(Publication.sort_order, Publication.year.desc(), Publication.id)
        return list(self.session.scalars(stmt))

    def list_skills(self) -> list[Skill]:
        # Seed order is display order, so categories appear as written in the seed file.
        return list(self.session.scalars(select(Skill).order_by(Skill.sort_order, Skill.id)))
