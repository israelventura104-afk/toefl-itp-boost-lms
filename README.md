# TOEFL ITP Boost (LMS)

Static preparation platform for TOEFL ITP — Structure, Reading, and Listening.

**Canonical local path:** `C:\Toefl Preparation\toefl-itp-boost-lms`  
**Status & honesty log:** see [STATUS.md](./STATUS.md)

## Run locally

No build step. Open in a browser, or serve the folder:

```bash
# optional local server (avoids some file:// limits)
npx --yes serve .
```

Then open the URL shown (usually `http://localhost:3000`).

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
