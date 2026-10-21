import { useEffect, useRef, useState } from 'react'
import { themes } from '../../data/themes.js'

export default function ThemePicker({ themeId, setTheme }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = themes.find((t) => t.id === themeId) || themes[0]

  useEffect(() => {
    if (!open) return
    const down = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const key = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', down)
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('keydown', key)
    }
  }, [open])

  return (
    <div className="tp" ref={ref}>
      <button
        className="ib"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Theme: ${current.name}. Change theme`}
        onClick={() => setOpen((o) => !o)}
      >
        <i className="sw" style={{ background: `conic-gradient(${current.swatch[0]} 0 50%, ${current.swatch[1]} 50% 100%)` }} />
        <span className="tn">{current.name}</span>
      </button>
      {open && (
        <div className="tmenu" role="menu">
          {themes.map((t) => (
            <button
              key={t.id}
              role="menuitemradio"
              aria-checked={t.id === themeId}
              className={t.id === themeId ? 'on' : ''}
              onClick={() => { setTheme(t.id); setOpen(false) }}
            >
              <span className="chips">
                <i style={{ background: t.swatch[2] }} /><i style={{ background: t.swatch[0] }} /><i style={{ background: t.swatch[1] }} />
              </span>
              <b>{t.name}</b>
              <small>{t.dark ? 'dark' : 'light'}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
