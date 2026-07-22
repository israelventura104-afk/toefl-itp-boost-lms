# TOEFL ITP Boost LMS â€” Status

**Canonical project folder:** `C:\Toefl Preparation\toefl-itp-boost-lms`  
**Source snapshot:** Codex output `Documents\Codex\2026-06-28\te\outputs\toefl-prep` (copied for Phase 0)  
**GitHub repo:** https://github.com/israelventura104-afk/toefl-itp-boost-lms  
**Live site (GitHub Pages):** https://israelventura104-afk.github.io/toefl-itp-boost-lms/  
**Hosting:** GitHub Pages from `master` `/` (Netlify was only a temporary preview)  
**Date frozen as baseline:** 2026-07-21

---

## What this project is

Static multi-page LMS for TOEFL ITP prep (HTML + CSS + JS).  
Pedagogical flow (target):

1. Free strategies + fixed intro practice  
2. Student commitment unlock  
3. Guided practice (no timer)  
4. Timed mocks (TOEFL real scenario)  
5. Later: full 140-question exam  

---

## What is REAL today

| Piece | Notes |
|--------|--------|
| Landing `index.html` | Marketing shell; modals open but no real auth |
| Structure free strategies (3) | Real teaching content on `structure.html` |
| Structure **10 fixed** intro questions | `structure-practice.js` â€” fixed order, feedback works |
| Structure guided practice (local copy) | **190-item bank** embedded + random balanced sets of **15**, no timer, skill/mistake review |
| Reading free strategies + 1 passage | `reading-practice.js` â€” feedback works |
| Listening free strategies (text only) | No audio practice yet |
| Strategies hub page | Static study text |
| Design system | `styles.css` + hero asset |

**Intro vs bank separation (Structure):**  
- Intro: 10 curated items (not sequential 0001â€“0010 only)  
- Practice bank: 190 items  
- No ID overlap between intro set and bank (verified at analysis time)

---

## What is UI / DEMO only

| Piece | Notes |
|--------|--------|
| Dashboard personalization | Hardcoded name â€œIsraelâ€, score 550, streak 6, drills 42 |
| Dashboard skill bars / mistake list | Static HTML, not from real sessions |
| Mock readiness meter | Decorative |
| â€œSign to unlockâ€ buttons | `disabled` â€” no unlock logic |
| â€œActivate my study planâ€ | Button with no handler |
| Signup / login modals | UI only, no accounts |
| Mock exam card (140 Q) | Copy only â€” **no mock page** |

---

## What is MISSING

| Piece | Notes |
|--------|--------|
| Real commitment gate | No `localStorage` (or backend) unlock |
| Persistent progress | No saved sessions driving the dashboard |
| Structure mock timed (40 Q / 25 min) | Not built |
| Full ITP mock (140) | Not built |
| Reading guided from full bank | `data/reading-bank.json` exists but app does not load it |
| Listening practice + audio | Content lives mainly in other folder (`toefl-itp-boost/app/listening`) |
| Single data pipeline | Quizzes embed banks in `.js`; `data/*.json` is not fetched at runtime |
| Auth / multi-student | Out of scope until later |

---

## Other folders (NOT canonical product UI)

| Path | Role |
|------|------|
| `C:\Toefl Preparation\toefl-itp-boost\` | Next.js experiment + item banks + listening raw assets â€” **content warehouse**, not the LMS UI |
| `C:\Toefl Preparation\index.html` | Orphan partial landing (incomplete) |
| Netlify `learingmanagesystem.netlify.app` | Old preview; guided JS there may be **outdated** (15 fixed only vs local 190) |
| GitHub `israelventura104-afk/toefl-itp-boost` | Mostly Structure item-bank commits â€” not this full LMS |

Do not develop features in two places at once.

---

## Hosting decision

- **Target:** GitHub Pages  
- **Why it fits:** this LMS is static files; Pages = free, same place as git, one push â†’ one site  
- **Netlify:** keep only as emergency preview if needed; not source of truth  
- **Do not redeploy** until a closed phase is done (avoids â€œwhich site is real?â€)

GitHub Pages notes:

- Project site URL shape: `https://<user>.github.io/<repo>/`  
- Prefer relative links (already mostly `dashboard.html`, etc.) so subpath hosting works  
- No server/backend on Pages â€” commitment/progress via `localStorage` first is correct  
- Private repo Pages may require GitHub Pro depending on account plan  

---

## Phase roadmap (agreed direction)

| Phase | Focus |
|-------|--------|
| **0** | One folder, one git, this STATUS â€” **done** |
| **1** | Structure entry stable (strategies + 10 fixed, single data source) â€” **done** |
| **2** | Teacher class-code access (`localStorage`) â€” **done** |
| **3** | Guided Structure 15 from 190 + dashboard shows real data â€” **done** |
| **4** | Structure mock timed 40 / 25 min â€” **done** |
| **5** | Reading same pattern â€” **done** |
| **6** | Listening + audio â€” **done** |
| **7** | Full mock 140 — **done** |

