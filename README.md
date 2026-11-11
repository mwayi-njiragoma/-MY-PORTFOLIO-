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

## Personalise before publishing
1. Update project content, image paths, and URLs in `src/data/projects.js`.
2. Add or replace project images in `public/assets/projects/` and design images in `public/assets/designs/`.
3. Keep your CV at `public/cv.pdf`.
4. Replace the email and social links in `src/sections/Contact.jsx`.
5. Check that every project URL and contact method works.

## Image assets
Project images are loaded from these folders:
- `public/assets/projects/`
- `public/assets/designs/`
- `public/assets/profile/`

The project and design sections now render each project's `image` field. The CSS gradients remain as fallbacks when an image is missing.

## Deployment
Import the repository into Vercel or Netlify and use:
- Build command: `npm run build`
- Output directory: `dist`

No backend is required for the static portfolio. The contact form currently opens the visitor's email application through a `mailto:` link; configure a form service if you need in-page message delivery.
