import { useState } from 'react'
import { profile } from '../../data'
import { Reveal, SectionHead } from '../ui/Common.jsx'
import { copyText } from '../../hooks'
import { RESUME_URL } from '../../lib/download.js'

export default function Contact({ notify }) {
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('a data science internship')
  const [text, setText] = useState('')

  const who = name.trim() || '[your name]'
  const message = `Hi Preetham,\n\nI am ${who} and I am reaching out about ${topic}.${text.trim() ? '\n\n' + text.trim() : ''}\n\nBest regards,\n${who}`

  const submit = (e) => {
    e.preventDefault()
    copyText(`${message}\n\nSend to: ${profile.email}`, notify, 'Copied. Paste it into your email app.')
  }

  return (
    <section id="contact">
      <SectionHead title="Contact" label="let us talk" />
      <div className="cgrid2">
        <Reveal className="cl">
          <div className="row">
            <span className="k">Email</span><span className="v mono">{profile.email}</span>
            <button type="button" onClick={() => copyText(profile.email, notify, 'Email copied')}>Copy</button>
          </div>
          <div className="row">
            <span className="k">Phone</span><span className="v mono">{profile.phone}</span>
            <button type="button" onClick={() => copyText(profile.phone, notify, 'Phone copied')}>Copy</button>
          </div>
          <div className="row">
            <span className="k">Resume</span><span className="v mono">{profile.resumeFile}</span>
            <a className="go" href={RESUME_URL} download={profile.resumeFile} onClick={() => notify('Resume downloading')}>Download ↓</a>
          </div>
          <div className="row">
            <span className="k">LinkedIn</span>
            <a className="v mono" href={profile.linkedin} target="_blank" rel="noopener">{profile.linkedinLabel}</a>
            <a className="go" href={profile.linkedin} target="_blank" rel="noopener">Open ↗</a>
          </div>
          <div className="row">
            <span className="k">GitHub</span>
            <a className="v mono" href={profile.github} target="_blank" rel="noopener">{profile.githubLabel}</a>
            <a className="go" href={profile.github} target="_blank" rel="noopener">Open ↗</a>
          </div>
        </Reveal>

        <Reveal as="form" className="msg" onSubmit={submit}>
          <h3>Write the first message</h3>
          <label htmlFor="fn">Your name
            <input id="fn" value={name} onChange={(e) => setName(e.target.value)} placeholder="Priya from Acme" autoComplete="name" />
          </label>
          <label htmlFor="ft">What is it about?
            <select id="ft" value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option>a data science internship</option>
              <option>a full-time role</option>
              <option>a project collaboration</option>
              <option>a quick question</option>
            </select>
          </label>
          <label htmlFor="fm">Message
            <textarea id="fm" value={text} onChange={(e) => setText(e.target.value)} placeholder="A line or two about what you have in mind" />
          </label>
          <div className="preview">{message}</div>
          <button className="btn p" type="submit">Copy message and email address</button>
        </Reveal>
      </div>
    </section>
  )
}
