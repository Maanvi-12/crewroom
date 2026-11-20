from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from api.config import settings

engine = create_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False)


class Base(DeclarativeBase):
    """All database tables inherit from this."""


def get_db():
    """Gives each API request its own database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()