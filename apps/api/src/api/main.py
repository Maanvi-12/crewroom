from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.config import settings

app = FastAPI(title="Crewroom API")

# Lets the Next.js frontend call this API from the browser.
origins = settings.cors_origins.split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}