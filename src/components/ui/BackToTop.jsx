import { useEffect, useState } from 'react'

const C = 2 * Math.PI * 22 // circle length for r = 22

/** Round button that shows how far you have scrolled and takes you back to the top. */
export default function BackToTop() {
  const [p, setP] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? window.scrollY / h : 0)
      setShow(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`totop ${show ? 'show' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      tabIndex={show ? 0 : -1}
    >
      <svg viewBox="0 0 52 52" aria-hidden="true">
        <circle className="t" cx="26" cy="26" r="22" />
        <circle className="p" cx="26" cy="26" r="22" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - p) }} />
      </svg>
      <span aria-hidden="true">↑</span>
    </button>
  )
}
