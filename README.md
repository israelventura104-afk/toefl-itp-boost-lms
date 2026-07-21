# TOEFL ITP Boost (LMS)

Static preparation platform for TOEFL ITP — Structure, Reading, and Listening.

**Canonical local path:** `C:\Toefl Preparation\toefl-itp-boost-lms`  
**Status & honesty log:** see [STATUS.md](./STATUS.md)

## Run locally

No build step. **Use a local server** (the Structure intro quiz loads `data/*.json` with `fetch`, which does not work from `file://`).

```bash
cd "C:\Toefl Preparation\toefl-itp-boost-lms"
npx --yes serve .
```

Then open the URL shown (usually `http://localhost:3000`) and go to **Structure**.

## Host (canonical)

| | URL |
|--|-----|
| **Live site (GitHub Pages)** | https://israelventura104-afk.github.io/toefl-itp-boost-lms/ |
| **Source repo** | https://github.com/israelventura104-afk/toefl-itp-boost-lms |

Netlify was only a temporary preview — **not** the source of truth.

### Publish a change

```bash
cd "C:\Toefl Preparation\toefl-itp-boost-lms"
git add .
git commit -m "Describe the change"
git push
```

Pages rebuilds from the `master` branch root (usually 1–2 minutes).

## Teacher class codes (Phase 2)

Full class materials open only with **your** code. No store language, no prices, no student accounts.

1. Edit `data/access.json` → `codes` array (one or more codes).
2. Give the current code only to your students.
3. Rotate the code when a group ends.
4. Students enter it on **Dashboard → Class access** or when opening guided practice.
5. Access is saved on **that browser only** (`localStorage`). Use “Remove access on this device” to clear.

Default code after Phase 2 (change it): `ITP-VENTURA-2026`

**Note:** because the site is public on GitHub Pages, treat codes like class keys, not banking passwords. Rotate them.

## Student progress (Phase 3)

Guided Structure results save **on the student’s browser only** (`localStorage`).

- Bank: `data/structure-bank.json` (190)
- Free sample set never reused in guided: `data/structure-intro.json`
- Progress module: `progress.js`
- Dashboard reads that history for skills, mistakes, streak, and readiness

Clearing site data or switching devices resets progress (no cloud accounts yet).

## Structure mock (Phase 4)

Class-only timed Structure section:

- URL: `structure-mock.html`
- 40 questions · 25 minutes · feedback only after submit
- Same teacher class code as guided practice
- Results stored in the same local progress history (`mode: mock`)

## Project shape

```
index.html                      Landing
dashboard.html                  Student dashboard
structure.html                  Free strategies + 10 fixed questions
structure-practice.js
structure-guided-practice.html  Guided drill (15, no timer)
structure-guided-practice.js    Includes practice bank
reading.html / reading-practice.js
listening.html
strategies.html
styles.css
assets/
data/                           JSON banks (pipeline; quizzes currently embed data in JS)
```

## Do not confuse with

`C:\Toefl Preparation\toefl-itp-boost` — Next.js + raw item banks / listening files.  
That folder is a **content warehouse**, not this LMS UI.
