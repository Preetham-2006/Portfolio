import { useEffect, useState } from 'react'
import { profile, sections } from '../../data'
import ThemePicker from '../ui/ThemePicker.jsx'

export default function Nav({ onPalette, themeId, setTheme }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0)
      let cur = ''
      sections.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = s.id
      })
      setCurrent(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id="bar" style={{ width: progress + '%' }} />
      <nav className="top">
        <div className="in">
          <a className="logo" href="#top" aria-label="Home"><i>{profile.initials}</i><span className="ln2">Preetham</span></a>
          <div className={`links ${open ? 'open' : ''}`}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={current === s.id ? 'on' : ''} onClick={() => setOpen(false)}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="tools">
            <button className="ib" onClick={onPalette} aria-label="Open command menu">
              <span className="jt">Jump to</span><span className="ji" aria-hidden="true">⌕</span><kbd>Ctrl K</kbd>
            </button>
            <ThemePicker themeId={themeId} setTheme={setTheme} />
            <button className="ib" id="menu" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>☰</button>
          </div>
        </div>
      </nav>
    </>
  )
}
