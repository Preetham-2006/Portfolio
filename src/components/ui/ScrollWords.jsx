import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../hooks'

/** A paragraph whose words light up one by one as you scroll past it. */
export default function ScrollWords({ text }) {
  const ref = useRef(null)
  const words = text.split(' ')
  const [lit, setLit] = useState(words.length)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const update = () => {
      const top = ref.current.getBoundingClientRect().top
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.92 - top) / (window.innerHeight * 0.45)))
      setLit(Math.round(p * words.length))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [words.length])

  return (
    <p className="sw" ref={ref}>
      {words.map((w, i) => (
        <span key={i} className={`w ${i < lit ? 'on' : ''}`}>{w}{' '}</span>
      ))}
    </p>
  )
}
