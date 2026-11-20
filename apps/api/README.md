# Crewroom API

FastAPI backend for Crewroom.

## Run locally

1. Start Postgres (from the repo root):
   ```bash
   docker compose up -d
   ```
2. Set up the API:
   ```bash
   cd apps/api
   cp .env.example .env
   uv sync
   uv run alembic upgrade head
   ```
3. Start the server:
   ```bash
   uv run fastapi dev src/api/main.py
   ```
   - http://127.0.0.1:8000/health returns {"status": "ok"}
   - http://127.0.0.1:8000/docs shows the API docs

## Database migrations

When you add or change a table:

1. Edit the model in `src/api/models.py`.
2. Create a migration:
   ```bash
   uv run alembic revision --autogenerate -m "add users table"
   ```
3. Open the new file in `migrations/versions/` and check it looks right.
4. Apply it:
   ```bash
   uv run alembic upgrade head
   ```
5. Commit the migration file with your PR.

Undo the last migration: `uv run alembic downgrade -1`
