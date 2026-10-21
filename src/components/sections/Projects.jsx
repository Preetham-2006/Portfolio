import { useState } from 'react'
import { projects, profile } from '../../data'
import { Reveal, SectionHead, Dialog } from '../ui/Common.jsx'

/** Small deterministic generator so the illustrations never change between renders. */
function rng(seed) {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

function Visual({ type }) {
  const r = rng(7)
  if (type === 'scatter') {
    const dots = Array.from({ length: 46 }, () => {
      const x = 14 + r() * 272
      const line = 70 - (x - 20) * 0.22
      const y = Math.max(8, Math.min(76, line + (r() - 0.5) * 40))
      return { x, y, above: y < line }
    })
    return (
      <svg className="viz" viewBox="0 0 300 84" role="img" aria-label="Scatter plot with a decision boundary">
        {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r="3" fill={d.above ? 'var(--mark)' : 'var(--accent)'} opacity=".85" />)}
        <path d="M20 70 C90 60 150 20 280 14" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5 5" />
      </svg>
    )
  }
  if (type === 'seats') {
    const seats = []
    for (let row = 0; row < 4; row++) for (let c = 0; c < 18; c++) seats.push({ row, c, taken: r() < 0.35 })
    return (
      <svg className="viz" viewBox="0 0 300 84" role="img" aria-label="Airplane seat map">
        {seats.map((s) => <rect key={`${s.row}-${s.c}`} x={18 + s.c * 15} y={10 + s.row * 18} width="11" height="11" rx="3" fill={s.taken ? 'var(--mark)' : 'var(--line)'} />)}
      </svg>
    )
  }
  const cols = ['var(--accent)', 'var(--mark)', 'var(--c3)']
  const cells = []
  for (let d = 0; d < 7; d++) for (let m = 0; m < 3; m++) cells.push({ d, m, o: 0.35 + r() * 0.55 })
  return (
    <svg className="viz" viewBox="0 0 300 84" role="img" aria-label="Weekly meal plan grid">
      {cells.map((c) => <rect key={`${c.d}-${c.m}`} x={16 + c.d * 39} y={10 + c.m * 23} width="33" height="17" rx="5" fill={cols[(c.d + c.m * 2) % 3]} opacity={c.o.toFixed(2)} />)}
    </svg>
  )
}

function Card({ project, index, hovered, onOpen }) {
  const hit = hovered && project.match.includes(hovered.key)
  const dim = hovered && !hit

  const tilt = (e) => {
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return
    if (!window.matchMedia('(pointer:fine)').matches) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateY(-4px)`
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const reset = (e) => { e.currentTarget.style.transform = '' }

  return (
    <Reveal
      as="button"
      className={`card ${hit ? 'hit' : ''} ${dim ? 'dim' : ''}`}
      onClick={() => onOpen(index)}
      onPointerMove={tilt}
      onPointerLeave={reset}
    >
      <span className="idx">Project · {project.tag}</span>
      <Visual type={project.visual} />
      <h3>{project.shortTitle || project.title}</h3>
      <p>{project.summary}</p>
      <div className="stack">{project.tools.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
      <span className="more">View details →</span>
    </Reveal>
  )
}

export default function Projects({ hovered }) {
  const [open, setOpen] = useState(null)
  const p = open !== null ? projects[open] : null

  return (
    <section id="projects">
      <SectionHead title="Projects" label="click a card for details" />
      <div className="pgrid">
        {projects.map((proj, i) => (
          <Card key={proj.title} project={proj} index={i} hovered={hovered} onOpen={setOpen} />
        ))}
      </div>
      <Dialog open={p !== null} onClose={() => setOpen(null)} id="dlg">
        {p && (
          <div className="mb">
            <button className="ib x" onClick={() => setOpen(null)} aria-label="Close">✕</button>
            <span className="label">Project {open + 1} of {projects.length}</span>
            <h3>{p.title}</h3>
            <p style={{ color: 'var(--muted)' }}>{p.kind}</p>
            <ul>{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="stack">{p.tools.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            <div className="cta">
              <a className="btn p" href={profile.github} target="_blank" rel="noopener">Browse my GitHub ↗</a>
              {open < projects.length - 1 && <button className="btn" onClick={() => setOpen(open + 1)}>Next project →</button>}
            </div>
          </div>
        )}
      </Dialog>
    </section>
  )
}
