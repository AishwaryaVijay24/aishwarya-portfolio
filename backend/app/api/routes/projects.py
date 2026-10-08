from fastapi import APIRouter

from app.api.deps import Portfolio
from app.schemas.portfolio import ProjectOut

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=list[ProjectOut])
def list_projects(service: Portfolio):
    return service.list_projects()


@router.get("/{slug}", response_model=ProjectOut, responses={404: {"description": "Project not found"}})
def get_project(slug: str, service: Portfolio):
    return service.get_project(slug)
