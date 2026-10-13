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
1. Update project content and URLs in `src/data/projects.js`.
2. Replace concept tiles with your own project images.
3. Add your real CV PDF at `public/cv.pdf`.
4. Replace the email and social links in `src/sections/Contact.jsx`.
5. Check that every project URL and contact method works.

## Image assets
Create these folders and add your images:
- `public/assets/projects/`
- `public/assets/designs/`
- `public/assets/profile/`

The starter currently uses CSS concept artwork in several cards so the site remains presentable before you add images. Do not represent concept tiles as final client work.

## Deployment
Import the repository into Vercel or Netlify and use:
- Build command: `npm run build`
- Output directory: `dist`

No backend is required for the static portfolio. The contact form currently opens the visitor's email application through a `mailto:` link; configure a form service if you need in-page message delivery.
