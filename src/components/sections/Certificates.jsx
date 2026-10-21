import { useState } from 'react'
import { certificates } from '../../data'
import { SectionHead } from '../ui/Common.jsx'

const issuers = ['All', ...Array.from(new Set(certificates.map((c) => c.issuer)))]

export default function Certificates() {
  const [filter, setFilter] = useState('All')
  const list = certificates.filter((c) => filter === 'All' || c.issuer === filter)
  return (
    <section id="certs">
      <SectionHead title="Certifications" label={`${certificates.length} earned`} />
      <div className="cf">
        {issuers.map((i) => (
          <button key={i} className="tab" aria-selected={i === filter} onClick={() => setFilter(i)}>{i}</button>
        ))}
      </div>
      <div className="cgrid" key={filter}>
        {list.map((c, i) => (
          <div className="cert" key={c.name} style={{ animationDelay: `${i * 60}ms` }}>
            <span className="y">{c.year}</span>
            <div><b>{c.name}</b><small>{c.issuer}</small></div>
          </div>
        ))}
      </div>
    </section>
  )
}
