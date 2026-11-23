from datetime import datetime

from sqlalchemy import ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from api.db import Base


class Team(Base):
    __tablename__ = "teams"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    stack: Mapped[str] = mapped_column(String(50))
    project_size: Mapped[str] = mapped_column(String(20))
    country: Mapped[str] = mapped_column(String(2))
    status: Mapped[str] = mapped_column(String(20), default="active")
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    members: Mapped[list["TeamMember"]] = relationship(
        back_populates="team", cascade="all, delete-orphan"
    )


class TeamMember(Base):
    __tablename__ = "team_members"

    id: Mapped[int] = mapped_column(primary_key=True)
    team_id: Mapped[int] = mapped_column(ForeignKey("teams.id"))
    # Clerk user ID once login exists; empty for AI seats.
    user_id: Mapped[str | None] = mapped_column(String(64), index=True)
    display_name: Mapped[str] = mapped_column(String(100))
    role: Mapped[str] = mapped_column(String(30))
    is_ai: Mapped[bool] = mapped_column(default=False)
    joined_at: Mapped[datetime] = mapped_column(server_default=func.now())

    team: Mapped[Team] = relationship(back_populates="members")