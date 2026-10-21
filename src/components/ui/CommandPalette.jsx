import { useEffect, useRef, useState } from 'react'
import { Dialog } from './Common.jsx'

export default function CommandPalette({ open, setOpen, commands }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const input = useRef(null)

  const list = commands.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    if (open) { setQ(''); setSel(0); setTimeout(() => input.current && input.current.focus(), 30) }
  }, [open])

  const run = (c) => { setOpen(false); c.run() }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { setSel((s) => Math.min(s + 1, list.length - 1)); e.preventDefault() }
    else if (e.key === 'ArrowUp') { setSel((s) => Math.max(s - 1, 0)); e.preventDefault() }
    else if (e.key === 'Enter' && list[sel]) run(list[sel])
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} id="pal">
      <div className="mb">
        <input
          ref={input}
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0) }}
          onKeyDown={onKey}
          placeholder="Jump to a section or run an action"
          aria-label="Command search"
          autoComplete="off"
        />
        <ul>
          {list.map((c, i) => (
            <li key={c.name}>
              <button type="button" className={i === sel ? 'sel' : ''} onClick={() => run(c)}>
                {c.name}<small>{c.hint}</small>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  )
}
