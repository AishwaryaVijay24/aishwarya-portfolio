"""Portfolio business logic. Route handlers call these; they never query the database directly."""

from sqlalchemy.orm import Session

from app.core.errors import NotFoundError
from app.models import Education, Experience, Project, Publication, Research, Skill
from app.repositories.portfolio import PortfolioRepository


class PortfolioService:
    def __init__(self, session: Session):
        self.repo = PortfolioRepository(session)

    def list_projects(self) -> list[Project]:
        return self.repo.list_projects()

    def get_project(self, slug: str) -> Project:
        project = self.repo.get_project_by_slug(slug)
        if project is None:
            raise NotFoundError("Project", slug)
        return project

    def list_experience(self) -> list[Experience]:
        return self.repo.list_experience()

    def list_education(self) -> list[Education]:
        return self.repo.list_education()

    def list_research(self) -> list[Research]:
        return self.repo.list_research()

    def list_publications(self) -> list[Publication]:
        return self.repo.list_publications()

    def list_skills(self) -> list[Skill]:
        return self.repo.list_skills()
