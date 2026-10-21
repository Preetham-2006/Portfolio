import { useEffect, useRef } from 'react'
import { experience } from '../../data'
import { Reveal, SectionHead } from '../ui/Common.jsx'

export default function Experience() {
  const tl = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const el = tl.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const p = Math.max(0, Math.min(100, ((window.innerHeight * 0.6 - r.top) / r.height) * 100))
      el.style.setProperty('--p', p + '%')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="experience">
      <SectionHead title="Experience" label="virtual internship" />
      <div className="tl" ref={tl}>
        {experience.map((job) => (
          <Reveal as="article" className="job" key={job.role}>
            <h3>{job.role}</h3>
            <div className="meta"><span>{job.org}</span><span>{job.period}</span><span>{job.place}</span></div>
            <ul>{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <div className="stack">{job.stack.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
