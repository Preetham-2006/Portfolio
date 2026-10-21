import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { initialThemeId } from './data/themes.js'

document.documentElement.setAttribute('data-palette', initialThemeId())

// Letters of the name wait for the intro curtain. No intro when the visitor prefers reduced motion.
if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
  document.documentElement.style.setProperty('--intro', '1.55s')
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
