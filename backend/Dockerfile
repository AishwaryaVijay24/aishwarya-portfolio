# syntax=docker/dockerfile:1

FROM python:3.14-slim
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1
WORKDIR /app

# Dependencies first, so code changes do not reinstall them.
COPY pyproject.toml ./
RUN mkdir -p app/seed && touch app/__init__.py && pip install . && rm -rf app build *.egg-info

COPY app ./app
COPY alembic ./alembic
COPY alembic.ini docker-entrypoint.sh ./

RUN useradd --system --no-create-home app && chmod +x docker-entrypoint.sh
USER app
EXPOSE 8000
HEALTHCHECK --interval=10s --timeout=3s --start-period=15s --retries=5 \
  CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=2).status == 200 else 1)"
ENTRYPOINT ["./docker-entrypoint.sh"]
