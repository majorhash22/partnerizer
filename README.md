# PartneRizer website

Production-ready React and Vite landing page for PartneRizer.

## Requirements

- Node.js 20.19 or newer
- pnpm 10.17.1 through Corepack

## Local development

```bash
corepack enable
pnpm install
pnpm dev
```

Open `http://127.0.0.1:5173`.

## Production build

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm preview
```

The production site is written to `dist`. The same build also refreshes `OPEN_WEBSITE.html`, a standalone launcher that can be opened directly without a server.

## Deployment

Upload the contents of `dist` to any static host. The Vite base path is relative, so the build works at a domain root or repository subpath.

For GitHub, commit the source files and `pnpm-lock.yaml`. Do not commit `node_modules`, local caches, environment files, or design-review artifacts. The included `.gitignore` handles these exclusions.

## Features

- Responsive desktop and mobile layouts
- Self-hosted Barlow Condensed and Manrope fonts
- Reduced-motion support
- Interactive product-layer selector and workflow
- Local pilot planner with no external data submission
- Optimized WebP production imagery

## Integration note

The pilot planner is intentionally local. Connect its final summary to your preferred CRM, scheduling, or contact workflow when that destination is confirmed.
