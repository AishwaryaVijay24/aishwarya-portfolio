from fastapi import APIRouter, Response, status

from app.api.deps import DbSession
from app.schemas.portfolio import HealthOut
from app.services.health import database_is_reachable

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthOut)
def health(session: DbSession, response: Response) -> HealthOut:
    if database_is_reachable(session):
        return HealthOut(status="ok", database="ok")
    response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    return HealthOut(status="degraded", database="unavailable")
