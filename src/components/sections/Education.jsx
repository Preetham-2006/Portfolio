import { useRef, useState, useEffect } from 'react'
import { education } from '../../data'
import { Reveal, SectionHead, Counter } from '../ui/Common.jsx'
import { useInView } from '../../hooks'

function EduCard({ e }) {
  const ref = useRef(null)
  const [seen] = useInView(ref, 0.3)
  const [w, setW] = useState(0)
  useEffect(() => {
    if (!seen) return
    const t = setTimeout(() => setW(e.percent), 120)
    return () => clearTimeout(t)
  }, [seen, e.percent])
  return (
    <Reveal as="article" className="ed">
      <div ref={ref}>
        <span className="label">{e.meta}</span>
        <h3>{e.school}</h3>
        <p style={{ color: 'var(--muted)' }}>{e.degree}</p>
        <Counter as="div" className="big" to={e.value} decimals={e.decimals} />
        <div className="label">{e.unit}</div>
        <div className="meter"><i style={{ width: w + '%' }} /></div>
      </div>
    </Reveal>
  )
}

export default function Education() {
  return (
    <section id="education">
      <SectionHead title="Education" label="where I study" />
      <div className="edu">
        {education.map((e) => <EduCard key={e.school} e={e} />)}
      </div>
    </section>
  )
}
