# Listening Part C — validation rubric

**Section:** TOEFL ITP Listening · Part C (short talks / lectures)  
**Asset IDs:** LIST-0126 … LIST-0150  
**Pass rule:** average ≥ **4.0** and no dimension < **3**.  
**Bank context (2026-09-17):** Part A (LIST-0001–0100) and Part B (LIST-0101–0125) are complete; Part C expands the pool beyond 200 questions.

## What Part C is

- A **monologue** (one main speaker), not a two-student dialogue (that is Part B).
- Typical voices: professor, campus guide, museum docent, orientation speaker, guest lecturer.
- Length target: about **60–90 seconds** of spoken talk (slightly longer than Part B).
- Each asset: **1 talk + 4 questions** (A–D), answerable from the audio only.

## How talks are written

1. Clear **academic or campus topic** in one sentence (setting + audience).
2. **Narrator intro** (“Listen to a talk about…” / “a lecture in a … class…”).
3. **Monologue** of roughly 8–12 sentences: hook → main idea → 2–3 concrete details → brief close.
4. Natural spoken English; university vocabulary; **no ETS wording**.
5. **4 questions** in audio order, typically: Main Idea → Detail → Inference (or Attitude/Purpose) → Detail or Organization.
6. Distractors include at least one **same words / wrong meaning** trap.
7. Schema fields: `id`, `topic`, `setting`, `speaker`, `narrator_intro`, `talk[]` (or `monologue[]`), `narrator_outro`, `questions[]`, `part: "C"`.

## Dimensions (score 1–5)

| # | Dimension | What “5” looks like |
|---|-----------|---------------------|
| 1 | **ITP Part C format** | Narrator + one main speaker; 4 questions; A–D; clear intro/outro |
| 2 | **Talk authenticity** | Sounds like a real short campus/academic talk; not textbook stiff |
| 3 | **Answerable from audio** | Every key is supported by what is said (no outside knowledge) |
| 4 | **Question-type mix** | Main idea + detail + inference/purpose/attitude (organization OK) |
| 5 | **Distractors** | 3 plausible traps; ≥1 repeated-word wrong-meaning distractor |
| 6 | **Explanations** | Why correct + common mistake for each question |
| 7 | **Audio-ready script** | Speaker labels clean; spoken length roughly **60–90 seconds** |

## Batch notes

- Prefer **4 questions × 1 talk** per asset ID.
- Rotate domains (science, history, arts, campus life, environment, psychology, etc.) and avoid near-duplicates of other Part C talks.
- Do not recycle Part B dialogue scenarios as “talks.”
- `ready_for_practice` only when script + questions pass this rubric **and** normalized `audio.mp3` exists.

## Product wiring (after bank grows)

- Guided / section mock / full mock should eventually mix **Parts A + B + C**.
- Target official Listening mock shape when ready: **50 questions · 35 minutes**.
