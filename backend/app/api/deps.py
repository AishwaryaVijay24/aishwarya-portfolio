from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.portfolio import PortfolioService

DbSession = Annotated[Session, Depends(get_db)]


def get_portfolio_service(session: DbSession) -> PortfolioService:
    return PortfolioService(session)


Portfolio = Annotated[PortfolioService, Depends(get_portfolio_service)]
