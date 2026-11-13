import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages project sites are served from /<repository-name>/.
  // Keep local development at the root so `npm run dev` stays simple.
  base: command === 'build' ? '/-MY-PORTFOLIO-/' : '/',
}))
