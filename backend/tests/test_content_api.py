def test_experience(client):
    response = client.get("/api/experience")
    assert response.status_code == 200
    [entry] = response.json()
    assert entry["organization"] == "Org A"
    assert entry["start_date"] == "2023-05-01"
    assert entry["end_date"] is None
    assert entry["highlights"] == ["Did a thing"]


def test_education(client):
    [entry] = client.get("/api/education").json()
    assert entry["degree"] == "BSc"
    assert entry["end_date"] == "2023-06-01"


def test_research(client):
    [entry] = client.get("/api/research").json()
    assert entry["status"] == "in_progress"


def test_publications(client):
    [entry] = client.get("/api/publications").json()
    assert entry["year"] == 2025
    assert entry["authors"] == ["A. Author"]


def test_skills_keep_seed_order(client):
    skills = client.get("/api/skills").json()
    assert [(s["category"], s["name"]) for s in skills] == [
        ("Languages", "TypeScript"),
        ("Backend", "FastAPI"),
        ("Languages", "Python"),
    ]
