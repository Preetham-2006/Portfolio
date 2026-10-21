import { useActiveSection } from '../../hooks'

const ICONS = {
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  skills: 'M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14',
  projects: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  about: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-7 8-7s8 3 8 7',
  learn: 'M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5',
  contact: 'M3 5h18v14H3zM3 6l9 7 9-7',
}

// Which dock tab owns which page section
const TABS = [
  { key: 'home', label: 'Home', href: '#top', owns: [] },
  { key: 'about', label: 'About', href: '#about', owns: ['about'] },
  { key: 'skills', label: 'Skills', href: '#skills', owns: ['skills', 'experience'] },
  { key: 'projects', label: 'Projects', href: '#projects', owns: ['projects'] },
  { key: 'learn', label: 'Learning', href: '#certs', owns: ['certs', 'education'] },
  { key: 'contact', label: 'Contact', href: '#contact', owns: ['contact'] },
]
const IDS = TABS.flatMap((t) => t.owns)

/** App-style tab bar for phones. A pill slides to the tab for the section you are reading. */
export default function MobileDock() {
  const active = useActiveSection(IDS)
  const index = Math.max(0, TABS.findIndex((t) => t.owns.includes(active)))
  return (
    <nav className="dock" aria-label="Quick navigation" style={{ '--i': index, '--n': TABS.length }}>
      <i className="pill" aria-hidden="true" />
      {TABS.map((t, i) => (
        <a key={t.key} href={t.href} className={i === index ? 'on' : ''}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[t.key]} /></svg>
          <span>{t.label}</span>
        </a>
      ))}
    </nav>
  )
}
