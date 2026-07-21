/**
 * Full ITP-style mock — Phase 7
 * Listening (50/35) → Structure (40/25) → Reading (50/55)
 * No feedback until the entire exam ends.
 */

const SECTIONS = [
  {
    id: "listening",
    label: "Listening",
    size: 50,
    seconds: 35 * 60,
  },
  {
    id: "structure",
    label: "Structure & Written Expression",
    size: 40,
    seconds: 25 * 60,
  },
  {
    id: "reading",
    label: "Reading Comprehension",
    size: 50,
    seconds: 55 * 60,
  },
];

const state = {
  banks: { listening: [], structure: [], reading: [] },
  sectionIndex: 0,
  rows: [], // current section flat items
  index: 0,
  answers: new Map(), // key: row.uid -> choice key
  sectionResults: {}, // sectionId -> { correct, total, percent, rows, answers snapshot }
  secondsLeft: 0,
  timerId: null,
  startedAt: null,
  ready: false,
  finishing: false,
};

const statusEl = document.querySelector("[data-full-status]");
const startPanel = document.querySelector("[data-full-start]");
const examPanel = document.querySelector("[data-full-exam]");
const resultsPanel = document.querySelector("[data-full-results]");
const sectionLabelEl = document.querySelector("[data-full-section-label]");
const timerEl = document.querySelector("[data-full-timer]");
const answeredEl = document.querySelector("[data-full-answered]");
const counterEl = document.querySelector("[data-full-counter]");
const typeEl = document.querySelector("[data-full-type]");
const metaEl = document.querySelector("[data-full-meta]");
const questionEl = document.querySelector("[data-full-question]");
const optionsEl = document.querySelector("[data-full-options]");
const navEl = document.querySelector("[data-full-nav]");
const passageWrap = document.querySelector("[data-full-passage-wrap]");
const passageTitleEl = document.querySelector("[data-full-passage-title]");
const passageTextEl = document.querySelector("[data-full-passage-text]");
const audioWrap = document.querySelector("[data-full-audio-wrap]");
const audioEl = document.querySelector("[data-full-audio]");
const beginBtn = document.querySelector("[data-full-begin]");
const prevBtn = document.querySelector("[data-full-prev]");
const nextBtn = document.querySelector("[data-full-next]");
const submitSectionBtn = document.querySelector("[data-full-submit-section]");
const retryBtn = document.querySelector("[data-full-retry]");
const stepsEl = document.querySelector("[data-full-steps]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function paragraphs(text) {
  if (Array.isArray(text)) {
    return text.map((block) => `<p>${block.content || block}</p>`).join("");
  }
  return String(text || "")
    .split(/\n\s*\n/)
    .map((p) => `<p>${p}</p>`)
    .join("");
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startSectionTimer(seconds) {
  stopTimer();
  state.secondsLeft = seconds;
  timerEl.textContent = formatTime(state.secondsLeft);
  timerEl.classList.remove("is-urgent");
  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    timerEl.textContent = formatTime(state.secondsLeft);
    if (state.secondsLeft <= 60) timerEl.classList.add("is-urgent");
    if (state.secondsLeft <= 0) {
      stopTimer();
      finishCurrentSection({ auto: true });
    }
  }, 1000);
}

function showPhase(phase) {
  startPanel.hidden = phase !== "start";
  examPanel.hidden = phase !== "exam";
  resultsPanel.hidden = phase !== "results";
}

function currentSection() {
  return SECTIONS[state.sectionIndex];
}

function updateSteps() {
  if (!stepsEl) return;
  stepsEl.querySelectorAll("[data-step]").forEach((el) => {
    const id = el.getAttribute("data-step");
    el.classList.toggle("is-active", id === currentSection().id);
    el.classList.toggle("is-done", Boolean(state.sectionResults[id]));
  });
}

/* -------------------- load banks -------------------- */

function formatCommonMistake(value, correctKey) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const entries = Object.entries(value).filter(([key]) => key !== correctKey);
    return entries[0] ? String(entries[0][1]) : "";
  }
  return "";
}

