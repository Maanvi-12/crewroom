"""Creates a sample team for local testing.

Run from apps/api:  uv run python -m api.seed
"""
from sqlalchemy import select

from api.config import settings
from api.db import SessionLocal
from api.models import Team, TeamMember


def main() -> None:
    with SessionLocal() as db:
        if db.scalar(select(Team).where(Team.name == "Orbit")):
            print("Sample team already exists.")
            return

        team = Team(name="Orbit", stack="python_fastapi", project_size="small", country="US")
        team.members = [
            TeamMember(user_id=settings.dev_user_id, display_name="You", role="developer"),
            TeamMember(display_name="AI Tester", role="tester", is_ai=True),
            TeamMember(display_name="AI Scrum Master", role="scrum_master", is_ai=True),
            TeamMember(display_name="AI Project Manager", role="project_manager", is_ai=True),
        ]
        db.add(team)
        db.commit()
        print(f"Created team {team.name} (id={team.id}).")


if __name__ == "__main__":
    main()