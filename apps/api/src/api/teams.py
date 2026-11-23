from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from api.auth import get_current_user_id
from api.db import get_db
from api.models import Team, TeamMember
from api.schemas import TeamOut

router = APIRouter(prefix="/teams", tags=["teams"])


@router.get("/me", response_model=TeamOut)
def get_my_team(
    user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
) -> Team:
    """Returns the team the logged-in user is on, with all its members."""
    team = db.scalar(
        select(Team)
        .join(TeamMember)
        .where(TeamMember.user_id == user_id)
        .options(selectinload(Team.members))
    )
    if team is None:
        raise HTTPException(status_code=404, detail="You're not on a team yet.")
    return team