function normalizeStructureItem(raw) {
  const options = Array.isArray(raw.options)
    ? raw.options.map((option) => {
        if (typeof option === "string") return { key: option, text: option };
        return {
          key: String(option.key ?? "").trim(),
          text: String(option.text ?? option.key ?? "").trim(),
        };
      })
    : [];
  const correctKey = String(raw.correctKey ?? raw.correct_answer ?? "").trim();
  const hit = options.find((o) => o.key === correctKey);
  const rawType = raw.type || "Sentence Completion";
  const type =
    rawType === "structure_completion"
      ? "Sentence Completion"
      : rawType === "written_expression"
        ? "Error Identification"
        : rawType;
  return {
    id: String(raw.id ?? "").trim(),
    type,
    skill: raw.skill || "Structure",
    subskill: raw.subskill || "",
    prompt: raw.question || raw.stem || "",
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || hit?.text || correctKey,
    explanation: raw.explanation || "",
    commonMistake: formatCommonMistake(raw.commonMistake || raw.distractor_rationale, correctKey),
  };
}

function isErrorType(item) {
  const t = String(item.type || "").toLowerCase();
  return t.includes("error") || t.includes("written");
}

function buildStructureSet(bank, size) {
  const completion = shuffle(bank.filter((item) => !isErrorType(item)));
  const errors = shuffle(bank.filter((item) => isErrorType(item)));
  const chosen = [];
  chosen.push(...completion.slice(0, Math.min(15, completion.length, size)));
  chosen.push(...errors.slice(0, Math.min(25, errors.length, size - chosen.length)));
  if (chosen.length < size) {
    const used = new Set(chosen.map((i) => i.id));
    chosen.push(...shuffle(bank.filter((i) => !used.has(i.id))).slice(0, size - chosen.length));
  }
  return shuffle(chosen).slice(0, size).map((item) => ({
    uid: `structure:${item.id}`,
    section: "structure",
    kind: "structure",
    prompt: item.prompt,
    options: item.options,
    correctKey: item.correctKey,
    correctAnswer: item.correctAnswer,
    explanation: item.explanation,
    skill: item.skill,
    subskill: item.subskill,
    typeLabel: item.type,
    assetId: item.id,
  }));
}

function normalizeReadingQuestion(raw) {
  const options = (raw.options || []).map((option) => ({
    key: String(option.key ?? "").trim(),
    text: String(option.text ?? "").trim(),
  }));
  const correctKey = String(raw.correctKey ?? "").trim();
  const hit = options.find((o) => o.key === correctKey);
  return {
    id: String(raw.id ?? "").trim(),
    prompt: raw.question || "",
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || hit?.text || correctKey,
    explanation: raw.explanation || "",
    skill: raw.skill || raw.questionType || "Reading",
    typeLabel: raw.questionType || "Reading",
  };
}

function normalizeReadingPassage(raw) {
  return {
    id: raw.id,
    title: raw.title || "Passage",
    text: raw.text || "",
    items: (raw.items || raw.questions || []).map(normalizeReadingQuestion),
  };
}

async function loadStructureBank() {
  const [bankRes, introRes] = await Promise.all([
    fetch("data/structure-bank.json", { cache: "no-cache" }),
    fetch("data/structure-intro.json", { cache: "no-cache" }),
  ]);
  if (!bankRes.ok) throw new Error("Could not load structure bank");
  const bankData = await bankRes.json();
  let introIds = new Set();
  if (introRes.ok) {
    try {
      const intro = await introRes.json();
      introIds = new Set((intro.items || []).map((i) => i.id));
    } catch {
      /* ignore */
    }
  }
  return (bankData.items || bankData)
    .map(normalizeStructureItem)
    .filter((i) => i.id && i.prompt && i.options.length && i.correctKey)
    .filter((i) => !introIds.has(i.id));
}

async function loadReadingBank() {
  const [bankRes, introRes] = await Promise.all([
    fetch("data/reading-bank.json", { cache: "no-cache" }),
    fetch("data/reading-intro.json", { cache: "no-cache" }),
  ]);
  if (!bankRes.ok) throw new Error("Could not load reading bank");
  const bankData = await bankRes.json();
  let introId = "READ-0001";
  if (introRes.ok) {
    try {
      const intro = await introRes.json();
      introId = intro.passage?.id || intro.id || introId;
    } catch {
      /* ignore */
    }
  }
  return (bankData.passages || [])
    .map(normalizeReadingPassage)
    .filter((p) => p.id && p.id !== introId && p.items.length);
}

