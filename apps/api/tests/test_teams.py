import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from api.auth import get_current_user_id
from api.db import Base, get_db
from api.main import app
from api.models import Team, TeamMember

# Tests use a temporary in-memory database, so they never touch your real data.
engine = create_engine(
    "sqlite://",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSession = sessionmaker(bind=engine)


@pytest.fixture
def client():
    Base.metadata.create_all(engine)
    with TestingSession() as db:
        team = Team(name="Orbit", stack="python_fastapi", project_size="small", country="US")
        team.members = [
            TeamMember(user_id="user-1", display_name="Sara", role="developer"),
            TeamMember(display_name="AI Tester", role="tester", is_ai=True),
        ]
        db.add(team)
        db.commit()

    def override_get_db():
        with TestingSession() as db:
            yield db

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)


def test_returns_my_team(client):
    app.dependency_overrides[get_current_user_id] = lambda: "user-1"

    response = client.get("/teams/me")

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Orbit"
    assert len(data["members"]) == 2
    assert sum(member["is_ai"] for member in data["members"]) == 1
    assert "user_id" not in data["members"][0]


def test_not_on_a_team(client):
    app.dependency_overrides[get_current_user_id] = lambda: "someone-else"

    response = client.get("/teams/me")

    assert response.status_code == 404