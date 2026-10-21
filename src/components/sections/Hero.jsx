import { useEffect, useRef, useState } from 'react'
import { profile, roles } from '../../data'
import { Magnetic } from '../ui/Common.jsx'
import { prefersReducedMotion, copyText } from '../../hooks'
import { RESUME_URL } from '../../lib/download.js'

function useTyped(list) {
  const [text, setText] = useState(list[0])
  useEffect(() => {
    if (prefersReducedMotion()) return
    let ri = 0, ci = list[0].length, deleting = true, timer
    const tick = () => {
      if (deleting) {
        ci--
        if (ci <= 0) { deleting = false; ri = (ri + 1) % list.length; ci = 0 }
      } else {
        ci++
        if (ci >= list[ri].length) {
          deleting = true
          setText(list[ri])
          timer = setTimeout(tick, 1800)
          return
        }
      }
      setText(list[ri].slice(0, ci) || '\u00A0')
      timer = setTimeout(tick, deleting ? 35 : 70)
    }
    timer = setTimeout(tick, 2200)
    return () => clearTimeout(timer)
  }, [list])
  return text
}

/** Each letter rises out of a mask, one after another. */
function Letters({ text, offset = 0 }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span className="ltr" key={i} style={{ '--d': `${(offset + i) * 55}ms` }}>
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </>
  )
}

const PHOTO = import.meta.env.BASE_URL + profile.photo

/** Portrait in a circle with a slim gradient ring. */
function Portrait() {
  return (
    <div className="pcol">
      <figure className="portrait">
        <img src={PHOTO} alt={`Portrait of ${profile.name}`} width="720" height="720" decoding="async" fetchpriority="high" />
      </figure>
    </div>
  )
}

export default function Hero({ notify }) {
  const typed = useTyped(roles)
  const heroRef = useRef(null)
  const frame = useRef(null)

  // The portrait leans very slightly toward the mouse (desktop only).
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(pointer:fine)').matches) return
    const hero = heroRef.current
    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      const nx = ((e.clientX - r.left) / r.width - 0.5) * 2
      const ny = ((e.clientY - r.top) / r.height - 0.5) * 2
      if (frame.current) frame.current.style.transform = `perspective(900px) rotateY(${nx * 6}deg) rotateX(${-ny * 6}deg)`
    }
    const onLeave = () => { if (frame.current) frame.current.style.transform = '' }
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    return () => {
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <header className="hero" id="top" ref={heroRef}>
      <div className="wrap herogrid">
        <div className="herotext">
          <h1 aria-label={profile.name}>
            <span className="line" aria-hidden="true"><Letters text={profile.firstLine} /></span>
            <span className="line hl" aria-hidden="true"><Letters text={profile.lastLine} offset={profile.firstLine.length} /></span>
          </h1>
          <div className="role">I am a <b>{typed}</b><span className="caret" /></div>
          <p className="lead">{profile.lead}</p>
          <span className="chip-live"><b />{profile.status}</span>
          <div className="cta">
            <Magnetic href="#projects" className="btn p">See my projects →</Magnetic>
            <Magnetic href={RESUME_URL} download={profile.resumeFile} onClick={() => notify('Resume downloading')}>Download resume ↓</Magnetic>
            <Magnetic href="#contact">Contact me</Magnetic>
            <Magnetic href={profile.github} target="_blank" rel="noopener">GitHub ↗</Magnetic>
          </div>
          <div className="quick">
            <a href={profile.linkedin} target="_blank" rel="noopener">linkedin/{profile.linkedinLabel}</a>
            <button type="button" onClick={() => copyText(profile.email, notify, 'Email copied')}>{profile.email} · copy</button>
            <span>{profile.location}</span>
          </div>
        </div>
        <div className="orbitwrap" ref={frame}><Portrait /></div>
      </div>
    </header>
  )
}
