import { useEffect, useState } from 'react'
import { profile, sections, themes } from './data'
import { useThemeId, useToast, copyText, prefersReducedMotion } from './hooks'
import { downloadResume } from './lib/download.js'
import Nav from './components/layout/Nav.jsx'
import Marquee from './components/layout/Marquee.jsx'
import Intro from './components/layout/Intro.jsx'
import SideRail from './components/layout/SideRail.jsx'
import MobileDock from './components/layout/MobileDock.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Skills from './components/sections/Skills.jsx'
import Experience from './components/sections/Experience.jsx'
import Projects from './components/sections/Projects.jsx'
import Certificates from './components/sections/Certificates.jsx'
import Education from './components/sections/Education.jsx'
import Contact from './components/sections/Contact.jsx'
import CommandPalette from './components/ui/CommandPalette.jsx'
import BackToTop from './components/ui/BackToTop.jsx'

export default function App() {
  const [themeId, setTheme] = useThemeId()
  const [toast, notify] = useToast()
  const [hovered, setHovered] = useState(null)
  const [palette, setPalette] = useState(false)

  // Spotlight: cards glow where the pointer is
  useEffect(() => {
    const SEL = '.card,.cert,.ed,.job,.skbox,.stat,.row'
    const move = (e) => {
      const el = e.target.closest && e.target.closest(SEL)
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--sx', `${e.clientX - r.left}px`)
      el.style.setProperty('--sy', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  // Ctrl/Cmd + K
  useEffect(() => {
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((p) => !p)
      }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [])

  const commands = [
    ...sections.map((s) => ({
      name: `Go to ${s.label}`, hint: 'section',
      run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
    })),
    ...themes.map((t) => ({ name: `Theme: ${t.name}`, hint: t.dark ? 'dark' : 'light', run: () => setTheme(t.id) })),
    { name: 'Download resume (PDF)', hint: 'file', run: () => { downloadResume(); notify('Resume downloading') } },
    { name: 'Copy email address', hint: 'action', run: () => copyText(profile.email, notify, 'Email copied') },
    { name: 'Open GitHub', hint: 'link', run: () => window.open(profile.github, '_blank', 'noopener') },
    { name: 'Open LinkedIn', hint: 'link', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
  ]

  return (
    <>
      <Nav onPalette={() => setPalette(true)} themeId={themeId} setTheme={setTheme} />
      {!prefersReducedMotion() && <Intro />}
      <Hero notify={notify} />
      <Marquee />
      <main className="wrap">
        <About setTheme={setTheme} />
        <Skills hovered={hovered} setHovered={setHovered} />
        <Experience />
        <Projects hovered={hovered} />
        <Certificates />
        <Education />
        <Contact notify={notify} />
        <footer>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="mono">Press Ctrl K (or ⌘K) to jump anywhere</span>
        </footer>
      </main>
      <SideRail />
      <MobileDock />
      <BackToTop />
      <CommandPalette open={palette} setOpen={setPalette} commands={commands} />
      <div id="toast" role="status" className={toast.on ? 'on' : ''}>{toast.msg}</div>
    </>
  )
}
