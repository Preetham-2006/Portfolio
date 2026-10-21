import { profile } from '../data'

/** Public URL of the resume PDF (works under any base path, e.g. GitHub Pages). */
export const RESUME_URL = import.meta.env.BASE_URL + profile.resumeFile

/** Starts the resume download without leaving the page. */
export function downloadResume() {
  const a = document.createElement('a')
  a.href = RESUME_URL
  a.download = profile.resumeFile
  document.body.appendChild(a)
  a.click()
  a.remove()
}
