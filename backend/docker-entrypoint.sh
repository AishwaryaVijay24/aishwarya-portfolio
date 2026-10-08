#!/bin/sh
# Container start: apply migrations, load the seed file, then serve the API.
set -e

alembic upgrade head

if [ "${SEED_ON_START:-true}" = "true" ]; then
  python -m app.seed
fi

exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --proxy-headers
