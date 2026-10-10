#!/usr/bin/env bash
set -eu
cd "$(dirname "$0")"
if [ ! -x ".venv/bin/python" ]; then
    python3 -m venv .venv
fi
if ! .venv/bin/python -c 'import sys; raise SystemExit(sys.version_info < (3, 10))'; then
    echo "Python 3.10 or newer is required. Recreate .venv with a supported Python version." >&2
    exit 1
fi
.venv/bin/python -m pip install -r requirements.txt
if command -v xdg-open >/dev/null 2>&1; then
    (sleep 1; xdg-open http://127.0.0.1:5000 >/dev/null 2>&1) &
elif command -v open >/dev/null 2>&1; then
    (sleep 1; open http://127.0.0.1:5000 >/dev/null 2>&1) &
fi
exec .venv/bin/python app.py
