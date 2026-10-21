import { useEffect, useRef } from 'react'
import { skillGroups } from '../../data'
import { prefersReducedMotion } from '../../hooks'

const ITEMS = ['Python', 'SQL', 'Machine Learning', 'Data Science', 'Data Cleaning', 'Feature Engineering', 'MySQL', 'Data Engineering', 'AWS', 'Oracle Cloud', 'Django', 'Flask', 'React', 'GitHub']

/** One slim row of skills that drifts slowly. Scrolling nudges its speed. Pauses on hover. */
export default function Marquee() {
  const root = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = track.current
    let pos = 0, last = window.scrollY, vel = 0, hover = false, onScreen = true, raf

    const loop = () => {
      const dy = window.scrollY - last
      last = window.scrollY
      vel += (Math.abs(dy) - vel) * 0.1
      if (onScreen && !hover) {
        const half = el.scrollWidth / 2
        pos -= 0.5 * (1 + Math.min(vel, 30) * 0.12)
        if (pos <= -half) pos += half
        el.style.transform = `translate3d(${pos}px,0,0)`
      }
      raf = requestAnimationFrame(loop)
    }

    const box = root.current
    const enter = () => { hover = true }
    const leave = () => { hover = false }
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting })
    io.observe(box)
    box.addEventListener('pointerenter', enter)
    box.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      box.removeEventListener('pointerenter', enter)
      box.removeEventListener('pointerleave', leave)
    }
  }, [])

  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" ref={root} aria-label={`Skills: ${skillGroups.flatMap((g) => g.items).join(', ')}`}>
      <div className="track" ref={track}>
        {doubled.map((t, i) => <span key={i} aria-hidden={i >= ITEMS.length}>{t}<b>•</b></span>)}
      </div>
    </div>
  )
}
