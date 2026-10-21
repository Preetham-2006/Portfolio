// Theme list. The colours themselves live in src/styles/tokens.css under [data-palette="..."].
// swatch = [accent, second colour, background], used for the picker preview.
export const themes = [
  { id: 'aubergine', name: 'Aubergine & Brass', dark: true, swatch: ['#d9ad5f', '#c68ad8', '#14101a'] },
  { id: 'porcelain', name: 'Porcelain & Mulberry', dark: false, swatch: ['#8a2a5c', '#2f6f73', '#f7f3ee'] },
  { id: 'forest', name: 'Forest & Copper', dark: true, swatch: ['#e0915a', '#a3cba6', '#0e1512'] },
]

const KEY = 'jp-palette'

/** Saved choice if there is one, otherwise follow the system light/dark setting. */
export function initialThemeId() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved && themes.some((t) => t.id === saved)) return saved
  } catch { /* storage can be blocked */ }
  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches
  return dark ? 'aubergine' : 'porcelain'
}

export function saveThemeId(id) {
  try { localStorage.setItem(KEY, id) } catch { /* ignore */ }
}
