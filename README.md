# MN. Personal Portfolio

A React + Vite portfolio starter using a monochrome liquid-glass visual system, 3D hero objects, responsive sections, project filters, and a GSAP horizontal-scroll showcase.

## Requirements
- Node.js LTS
- npm
- A modern browser

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Build for deployment
```bash
npm run build
npm run preview
```

## Image assets
Project images are loaded from these folders:
- `public/assets/projects/`
- `public/assets/designs/`
- `public/assets/profile/`

The project and design sections now render each project's `image` field. The CSS gradients remain as fallbacks when an image is missing.

## Deploying to GitHub Pages
1. Push the project to the `main` branch.
2. In GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds the site and publishes `dist`.

The production base path is `/MN.mwayinjiragoma/` in `vite.config.js`. Update it if the repository name changes again.
