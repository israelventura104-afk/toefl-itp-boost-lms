# TOEFL ITP Boost LMS — Status

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
| Structure **10 fixed** intro questions | `structure-practice.js` — fixed order, feedback works |
| Structure guided practice (local copy) | **190-item bank** embedded + random balanced sets of **15**, no timer, skill/mistake review |
| Reading free strategies + 1 passage | `reading-practice.js` — feedback works |
| Listening free strategies (text only) | No audio practice yet |
| Strategies hub page | Static study text |
| Design system | `styles.css` + hero asset |

**Intro vs bank separation (Structure):**  
- Intro: 10 curated items (not sequential 0001–0010 only)  
- Practice bank: 190 items  
- No ID overlap between intro set and bank (verified at analysis time)

---

## What is UI / DEMO only

| Piece | Notes |
|--------|--------|
| Dashboard personalization | Hardcoded name “Israel”, score 550, streak 6, drills 42 |
| Dashboard skill bars / mistake list | Static HTML, not from real sessions |
| Mock readiness meter | Decorative |
| “Sign to unlock” buttons | `disabled` — no unlock logic |
| “Activate my study plan” | Button with no handler |
| Signup / login modals | UI only, no accounts |
| Mock exam card (140 Q) | Copy only — **no mock page** |

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
| `C:\Toefl Preparation\toefl-itp-boost\` | Next.js experiment + item banks + listening raw assets — **content warehouse**, not the LMS UI |
| `C:\Toefl Preparation\index.html` | Orphan partial landing (incomplete) |
| Netlify `learingmanagesystem.netlify.app` | Old preview; guided JS there may be **outdated** (15 fixed only vs local 190) |
| GitHub `israelventura104-afk/toefl-itp-boost` | Mostly Structure item-bank commits — not this full LMS |

Do not develop features in two places at once.

---

## Hosting decision

- **Target:** GitHub Pages  
- **Why it fits:** this LMS is static files; Pages = free, same place as git, one push → one site  
- **Netlify:** keep only as emergency preview if needed; not source of truth  
- **Do not redeploy** until a closed phase is done (avoids “which site is real?”)

GitHub Pages notes:

- Project site URL shape: `https://<user>.github.io/<repo>/`  
- Prefer relative links (already mostly `dashboard.html`, etc.) so subpath hosting works  
- No server/backend on Pages — commitment/progress via `localStorage` first is correct  
- Private repo Pages may require GitHub Pro depending on account plan  

---

## Phase roadmap (agreed direction)

| Phase | Focus |
|-------|--------|
| **0** | One folder, one git, this STATUS — **done** |
| **1** | Structure entry stable (strategies + 10 fixed, single data source) — **done** |
| **2** | Real commitment unlock (`localStorage`) |
| **3** | Guided Structure 15 from 190 + dashboard shows real data |
| **4** | Structure mock timed 40 / 25 min |
| **5** | Reading same pattern |
| **6** | Listening + audio |
| **7** | Full mock 140 + polish |

### Phase 1 notes (2026-07-21)

- Source of truth for free Structure practice: `data/structure-intro.json`
- `structure-practice.js` loads that JSON via `fetch` (no embedded bank)
- Fixed order, 10 items, no timer, immediate feedback + common trap line
- Strategies block (3 free lessons) unchanged on `structure.html`
- GitHub Pages required for local-like testing (or `npx serve`); `file://` cannot fetch JSON

---

## Working rules

1. All product work happens in **this folder** only.  
2. Next.js folder = content import source when needed.  
3. No parallel redesign until Structure phases 1–4 work.  
4. Publish to GitHub Pages only when a phase is explicitly “ready to show.”  
