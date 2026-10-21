import { useEffect, useRef, useState } from 'react'
import { useInView, useCountUp, prefersReducedMotion } from '../../hooks'

/** Fades and lifts its children in when scrolled into view. Visible at rest. */
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null)
  const [, pre] = useInView(ref)
  return (
    <Tag ref={ref} className={`rv ${pre ? 'pre' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

const GLYPHS = '!<>-_\\/[]{}=+*^?#abcdefghijklmnopqrstuvwxyz'

/** Section title that scrambles into place the first time it is seen. */
export function SectionHead({ title, label }) {
  const ref = useRef(null)
  const [seen] = useInView(ref, 0.5)
  const [text, setText] = useState(title)

  useEffect(() => {
    if (!seen || prefersReducedMotion()) return
    let frame = 0
    const total = 22
    const id = setInterval(() => {
      frame++
      const keep = Math.floor((frame / total) * title.length)
      setText(
        title
          .split('')
          .map((ch, i) => (ch === ' ' || i < keep ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      )
      if (frame >= total) { clearInterval(id); setText(title) }
    }, 35)
    return () => clearInterval(id)
  }, [seen, title])

  return (
    <div className="sh" ref={ref}>
      <h2 aria-label={title}><span aria-hidden="true">{text}</span></h2>
      <span className="label">{label}</span>
      <i className={`sline ${seen ? 'go' : ''}`} />
    </div>
  )
}

export function Counter({ to, decimals = 0, className, as: Tag = 'b' }) {
  const ref = useRef(null)
  const [seen] = useInView(ref, 0.3)
  const v = useCountUp(to, decimals, seen)
  return <Tag ref={ref} className={className}>{v}</Tag>
}

/** Modal built on the native <dialog> element. */
export function Dialog({ open, onClose, id, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      id={id}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
    >
      {open ? children : null}
    </dialog>
  )
}

/** Button that drifts a little toward the cursor. */
export function Magnetic({ href, className = 'btn', children, ...rest }) {
  const move = (e) => {
    if (prefersReducedMotion()) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px,${(e.clientY - r.top - r.height / 2) * 0.25}px)`
  }
  const reset = (e) => { e.currentTarget.style.transform = '' }
  return (
    <a href={href} className={className} onPointerMove={move} onPointerLeave={reset} {...rest}>
      {children}
    </a>
  )
}
