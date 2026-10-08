from app.repositories.portfolio import PortfolioRepository


def test_get_project_by_slug_returns_none_when_missing(seeded):
    assert PortfolioRepository(seeded).get_project_by_slug("missing") is None


def test_projects_keep_seed_order_after_featured(seeded):
    slugs = [p.slug for p in PortfolioRepository(seeded).list_projects()]
    assert slugs == ["first", "second"]


def test_empty_database_returns_empty_lists(session):
    repo = PortfolioRepository(session)
    assert repo.list_projects() == []
    assert repo.list_experience() == []
    assert repo.list_skills() == []
