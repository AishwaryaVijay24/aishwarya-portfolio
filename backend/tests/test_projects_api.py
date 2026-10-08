FRONTEND_PROJECT_FIELDS = {
    "slug",
    "title",
    "summary",
    "description",
    "status",
    "technologies",
    "period",
    "category",
    "highlights",
    "repository_url",
    "demo_url",
    "paper_url",
    "visual",
    "featured",
}


def test_list_projects_featured_first(client):
    response = client.get("/api/projects")
    assert response.status_code == 200
    assert [p["slug"] for p in response.json()] == ["first", "second"]


def test_project_shape_matches_frontend_contract(client):
    project = client.get("/api/projects").json()[0]
    assert set(project) == FRONTEND_PROJECT_FIELDS
    assert project["technologies"] == ["Python", "FastAPI"]


def test_get_project_by_slug(client):
    response = client.get("/api/projects/second")
    assert response.status_code == 200
    body = response.json()
    assert body["title"] == "Second Project"
    assert body["status"] == "planned"
    assert body["technologies"] == []


def test_unknown_project_returns_structured_404(client):
    response = client.get("/api/projects/does-not-exist")
    assert response.status_code == 404
    assert response.json() == {
        "error": {"code": "not_found", "message": "Project 'does-not-exist' not found"}
    }


def test_unknown_route_returns_structured_404(client):
    response = client.get("/api/nothing-here")
    assert response.status_code == 404
    assert response.json()["error"]["code"] == "not_found"


def test_internal_errors_do_not_leak_details(client):
    from app.api.deps import get_portfolio_service

    class Exploding:
        def list_projects(self):
            raise RuntimeError("secret internal detail")

    client.app.dependency_overrides[get_portfolio_service] = lambda: Exploding()
    response = client.get("/api/projects")
    assert response.status_code == 500
    assert response.json() == {"error": {"code": "internal_error", "message": "Something went wrong."}}
    assert "secret" not in response.text
