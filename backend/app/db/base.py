from sqlalchemy import JSON
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase

# JSONB on PostgreSQL, plain JSON elsewhere (SQLite in tests).
JSONList = JSON().with_variant(JSONB(), "postgresql")


class Base(DeclarativeBase):
    pass
