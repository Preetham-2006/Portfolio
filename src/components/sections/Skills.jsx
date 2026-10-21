import { useMemo, useState } from 'react'
import { skillGroups, skillSummary, projects } from '../../data'
import { Reveal, SectionHead } from '../ui/Common.jsx'

export default function Skills({ hovered, setHovered }) {
  const [active, setActive] = useState('All')
  const tabs = ['All', ...skillGroups.map((g) => g.name)]

  const matches = useMemo(
    () => (hovered ? projects.filter((p) => p.match.includes(hovered.key)).length : 0),
    [hovered]
  )

  let delay = 0
  return (
    <section id="skills">
      <SectionHead title="Skills" label="hover a skill to see where I used it" />
      <div className="tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t} role="tab" className="tab" aria-selected={t === active} onClick={() => setActive(t)}>{t}</button>
        ))}
      </div>
      <div className="skgrid" key={active}>
        {skillGroups
          .filter((g) => active === 'All' || g.name === active)
          .flatMap((g) =>
            g.items.map((item) => (
              <button
                key={item}
                type="button"
                className="sk"
                style={{ '--c': g.color, animationDelay: `${delay++ * 25}ms` }}
                onPointerEnter={() => setHovered({ key: item.toLowerCase(), label: item })}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered({ key: item.toLowerCase(), label: item })}
                onBlur={() => setHovered(null)}
              >
                {item}
              </button>
            ))
          )}
      </div>
      <p className="skhint" aria-live="polite">
        {!hovered && <>Hover or focus any skill. Projects that used it are highlighted below.</>}
        {hovered && matches > 0 && <><b>{hovered.label}</b> was used in the highlighted project{matches > 1 ? 's' : ''} below.</>}
        {hovered && matches === 0 && <><b>{hovered.label}</b> is part of how I work, shown across my experience rather than one project.</>}
      </p>
      <Reveal className="skfoot">
        {skillSummary.map((s) => (
          <div className="skbox" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></div>
        ))}
      </Reveal>
    </section>
  )
}
