/**
 * Reading mock — Phase 5
 * ~50 questions, 55 minutes, multi-passage, feedback only at end.
 */

const BANK_URL = "data/reading-bank.json";
const INTRO_URL = "data/reading-intro.json";
const TARGET_QUESTIONS = 50;
const MOCK_SECONDS = 55 * 60;

const state = {
  bank: [],
  items: [], // flat { passage, question }
  index: 0,
  answers: new Map(),
  secondsLeft: MOCK_SECONDS,
  timerId: null,
  submitted: false,
};

const statusEl = document.querySelector("[data-mock-status]");
const startPanel = document.querySelector("[data-mock-start]");
const examPanel = document.querySelector("[data-mock-exam]");
const resultsPanel = document.querySelector("[data-mock-results]");
const timerEl = document.querySelector("[data-mock-timer]");
const answeredEl = document.querySelector("[data-mock-answered]");
const counterEl = document.querySelector("[data-mock-counter]");
const typeEl = document.querySelector("[data-mock-type]");
const metaEl = document.querySelector("[data-mock-meta]");
const questionEl = document.querySelector("[data-mock-question]");
const optionsEl = document.querySelector("[data-mock-options]");
const navEl = document.querySelector("[data-mock-nav]");
const passageTitleEl = document.querySelector("[data-mock-passage-title]");
const passageTextEl = document.querySelector("[data-mock-passage-text]");
const passageLabelEl = document.querySelector("[data-mock-passage-label]");
const beginBtn = document.querySelector("[data-mock-begin]");
const prevBtn = document.querySelector("[data-mock-prev]");
const nextBtn = document.querySelector("[data-mock-next]");
const submitBtn = document.querySelector("[data-mock-submit]");
const retryBtn = document.querySelector("[data-mock-retry]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
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

function normalizeSkill(skill) {
  if (window.ToeflProgress?.normalizeSkill) {
    return window.ToeflProgress.normalizeSkill(skill);
  }
  return String(skill || "Reading").replace(/[_-]+/g, " ");
}

function normalizeQuestion(raw) {
  const options = (raw.options || []).map((option) => ({
    key: String(option.key ?? "").trim(),
    text: String(option.text ?? "").trim(),
  }));
  const correctKey = String(raw.correctKey ?? "").trim();
  const hit = options.find((option) => option.key === correctKey);
  return {
    id: String(raw.id ?? "").trim(),
    question: raw.question || "",
    questionType: raw.questionType || raw.skill || "Reading",
    skill: raw.skill || raw.questionType || "Reading",
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || hit?.text || correctKey,
    explanation: raw.explanation || "",
  };
}

function normalizePassage(raw) {
  return {
    id: raw.id,
    title: raw.title || "Passage",
    text: raw.text || "",
    items: (raw.items || raw.questions || []).map(normalizeQuestion),
  };
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function loadBank() {
  const [bankRes, introRes] = await Promise.all([
    fetch(BANK_URL, { cache: "no-cache" }),
    fetch(INTRO_URL, { cache: "no-cache" }),
  ]);
  if (!bankRes.ok) throw new Error(`Could not load ${BANK_URL}`);
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
    .map(normalizePassage)
    .filter((p) => p.id && p.id !== introId && p.items.length);
}

function buildMockItems(passages, target) {
  const ordered = shuffle(passages);
  const flat = [];
  for (const passage of ordered) {
    if (flat.length >= target) break;
    passage.items.forEach((question) => {
      if (flat.length < target) flat.push({ passage, question });
    });
  }
  // Keep passage blocks contiguous for readability: regroup by passage order of first appearance
  const byPassage = new Map();
  flat.forEach((row) => {
    if (!byPassage.has(row.passage.id)) byPassage.set(row.passage.id, []);
    byPassage.get(row.passage.id).push(row);
  });
  return [...byPassage.values()].flat();
}

function formatTime(totalSeconds) {
  const safe = Math.max(0, totalSeconds);
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startTimer() {
  stopTimer();
  state.secondsLeft = MOCK_SECONDS;
  timerEl.textContent = formatTime(state.secondsLeft);
  timerEl.classList.remove("is-urgent");
  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    timerEl.textContent = formatTime(state.secondsLeft);
    if (state.secondsLeft <= 120) timerEl.classList.add("is-urgent");
    if (state.secondsLeft <= 0) {
      stopTimer();
      finishExam({ auto: true });
    }
  }, 1000);
}

function showPhase(phase) {
  startPanel.hidden = phase !== "start";
  examPanel.hidden = phase !== "exam";
  resultsPanel.hidden = phase !== "results";
}

function updateAnswered() {
  answeredEl.textContent = `${state.answers.size} / ${state.items.length} answered`;
}

function renderNav() {
  navEl.innerHTML = state.items
    .map((row, index) => {
      const answered = state.answers.has(row.question.id);
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
  const row = state.items[state.index];
  if (!row) return;
  const { passage, question } = row;
  const selected = state.answers.get(question.id);

  passageTitleEl.textContent = passage.title;
  passageTextEl.innerHTML = paragraphs(passage.text);
  passageLabelEl.textContent = passage.title.slice(0, 28) + (passage.title.length > 28 ? "…" : "");
  counterEl.textContent = `${state.index + 1} / ${state.items.length}`;
  typeEl.textContent = question.questionType || "Reading";
  metaEl.textContent = normalizeSkill(question.skill);
  questionEl.textContent = question.question;

  optionsEl.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${selected === option.key ? " is-selected" : ""}`;
    button.innerHTML = `<b>${option.key}</b><span>${option.text}</span>`;
    button.addEventListener("click", () => {
      state.answers.set(question.id, option.key);
      updateAnswered();
      renderItem();
    });
    optionsEl.appendChild(button);
  });

  prevBtn.disabled = state.index === 0;
  nextBtn.textContent = state.index === state.items.length - 1 ? "Last item" : "Next";
  updateAnswered();
  renderNav();
}

function beginExam() {
  state.items = buildMockItems(state.bank, TARGET_QUESTIONS);
  state.index = 0;
  state.answers = new Map();
  state.submitted = false;
  const passagesUsed = new Set(state.items.map((row) => row.passage.id)).size;
  setStatus(
    `Reading mock running · ${state.items.length} questions · ${passagesUsed} passages · feedback locked`
  );
  showPhase("exam");
  startTimer();
  renderItem();
  examPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function finishExam({ auto = false } = {}) {
  if (state.submitted) return;
  state.submitted = true;
  stopTimer();

  if (!auto && state.answers.size < state.items.length) {
    const left = state.items.length - state.answers.size;
    const ok = window.confirm(
      `You still have ${left} unanswered question(s). Submit the Reading mock anyway?`
    );
    if (!ok) {
      state.submitted = false;
      if (state.secondsLeft > 0) startTimerFromRemaining();
      return;
    }
  }

  const rows = state.items.map(({ passage, question }) => {
    const selectedKey = state.answers.get(question.id);
    const correct = selectedKey === question.correctKey;
    return {
      passage,
      question,
      selectedKey,
      correct: Boolean(selectedKey) && correct,
      blank: !selectedKey,
    };
  });

  const correctCount = rows.filter((row) => row.correct).length;
  const percent = Math.round((correctCount / state.items.length) * 100);
  const usedSeconds = MOCK_SECONDS - Math.max(0, state.secondsLeft);

  if (window.ToeflProgress?.recordReadingSession) {
    window.ToeflProgress.recordReadingSession({
      mode: "mock",
      correct: correctCount,
      total: state.items.length,
      durationSeconds: usedSeconds,
      timedOut: auto,
      passageIds: [...new Set(state.items.map((row) => row.passage.id))],
      items: rows.map(({ question, correct }) => ({
        questionId: question.id,
        skill: question.skill,
        subskill: question.questionType || "",
        correct,
        prompt: question.question,
      })),
    });
  }

  document.querySelector("[data-mock-final-score]").textContent =
    `${correctCount}/${state.items.length}`;
  document.querySelector("[data-mock-final-note]").textContent = `${percent}% · Reading mock`;
  document.querySelector("[data-mock-result-message]").textContent = auto
    ? "Time is up. Your answers were submitted automatically."
    : "Mock submitted. Feedback is unlocked for review.";
  document.querySelector("[data-mock-result-meta]").textContent =
    `Time used: ${formatTime(usedSeconds)} of 55:00 · Answered ${state.answers.size}/${state.items.length}`;

  renderSkills(rows);
  renderMistakes(rows);
  setStatus(`Reading mock saved · ${correctCount}/${state.items.length} (${percent}%)`);
  showPhase("results");
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startTimerFromRemaining() {
  stopTimer();
  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    timerEl.textContent = formatTime(state.secondsLeft);
    if (state.secondsLeft <= 120) timerEl.classList.add("is-urgent");
    if (state.secondsLeft <= 0) {
      stopTimer();
      finishExam({ auto: true });
    }
  }, 1000);
}

function renderSkills(rows) {
  const summary = new Map();
  rows.forEach(({ question, correct }) => {
    const skill = normalizeSkill(question.skill);
    if (!summary.has(skill)) summary.set(skill, { correct: 0, total: 0 });
    const row = summary.get(skill);
    row.total += 1;
    if (correct) row.correct += 1;
  });
  document.querySelector("[data-mock-skill-summary]").innerHTML = [...summary.entries()]
    .map(
      ([skill, row]) =>
        `<article class="skill-result"><span>${skill}</span><strong>${row.correct}/${row.total}</strong></article>`
    )
    .join("");
}

function renderMistakes(rows) {
  const host = document.querySelector("[data-mock-mistakes]");
  const misses = rows.filter((row) => !row.correct);
  if (!misses.length) {
    host.innerHTML =
      `<div class="empty-review"><strong>No misses on this mock.</strong><p>Excellent pacing and accuracy.</p></div>`;
    return;
  }
  host.innerHTML = misses
    .slice(0, 25)
    .map(({ question, selectedKey, blank, passage }) => {
      const yours = blank ? "no answer" : selectedKey;
      return `<article class="mistake-review-item">
        <span>${passage.title} · ${normalizeSkill(question.skill)}</span>
        <h4>${question.question}</h4>
        <p>You chose <b>${yours}</b>. Correct: <b>${question.correctKey}. ${question.correctAnswer}</b></p>
        <p>${question.explanation}</p>
      </article>`;
    })
    .join("");
  if (misses.length > 25) {
    host.innerHTML += `<p class="dash-empty-note">Showing 25 of ${misses.length} misses.</p>`;
  }
}

function bindControls() {
  beginBtn.addEventListener("click", beginExam);
  retryBtn.addEventListener("click", () => {
    showPhase("start");
    setStatus("Ready for another Reading mock.");
  });
  prevBtn.addEventListener("click", () => {
    if (state.index > 0) {
      state.index -= 1;
      renderItem();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (state.index < state.items.length - 1) {
      state.index += 1;
      renderItem();
    }
  });
  submitBtn.addEventListener("click", () => finishExam({ auto: false }));
}

async function boot() {
  setStatus("Loading Reading mock bank…");
  beginBtn.disabled = true;
  try {
    state.bank = await loadBank();
    const q = state.bank.reduce((sum, p) => sum + p.items.length, 0);
    setStatus(
      `Mock bank ready · ${state.bank.length} passages · ${q} questions · target ~${TARGET_QUESTIONS} Q / 55 min`
    );
    beginBtn.disabled = false;
    bindControls();
    showPhase("start");
  } catch (error) {
    console.error(error);
    setStatus(`Could not load Reading bank. ${error.message}`, true);
  }
}

if (window.ToeflAccess?.guardPage) {
  window.ToeflAccess.guardPage({
    title: "Reading mock is protected",
    body: "Timed Reading mocks are for Teacher Israel Ventura's class groups. Enter the class code your teacher gave you.",
    secondaryHref: "dashboard.html",
    secondaryLabel: "Back to dashboard",
    onUnlocked: boot,
  });
} else {
  boot();
}