function buildReadingRows(passages, target) {
  const ordered = shuffle(passages);
  const flat = [];
  for (const passage of ordered) {
    if (flat.length >= target) break;
    for (const q of passage.items) {
      if (flat.length >= target) break;
      flat.push({
        uid: `reading:${q.id}`,
        section: "reading",
        kind: "reading",
        prompt: q.prompt,
        options: q.options,
        correctKey: q.correctKey,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        skill: q.skill,
        typeLabel: q.typeLabel,
        assetId: q.id,
        passageId: passage.id,
        passageTitle: passage.title,
        passageText: passage.text,
      });
    }
  }
  // keep passage blocks contiguous
  const byPassage = new Map();
  flat.forEach((row) => {
    if (!byPassage.has(row.passageId)) byPassage.set(row.passageId, []);
    byPassage.get(row.passageId).push(row);
  });
  return [...byPassage.values()].flat();
}

function buildListeningRows(items, size) {
  const picked = shuffle(items).slice(0, size);
  const rows = [];
  picked.forEach((item) => {
    item.questions.forEach((q) => {
      rows.push({
        uid: `listening:${item.id}:${q.id}`,
        section: "listening",
        kind: "listening",
        prompt: q.prompt,
        options: q.options,
        correctKey: q.correctKey,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        skill: item.topic || "Listening",
        typeLabel: item.assetType || "Part A",
        assetId: item.id,
        audio: item.audio,
        evidence: q.evidence || "",
      });
    });
  });
  return rows.slice(0, size);
}

async function loadAllBanks() {
  setStatus("Loading full mock banks…");
  beginBtn.disabled = true;
  const [listening, structure, reading] = await Promise.all([
    window.ListeningLib.loadClassItems({ excludeIntro: true }),
    loadStructureBank(),
    loadReadingBank(),
  ]);
  if (listening.length < 50) {
    throw new Error(`Listening bank needs 50 items (found ${listening.length}).`);
  }
  if (structure.length < 40) {
    throw new Error(`Structure bank needs 40 items (found ${structure.length}).`);
  }
  const readingQ = reading.reduce((s, p) => s + p.items.length, 0);
  if (readingQ < 50) {
    throw new Error(`Reading bank needs 50 questions (found ${readingQ}).`);
  }
  state.banks = { listening, structure, reading };
  state.ready = true;
  beginBtn.disabled = false;
  setStatus(
    `Full mock ready · Listening ${listening.length} · Structure ${structure.length} · Reading ${readingQ} Q · 140 items total`
  );
}

/* -------------------- exam flow -------------------- */

function buildSectionRows(sectionId) {
  if (sectionId === "listening") {
    return buildListeningRows(state.banks.listening, 50);
  }
  if (sectionId === "structure") {
    return buildStructureSet(state.banks.structure, 40);
  }
  return buildReadingRows(state.banks.reading, 50);
}

function beginExam() {
  if (!state.ready) return;
  state.sectionIndex = 0;
  state.sectionResults = {};
  state.startedAt = new Date().toISOString();
  startSection(0);
}

function startSection(sectionIndex) {
  state.sectionIndex = sectionIndex;
  state.rows = buildSectionRows(currentSection().id);
  state.index = 0;
  state.answers = new Map();
  state.finishing = false;
  sectionLabelEl.textContent = currentSection().label;
  setStatus(
    `Section ${sectionIndex + 1}/3 · ${currentSection().label} · ${state.rows.length} questions · no feedback until the full exam ends`
  );
  showPhase("exam");
  updateSteps();
  startSectionTimer(currentSection().seconds);
  renderItem();
  examPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateAnswered() {
  answeredEl.textContent = `${state.answers.size} / ${state.rows.length} answered`;
}

function renderNav() {
  navEl.innerHTML = state.rows
    .map((row, index) => {
      const answered = state.answers.has(row.uid);
      const current = index === state.index;
      return `<button type="button" class="mock-nav-btn${answered ? " is-answered" : ""}${
        current ? " is-current" : ""
      }" data-goto="${index}">${index + 1}</button>`;
    })
    .join("");
  navEl.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.index = Number(btn.getAttribute("data-goto"));
      renderItem();
    });
  });
}

