from sqlalchemy.exc import OperationalError

from app.db.session import get_db


class BrokenSession:
    def execute(self, *args, **kwargs):
        raise OperationalError("SELECT 1", {}, Exception("connection refused"))

    def scalars(self, *args, **kwargs):
        raise OperationalError("SELECT", {}, Exception("connection refused"))


def test_health_ok(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "database": "ok"}


def test_health_reports_unavailable_database(client):
    client.app.dependency_overrides[get_db] = lambda: BrokenSession()
    response = client.get("/health")
    assert response.status_code == 503
    assert response.json() == {"status": "degraded", "database": "unavailable"}


def test_api_returns_503_without_details_when_database_is_down(client):
    client.app.dependency_overrides[get_db] = lambda: BrokenSession()
    response = client.get("/api/projects")
    assert response.status_code == 503
    assert response.json()["error"]["code"] == "database_unavailable"
    assert "connection refused" not in response.text
