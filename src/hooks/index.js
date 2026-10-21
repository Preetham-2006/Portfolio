import { useEffect, useRef, useState, useCallback } from 'react'
import { saveThemeId } from '../data/themes.js'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion:reduce)').matches

/** Current palette id. The id is written to <html data-palette> so CSS can switch colours. */
export function useThemeId() {
  const [id, setId] = useState(() => document.documentElement.getAttribute('data-palette') || 'porcelain')
  useEffect(() => {
    document.documentElement.setAttribute('data-palette', id)
  }, [id])
  const choose = useCallback((next) => {
    setId(next)
    saveThemeId(next)
  }, [])
  return [id, choose]
}

/** Short message at the bottom of the screen. */
export function useToast() {
  const [msg, setMsg] = useState('')
  const [on, setOn] = useState(false)
  const timer = useRef()
  const notify = useCallback((m) => {
    setMsg(m)
    setOn(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOn(false), 1800)
  }, [])
  return [{ msg, on }, notify]
}

export function copyText(text, notify, okMessage = 'Copied') {
  const fallback = () => {
    const a = document.createElement('textarea')
    a.value = text
    a.style.cssText = 'position:fixed;opacity:0'
    document.body.appendChild(a)
    a.select()
    let ok = false
    try { ok = document.execCommand('copy') } catch { /* ignore */ }
    a.remove()
    notify(ok ? okMessage : 'Select and copy: ' + text)
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => notify(okMessage), fallback)
  } else fallback()
}

/** True once the element has scrolled into view (starts true if already on screen). */
export function useInView(ref, threshold = 0.15) {
  const [seen, setSeen] = useState(false)
  const [pre, setPre] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (el.getBoundingClientRect().top > window.innerHeight - 40) setPre(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setSeen(true); setPre(false); io.disconnect() }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return [seen, pre]
}

/** Counts from 0 to `to` once `start` becomes true. */
export function useCountUp(to, decimals, start) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) { setV(to); return }
    let raf, t0 = null
    const step = (t) => {
      t0 = t0 ?? t
      const p = Math.min((t - t0) / 1200, 1)
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, start])
  return v.toFixed(decimals)
}

/** id of the section that is currently under the top part of the screen ('' while in the hero). */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      let cur = ''
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id
      })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])
  return active
}
