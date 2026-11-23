from pydantic import BaseModel, ConfigDict


class TeamMemberOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    display_name: str
    role: str
    is_ai: bool


class TeamOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    stack: str
    project_size: str
    country: str
    status: str
    members: list[TeamMemberOut]