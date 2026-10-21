import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vercel and Netlify serve from "/", so nothing to set.
// For GitHub Pages project sites build with:  VITE_BASE=/repo-name/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
