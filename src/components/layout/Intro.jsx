import { useEffect, useState } from 'react'
import { profile } from '../../data'

const PHOTO = import.meta.env.BASE_URL + profile.photo
const R = 62
const C = 2 * Math.PI * R

/** Opening curtain: your photo with a ring that fills to 100, then the curtain slides up. */
export default function Intro() {
  const [n, setN] = useState(0)
  const [out, setOut] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let raf, t0 = null
    document.body.style.overflow = 'hidden'
    const step = (t) => {
      t0 = t0 ?? t
      const p = Math.min((t - t0) / 1150, 1)
      setN(Math.round(100 * (1 - Math.pow(1 - p, 2))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    const t1 = setTimeout(() => setOut(true), 1300)
    const t2 = setTimeout(() => { setGone(true); document.body.style.overflow = '' }, 2300)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [])

  if (gone) return null
  return (
    <div className={`intro ${out ? 'out' : ''}`} aria-hidden="true">
      <div className="iwrap">
        <svg viewBox="0 0 140 140">
          <circle className="it" cx="70" cy="70" r={R} />
          <circle className="ip" cx="70" cy="70" r={R} style={{ strokeDasharray: C, strokeDashoffset: C * (1 - n / 100) }} />
        </svg>
        <img className="ipic" src={PHOTO} alt="" width="104" height="104" />
      </div>
      <div className="who">{profile.name}</div>
      <div className="n">{String(n).padStart(3, '0')}</div>
      <div className="bar"><i style={{ width: n + '%' }} /></div>
    </div>
  )
}
