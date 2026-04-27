# Sikshalabh Exam Rank Predictor

Production-oriented monorepo for a statically generated Next.js App Router frontend backed by a tiny Rust/WebAssembly rank calculation engine.

## Step 1: Initialize The Monorepo

From a clean parent directory, run:

```powershell
mkdir exam-rank-predictor
cd exam-rank-predictor

npm init -y
npm pkg set private=true
npm pkg set "workspaces[0]=apps/web"

npx create-next-app@latest apps/web --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes

mkdir engines
cargo new engines/rank-core --lib
```

This repository already contains the resulting structure:

```text
apps/
  web/
    src/app/exam/[exam_slug]/page.tsx
    src/components/PredictorForm.tsx
engines/
  rank-core/
    Cargo.toml
    src/lib.rs
```

## Step 2: Install wasm-pack And Build The Rust Engine

Install the WebAssembly target and `wasm-pack`:

```powershell
rustup target add wasm32-unknown-unknown
cargo install wasm-pack
```

Compile the Rust library into browser-loadable Wasm:

```powershell
cd engines/rank-core
wasm-pack build --target web --release --out-dir ../../apps/web/public/wasm/rank-core
cd ../..
```

The root scripts wrap this for day-to-day development:

```powershell
npm install
npm run wasm:build
npm run dev
```

For production:

```powershell
npm run build
npm run start
```

## Deploy To Cloudflare Pages

This app is fully statically generated and the Rust engine is loaded as a static Wasm asset, so deploy it as a Cloudflare Pages static export.

In `apps/web/next.config.ts`, `output: "export"` makes `next build` emit static files into `apps/web/out`.

Cloudflare Pages dashboard settings:

```text
Framework preset: None or Next.js (Static HTML Export)
Root directory: apps/web
Build command: bash cloudflare-pages-build.sh
Build output directory: out
Production branch: main
Environment variable: NODE_VERSION = 22.16.0
```

The Pages Wrangler config lives at `apps/web/wrangler.jsonc`. It is intentionally a Pages config with `pages_build_output_dir`; do not add a Workers `main` entry for this static export.

The build script installs the minimal Rust toolchain if Cloudflare does not already have it, adds the `wasm32-unknown-unknown` target, installs `wasm-pack`, compiles the Rust engine, and then exports the Next.js site.

If you later add API routes, authentication, ISR, or SSR, switch from Pages static export to Cloudflare Workers with the OpenNext adapter (`@opennextjs/cloudflare`).

The Rust release profile is tuned for web deployment with `opt-level = "z"`, LTO, single codegen unit, panic aborts, and symbol stripping. The Wasm module uses only `wasm-bindgen`; the normal distribution CDF is implemented directly to keep the binary small.

Sources checked while preparing this scaffold:

- Next.js `create-next-app` and App Router JSON-LD guidance: https://nextjs.org/docs/app/api-reference/create-next-app and https://nextjs.org/docs/app/guides/json-ld
- Rust Wasm packaging guidance: https://rustwasm.github.io/docs/wasm-pack/ and https://rustwasm.github.io/docs/wasm-bindgen/