### Phase 1 notes (2026-07-21)

- Source of truth for free Structure practice: `data/structure-intro.json`
- `structure-practice.js` loads that JSON via `fetch` (no embedded bank)
- Fixed order, 10 items, no timer, immediate feedback + common trap line
- Strategies block (3 free lessons) unchanged on `structure.html`
- GitHub Pages required for local-like testing (or `npx serve`); `file://` cannot fetch JSON

### Phase 2 notes (2026-07-21)

- Teacher-only access via class code (no store, no prices, no accounts)
- Config: `data/access.json` â€” edit `codes` array; rotate per group/semester
- Runtime: `access.js` + `localStorage` key `toefl-itp-boost.teacherAccess.v1`
- **Open without code:** free strategies + Structure 10 fixed + Reading free sample
- **Needs code:** Structure guided practice (and later mocks / full banks)
- Default demo code (change it): `ITP-VENTURA-2026`
- Landing copy cleaned (no Sign up / Log in / free account CTAs)

### Phase 3 notes (2026-07-21)

- Guided practice loads `data/structure-bank.json` (190 items) via fetch â€” no embedded bank
- Free intro IDs from `structure-intro.json` are excluded from guided sets
- Session size 15, no timer, skill-balanced random selection
- Sessions saved in `localStorage` key `toefl-itp-boost.progress.v1` via `progress.js`
- Dashboard (`dashboard.js`) shows real skill breakdown, mistakes, streak, drill count, readiness
- Empty states when the student has not practiced yet on that device

### Phase 4 notes (2026-07-21)

- Structure mock page: `structure-mock.html` + `structure-mock.js`
- Exam conditions: **40 questions**, **25 minutes**, **no feedback until submit**
- Auto-submit when timer hits zero; confirm if submitting early with blanks
- Bank: `structure-bank.json` excluding free intro IDs
- Target mix when possible: ~15 completion + ~25 error-ID (bank currently has fewer error-style items; remainder filled from completion)
- Results save via `progress.js` with `mode: "mock"`
- Dashboard mock card links to Structure mock; readiness accounts for mock history

### Phase 5 notes (2026-07-21)

- Free Reading intro loads `data/reading-intro.json` (fixed passage READ-0001)
- Guided Reading: `reading-guided-practice.html` â€” random class passage from `reading-bank.json` (22 passages / ~194 Q), free intro excluded, no timer, save on completion
- Reading mock: `reading-mock.html` â€” ~50 questions / 55 minutes, multi-passage, feedback only at end
- Progress: `recordReadingSession` in `progress.js` (`readingSessions` in localStorage)
- Teacher class code required for guided + mock; free preview stays open

### Listening assets import (preâ€“Phase 6)

- Copied from `toefl-itp-boost/app/listening` into LMS `listening-assets/items/LIST-xxxx/`
- **Copied, not deleted** from the warehouse folder
- Normalized playback file: `audio.mp3` (original name in `audio-source.txt`)
- `data/listening-bank.json` â€” **89** items with audio (89 questions, Part A short conversations)
- `data/listening-pending.json` â€” **11** items JSON-only (no mp3 yet): 0081, 0083, 0085, 0088, 0090, 0092, 0094â€“0097, 0099
- UI for Listening free/guided/mock built in Phase 6

### Phase 6 notes

- Free Listening: 3 fixed samples (LIST-0001..0003) via `listening-practice.js` + `data/listening-intro.json`
- Guided: 10 random Part A items from ready bank (intro excluded), no timer
- Mock: 30 items / 20 min Part A focus (full 50Q/35min when B/C assets exist)
- Shared loader: `listening-lib.js`
- Progress: `recordListeningSession` / `listeningSessions`

---

## Working rules

1. All product work happens in **this folder** only.  
2. Next.js folder = content import source when needed.  
3. No parallel redesign until Structure phases 1â€“4 work.  
4. Publish to GitHub Pages only when a phase is explicitly â€œready to show.â€  

### Phase 7 notes

- Full mock page: `full-mock.html` + `full-mock.js`
- Order: Listening 50/35 → Structure 40/25 → Reading 50/55 (140 total)
- No feedback until all sections finish; each section timer auto-submits
- Free intro samples excluded from all three banks
- Listening section uses Part A short conversations (class bank)
- Saves section mocks + `recordFullMock` overall result

### Entry path update

- Landing no longer pushes "Open dashboard" as the main start
- Free short demo test: `demo-test.html` (3 Structure + 3 Listening + 3 Reading)
- Config: `data/demo-test.json`
- Dashboard remains for after class code / course work
