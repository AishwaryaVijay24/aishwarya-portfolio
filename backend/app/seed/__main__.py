"""python -m app.seed [path/to/portfolio.json]"""

import sys
from pathlib import Path

from pydantic import ValidationError

from app.db.session import SessionLocal
from app.seed.loader import DEFAULT_SEED_FILE, apply_seed, load_seed_file


def main() -> int:
    path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SEED_FILE
    try:
        data = load_seed_file(path)
    except ValidationError as exc:
        print(f"Seed file {path} is invalid:\n{exc}", file=sys.stderr)
        return 1
    with SessionLocal() as session:
        counts = apply_seed(session, data)
    print("Seeded " + ", ".join(f"{name}={count}" for name, count in counts.items()))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
