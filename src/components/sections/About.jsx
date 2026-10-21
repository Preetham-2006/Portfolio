import { profile, stats } from '../../data'
import { Reveal, SectionHead, Counter } from '../ui/Common.jsx'
import ScrollWords from '../ui/ScrollWords.jsx'
import Terminal from '../ui/Terminal.jsx'

export default function About({ setTheme }) {
  return (
    <section id="about">
      <SectionHead title="About me" label="data science, in plain words" />
      <div className="about">
        <Reveal>
          <ScrollWords text={profile.about[0]} />
          {profile.about.slice(1).map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </Reveal>
        <Reveal className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <Counter to={s.n} decimals={s.d} />
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>
        <Reveal className="facts">
          {profile.facts.map((f) => <span className="fact" key={f}>{f}</span>)}
        </Reveal>
        <Reveal className="termwrap">
          <Terminal setTheme={setTheme} />
        </Reveal>
      </div>
    </section>
  )
}
