import { useEffect, useRef, useState } from 'react'
import { profile, skillGroups, projects, education, certificates, themes } from '../../data'
import { downloadResume } from '../../lib/download.js'
import { prefersReducedMotion, useInView } from '../../hooks'

const COMMANDS = {
  help: () => ['Try: whoami, about, skills, projects, education, certs, contact, resume (downloads the PDF), theme <name>, clear'],
  whoami: () => [profile.name, 'Data scientist · B.Tech candidate · ' + profile.location],
  about: () => profile.about,
  skills: () => skillGroups.map((g) => `${g.name}: ${g.items.join(', ')}`),
  projects: () => projects.map((p, i) => `${i + 1}. ${p.title}  [${p.tools.join(', ')}]`),
  education: () => education.map((e) => `${e.meta.split(' · ')[0]}   ${e.school} · ${e.display}`),
  certs: () => certificates.map((c) => `${c.year}   ${c.name}`),
  contact: () => [`email     ${profile.email}`, `phone     ${profile.phone}`, `linkedin  ${profile.linkedin}`, `github    ${profile.github}`],
}

const CHIPS = ['help', 'skills', 'projects', 'resume', 'contact']
const DEMO = ['whoami', 'skills']

/**
 * Small interactive terminal. It types two commands by itself, then waits for the visitor.
 * Chips under it run commands with one tap, so it works on phones without a keyboard.
 */
export default function Terminal({ setTheme }) {
  const root = useRef(null)
  const box = useRef(null)
  const input = useRef(null)
  const [seen] = useInView(root, 0.35)
  const [lines, setLines] = useState([{ k: 'res', t: 'Type a command, or tap one below. Try "help".' }])
  const [typing, setTyping] = useState('')
  const [value, setValue] = useState('')
  const history = useRef([])
  const hpos = useRef(-1)
  const stopDemo = useRef(false)

  const run = (raw) => {
    const text = raw.trim()
    if (!text) return
    const [name, ...args] = text.split(/\s+/)
    const cmd = name.toLowerCase()
    const add = (arr) => setLines((l) => [...l, ...arr])
    const echo = { k: 'cmd', t: text }

    if (cmd === 'clear') { setLines([]); return }
    if (cmd === 'resume') {
      add([echo, { k: 'res', t: `Downloading ${profile.resumeFile} ...` }])
      downloadResume()
      return
    }
    if (cmd === 'theme') {
      const t = themes.find((x) => x.id === (args[0] || '').toLowerCase())
      if (t) { setTheme(t.id); add([echo, { k: 'res', t: `Theme set to ${t.name}.` }]) }
      else add([echo, { k: 'err', t: `Pick one of: ${themes.map((x) => x.id).join(', ')}` }])
      return
    }
    if (COMMANDS[cmd]) add([echo, ...COMMANDS[cmd]().map((t) => ({ k: 'res', t }))])
    else add([echo, { k: 'err', t: `command not found: ${cmd}. Type "help".` }])
  }

  // Types the demo commands once, when the terminal first scrolls into view.
  useEffect(() => {
    if (!seen) return
    if (prefersReducedMotion()) { DEMO.forEach(run); return }
    let cancelled = false
    const wait = (ms) => new Promise((r) => setTimeout(r, ms))
    ;(async () => {
      await wait(500)
      for (const c of DEMO) {
        for (let i = 1; i <= c.length; i++) {
          if (cancelled || stopDemo.current) return
          setTyping(c.slice(0, i))
          await wait(70)
        }
        await wait(260)
        if (cancelled || stopDemo.current) return
        setTyping('')
        run(c)
        await wait(900)
      }
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen])

  // Keep the newest line in view inside the terminal only (never scroll the page).
  useEffect(() => {
    const el = box.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, typing])

  const submit = (e) => {
    e.preventDefault()
    stopDemo.current = true
    setTyping('')
    if (value.trim()) { history.current.unshift(value); hpos.current = -1 }
    run(value)
    setValue('')
  }

  const onKey = (e) => {
    if (e.key === 'ArrowUp' && history.current.length) {
      e.preventDefault()
      hpos.current = Math.min(hpos.current + 1, history.current.length - 1)
      setValue(history.current[hpos.current])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      hpos.current = Math.max(hpos.current - 1, -1)
      setValue(hpos.current === -1 ? '' : history.current[hpos.current])
    }
  }

  return (
    <div className="term" ref={root} onClick={() => input.current && input.current.focus({ preventScroll: true })}>
      <div className="tb"><i /><i /><i /><span>preetham@data-science: ~</span></div>
      <div className="tout" ref={box} role="log" aria-live="polite">
        {lines.map((l, i) => (
          <div className={`t-ln ${l.k}`} key={i}>
            {l.k === 'cmd' && <span className="pr">$ </span>}{l.t}
          </div>
        ))}
        {typing && <div className="t-ln cmd"><span className="pr">$ </span>{typing}<span className="tcaret" /></div>}
      </div>
      <form className="tin" onSubmit={submit}>
        <label htmlFor="term-input" className="pr">$</label>
        <input
          id="term-input"
          ref={input}
          value={value}
          onChange={(e) => { stopDemo.current = true; setValue(e.target.value) }}
          onKeyDown={onKey}
          placeholder="type a command"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          aria-label="Terminal command"
        />
      </form>
      <div className="tchips">
        {CHIPS.map((c) => (
          <button key={c} type="button" onClick={(e) => { e.stopPropagation(); stopDemo.current = true; setTyping(''); run(c) }}>{c}</button>
        ))}
      </div>
    </div>
  )
}