function renderItem() {
  const row = state.rows[state.index];
  if (!row) return;
  const selected = state.answers.get(row.uid);

  counterEl.textContent = `${state.index + 1} / ${state.rows.length}`;
  typeEl.textContent = row.typeLabel || row.kind;
  metaEl.textContent = [row.skill, row.subskill].filter(Boolean).join(" · ");
  questionEl.textContent = row.prompt;

  // passage
  if (row.kind === "reading" && row.passageText) {
    passageWrap.hidden = false;
    passageTitleEl.textContent = row.passageTitle || "Passage";
    passageTextEl.innerHTML = paragraphs(row.passageText);
  } else {
    passageWrap.hidden = true;
    passageTitleEl.textContent = "";
    passageTextEl.innerHTML = "";
  }

  // audio
  if (row.kind === "listening" && row.audio) {
    audioWrap.hidden = false;
    if (audioEl.getAttribute("src") !== row.audio) {
      audioEl.src = row.audio;
      audioEl.load();
    }
  } else {
    audioWrap.hidden = true;
    audioEl.removeAttribute("src");
  }

  optionsEl.innerHTML = "";
  row.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${selected === option.key ? " is-selected" : ""}`;
    button.innerHTML = `<b>${option.key}</b><span>${option.text}</span>`;
    button.addEventListener("click", () => {
      state.answers.set(row.uid, option.key);
      updateAnswered();
      renderItem();
    });
    optionsEl.appendChild(button);
  });

  prevBtn.disabled = state.index === 0;
  nextBtn.textContent = state.index === state.rows.length - 1 ? "Last item" : "Next";
  updateAnswered();
  renderNav();
}

function scoreCurrentSection() {
  let correct = 0;
  const detail = state.rows.map((row) => {
    const selectedKey = state.answers.get(row.uid);
    const isCorrect = selectedKey === row.correctKey;
    if (isCorrect) correct += 1;
    return {
      ...row,
      selectedKey: selectedKey || null,
      correct: Boolean(selectedKey) && isCorrect,
      blank: !selectedKey,
    };
  });
  const total = state.rows.length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  return { correct, total, percent, detail };
}

function finishCurrentSection({ auto = false } = {}) {
  if (state.finishing) return;
  state.finishing = true;
  stopTimer();

  if (!auto && state.answers.size < state.rows.length) {
    const left = state.rows.length - state.answers.size;
    const ok = window.confirm(
      `${left} unanswered in ${currentSection().label}. Submit this section anyway?`
    );
    if (!ok) {
      state.finishing = false;
      if (state.secondsLeft > 0) {
        // resume timer without reset
        state.timerId = setInterval(() => {
          state.secondsLeft -= 1;
          timerEl.textContent = formatTime(state.secondsLeft);
          if (state.secondsLeft <= 60) timerEl.classList.add("is-urgent");
          if (state.secondsLeft <= 0) {
            stopTimer();
            finishCurrentSection({ auto: true });
          }
        }, 1000);
      }
      return;
    }
  }

  const scored = scoreCurrentSection();
  state.sectionResults[currentSection().id] = {
    ...scored,
    auto,
    label: currentSection().label,
  };

  // save section-level history too
  persistSection(currentSection().id, scored);

  if (state.sectionIndex < SECTIONS.length - 1) {
    const next = SECTIONS[state.sectionIndex + 1];
    setStatus(
      `${currentSection().label} submitted (${scored.correct}/${scored.total}). Starting ${next.label}…`
    );
    state.finishing = false;
    startSection(state.sectionIndex + 1);
    return;
  }

  finishExam();
}

function persistSection(sectionId, scored) {
  if (!window.ToeflProgress) return;
  const items = scored.detail.map((row) => ({
    questionId: row.assetId || row.uid,
    skill: row.skill,
    subskill: row.subskill || row.typeLabel || "",
    correct: row.correct,
    prompt: row.prompt,
    assetId: row.assetId,
  }));
  const payload = {
    mode: "mock",
    correct: scored.correct,
    total: scored.total,
    items,
  };
  if (sectionId === "structure" && window.ToeflProgress.recordStructureSession) {
    window.ToeflProgress.recordStructureSession(payload);
  }
  if (sectionId === "reading" && window.ToeflProgress.recordReadingSession) {
    window.ToeflProgress.recordReadingSession(payload);
  }
  if (sectionId === "listening" && window.ToeflProgress.recordListeningSession) {
    window.ToeflProgress.recordListeningSession(payload);
  }
}

function finishExam() {
  stopTimer();
  const L = state.sectionResults.listening;
  const S = state.sectionResults.structure;
  const R = state.sectionResults.reading;
  const totalCorrect = (L?.correct || 0) + (S?.correct || 0) + (R?.correct || 0);
  const totalItems = (L?.total || 0) + (S?.total || 0) + (R?.total || 0);
  const totalPercent = totalItems ? Math.round((totalCorrect / totalItems) * 100) : 0;

  if (window.ToeflProgress?.recordFullMock) {
    window.ToeflProgress.recordFullMock({
      startedAt: state.startedAt,
      finishedAt: new Date().toISOString(),
      listening: L && { correct: L.correct, total: L.total, percent: L.percent },
      structure: S && { correct: S.correct, total: S.total, percent: S.percent },
      reading: R && { correct: R.correct, total: R.total, percent: R.percent },
      correct: totalCorrect,
      total: totalItems,
      percent: totalPercent,
    });
  }

  document.querySelector("[data-full-total-score]").textContent =
    `${totalCorrect}/${totalItems}`;
  document.querySelector("[data-full-total-note]").textContent = `${totalPercent}% overall`;
  document.querySelector("[data-full-result-message]").textContent =
    "Full mock finished. Section scores below. Use guided practice on weak areas before another full attempt.";
  document.querySelector("[data-full-result-meta]").textContent =
    `Completed ${new Date().toLocaleString()} · Listening ${L?.percent ?? "—"}% · Structure ${S?.percent ?? "—"}% · Reading ${R?.percent ?? "—"}%`;

  document.querySelector("[data-full-section-scores]").innerHTML = SECTIONS.map((sec) => {
    const r = state.sectionResults[sec.id];
    if (!r) return "";
    return `<article class="skill-result">
      <span>${r.label}</span>
      <strong>${r.correct}/${r.total}</strong>
      <small>${r.percent}%</small>
    </article>`;
  }).join("");

  const review = document.querySelector("[data-full-review]");
  review.innerHTML = SECTIONS.map((sec) => {
    const r = state.sectionResults[sec.id];
    if (!r) return "";
    const misses = r.detail.filter((d) => !d.correct).length;
    const href =
      sec.id === "listening"
        ? "listening-guided-practice.html"
        : sec.id === "structure"
          ? "structure-guided-practice.html"
          : "reading-guided-practice.html";
    return `<article class="mistake-review-item">
      <span>${r.label}</span>
      <h4>${r.correct}/${r.total} correct (${r.percent}%)</h4>
      <p>${misses} miss${misses === 1 ? "" : "es"} in this section${r.auto ? " · section auto-submitted on time" : ""}.</p>
      <p><a class="button secondary compact-button" href="${href}">Practice ${sec.label.split(" ")[0]} guided</a></p>
    </article>`;
  }).join("");

  setStatus(`Full mock saved · ${totalCorrect}/${totalItems} (${totalPercent}%)`);
  showPhase("results");
  updateSteps();
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindControls() {
  beginBtn.addEventListener("click", beginExam);
  retryBtn.addEventListener("click", () => {
    showPhase("start");
    setStatus("Banks still loaded. Start when you are ready for another full mock.");
  });
  prevBtn.addEventListener("click", () => {
    if (state.index > 0) {
      state.index -= 1;
      renderItem();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (state.index < state.rows.length - 1) {
      state.index += 1;
      renderItem();
    }
  });
  submitSectionBtn.addEventListener("click", () => finishCurrentSection({ auto: false }));
  document.querySelector("[data-full-replay]")?.addEventListener("click", () => {
    if (!audioEl.src) return;
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  });
}

async function boot() {
  try {
    await loadAllBanks();
    bindControls();
    showPhase("start");
  } catch (error) {
    console.error(error);
    setStatus(`Could not prepare full mock. ${error.message}`, true);
    beginBtn.disabled = true;
  }
}

if (window.ToeflAccess?.guardPage) {
  window.ToeflAccess.guardPage({
    title: "Full mock is protected",
    body: "The full ITP-style mock is for Teacher Israel Ventura's class groups. Enter the class code your teacher gave you.",
    secondaryHref: "dashboard.html",
    secondaryLabel: "Back to dashboard",
    onUnlocked: boot,
  });
} else {
  boot();
}
