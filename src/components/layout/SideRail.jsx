import { sections } from '../../data'
import { useActiveSection } from '../../hooks'

const ids = sections.map((s) => s.id)

/** Dots down the right edge of wide screens. Hover for the name, click to jump. */
export default function SideRail() {
  const active = useActiveSection(ids)
  return (
    <nav className="rail" aria-label="Sections">
      {sections.map((s) => (
        <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : ''} aria-label={s.label}>
          <span>{s.label}</span><i />
        </a>
      ))}
    </nav>
  )
}
