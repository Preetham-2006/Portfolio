# Jaini Sai Preetham | Data Science Portfolio

Vite + React single page site. No backend, no API keys.

## Run it locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the build locally
```
Needs Node 18 or newer (`.nvmrc` says 20).

## Deploy
**Vercel** (easiest): push this folder to GitHub, then Vercel > Add New Project > import the repo > Deploy.
Vercel detects Vite by itself (`vercel.json` is included). Or use the CLI: `npx vercel --prod`.

**Netlify**: import the repo (`netlify.toml` is included), or drag the `dist/` folder onto app.netlify.com/drop after `npm run build`.

**GitHub Pages**: `VITE_BASE=/your-repo-name/ npm run build`, then publish `dist/`.

After deploying, open `index.html` and change `og:image` to the full address of your photo,
for example `https://your-site.vercel.app/photo.jpg`, so link previews show it.

## Where things are
```
public/                   files served as they are
  photo.jpg               your portrait (square, face in the upper middle)
  Jaini_Sai_Preetham_Resume.pdf   file behind every "Download resume" button
  favicon.png, robots.txt
src/
  data/                   ALL the words on the site
    profile.js            name, links, hero text, About paragraphs, roles
    skills.js             skill groups and the three summary boxes
    projects.js           projects
    experience.js         internship
    education.js          education and certificates
    navigation.js         section order
    themes.js             theme list
  components/
    layout/               nav, side rail, mobile tab bar, intro, skills ticker
    sections/             Hero, About, Skills, Experience, Projects, Certificates, Education, Contact
    ui/                   shared pieces: terminal, command palette, theme picker, helpers
  hooks/                  theme, toast, scroll helpers
  lib/download.js         resume download helper
  styles/                 tokens.css (colours) + one CSS file per area
```

## Common edits
- **Change text**: edit the files in `src/data/`.
- **Replace the resume**: overwrite `public/Jaini_Sai_Preetham_Resume.pdf` (keep the name, or change `resumeFile` in `profile.js`).
- **Replace the photo**: overwrite `public/photo.jpg` with a square image.
- **Change colours**: edit the three `[data-palette]` blocks in `src/styles/tokens.css`.
