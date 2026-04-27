#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

if [ -f "$HOME/.cargo/env" ]; then
  # shellcheck disable=SC1091
  . "$HOME/.cargo/env"
fi

if ! command -v rustup >/dev/null 2>&1; then
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal
  # shellcheck disable=SC1091
  . "$HOME/.cargo/env"
fi

rustup target add wasm32-unknown-unknown

if ! command -v wasm-pack >/dev/null 2>&1; then
  cargo install wasm-pack
fi

cd "$REPO_ROOT"
npm install
npm run build
