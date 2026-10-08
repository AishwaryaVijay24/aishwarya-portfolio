from fastapi import APIRouter

from app.api.deps import Portfolio
from app.schemas.portfolio import EducationOut, ExperienceOut, PublicationOut, ResearchOut, SkillOut

router = APIRouter(prefix="/api", tags=["content"])


@router.get("/experience", response_model=list[ExperienceOut])
def list_experience(service: Portfolio):
    return service.list_experience()


@router.get("/education", response_model=list[EducationOut])
def list_education(service: Portfolio):
    return service.list_education()


@router.get("/research", response_model=list[ResearchOut])
def list_research(service: Portfolio):
    return service.list_research()


@router.get("/publications", response_model=list[PublicationOut])
def list_publications(service: Portfolio):
    return service.list_publications()


@router.get("/skills", response_model=list[SkillOut])
def list_skills(service: Portfolio):
    return service.list_skills()
