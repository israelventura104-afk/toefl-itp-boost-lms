/**
 * Reading guided practice — Phase 5
 * Random class-bank passage, no timer, immediate feedback, saves on completion.
 */

const BANK_URL = "data/reading-bank.json";
const INTRO_URL = "data/reading-intro.json";

const state = {
  bank: [],
  passage: null,
  index: 0,
  answers: new Map(),
  sessionNumber: 1,
  saved: false,
};

const statusEl = document.querySelector("[data-guided-status]");
const sessionLabelEl = document.querySelector("[data-session-label]");
const passageTitleEl = document.querySelector("[data-reading-title]");
const passageTextEl = document.querySelector("[data-reading-text]");
const questionEl = document.querySelector("[data-reading-question]");
const metaEl = document.querySelector("[data-reading-meta]");
const optionsEl = document.querySelector("[data-reading-options]");
const feedbackEl = document.querySelector("[data-reading-feedback]");
const counterEl = document.querySelector("[data-reading-counter]");
const prevBtn = document.querySelector("[data-reading-prev]");
const nextBtn = document.querySelector("[data-reading-next]");
const scoreEl = document.querySelector("[data-reading-score]");
const resultsEl = document.querySelector("[data-results]");
const skillSummaryEl = document.querySelector("[data-skill-summary]");
const finalScoreEl = document.querySelector("[data-final-score]");
const finalNoteEl = document.querySelector("[data-final-note]");
const resultMessageEl = document.querySelector("[data-result-message]");
const newPassageBtn = document.querySelector("[data-new-passage]");
const newPassageResultBtn = document.querySelector("[data-new-passage-result]");

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
  return String(skill || "Reading")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeQuestion(raw) {
  const options = Array.isArray(raw.options)
    ? raw.options.map((option) => ({
        key: String(option.key ?? "").trim(),
        text: String(option.text ?? "").trim(),
      }))
    : [];
  const correctKey = String(raw.correctKey ?? "").trim();
  const hit = options.find((option) => option.key === correctKey);
  return {
    id: String(raw.id ?? "").trim(),
    question: raw.question || "",
    questionType: raw.questionType || raw.skill || "Reading",
    skill: raw.skill || raw.questionType || "Reading",
    difficulty: raw.difficulty || "",
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || hit?.text || correctKey,
    explanation: raw.explanation || "",
  };
}

function normalizePassage(raw) {
  const items = (raw.items || raw.questions || []).map(normalizeQuestion);
  return {
    id: raw.id,
    title: raw.title || "Reading passage",
    category: raw.category || "",
    text: raw.text || "",
    items,
  };
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
      /* keep default */
    }
  }

  const passages = (bankData.passages || [])
    .map(normalizePassage)
    .filter((p) => p.id && p.id !== introId && p.items.length > 0);

  if (!passages.length) throw new Error("No class Reading passages available.");
  return passages;
}

function pickPassage() {
  const index = Math.floor(Math.random() * state.bank.length);
  return state.bank[index];
}

function startPassage() {
  state.passage = pickPassage();
  state.index = 0;
  state.answers = new Map();
  state.saved = false;
  resultsEl.hidden = true;
  sessionLabelEl.textContent = `Passage set ${state.sessionNumber} · ${state.passage.title} · ${state.passage.items.length} questions · bank ${state.bank.length}`;
  renderQuestion();
}

function maybeSaveAndShowResults() {
  if (state.answers.size < state.passage.items.length) return;
  if (state.saved) {
    showResults();
    return;
  }

  const items = state.passage.items.map((item) => {
    const answer = state.answers.get(item.id);
    return {
      questionId: item.id,
      skill: item.skill,
      subskill: item.questionType || "",
      correct: Boolean(answer?.correct),
      prompt: item.question,
    };
  });
  const correct = items.filter((row) => row.correct).length;

  if (window.ToeflProgress?.recordReadingSession) {
    window.ToeflProgress.recordReadingSession({
      mode: "guided",
      passageId: state.passage.id,
      passageTitle: state.passage.title,
      correct,
      total: items.length,
      items,
    });
  }
  state.saved = true;
  showResults();
}

function showResults() {
  const items = state.passage.items;
  const correct = items.filter((item) => state.answers.get(item.id)?.correct).length;
  const percent = Math.round((correct / items.length) * 100);

  finalScoreEl.textContent = `${correct}/${items.length}`;
  finalNoteEl.textContent = `${percent}% · ${state.passage.title}`;
  resultMessageEl.textContent =
    percent >= 80
      ? "Strong passage. Try another, or move to a timed Reading mock."
      : "Useful signal: review the skills below, then take another passage.";

  const summary = new Map();
  items.forEach((item) => {
    const skill = normalizeSkill(item.skill);
    if (!summary.has(skill)) summary.set(skill, { correct: 0, total: 0 });
    const row = summary.get(skill);
    row.total += 1;
    if (state.answers.get(item.id)?.correct) row.correct += 1;
  });
  skillSummaryEl.innerHTML = [...summary.entries()]
    .map(
      ([skill, row]) =>
        `<article class="skill-result"><span>${skill}</span><strong>${row.correct}/${row.total}</strong></article>`
    )
    .join("");

  resultsEl.hidden = false;
  resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderQuestion() {
  const item = state.passage.items[state.index];
  const answer = state.answers.get(item.id);

  passageTitleEl.textContent = state.passage.title;
  passageTextEl.innerHTML = paragraphs(state.passage.text);
  counterEl.textContent = `${state.index + 1} / ${state.passage.items.length}`;
  metaEl.textContent = [normalizeSkill(item.skill), item.difficulty]
    .filter(Boolean)
    .join(" · ");
  questionEl.textContent = item.question;
  optionsEl.innerHTML = "";

  item.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.innerHTML = `<b>${option.key}</b><span>${option.text}</span>`;
    if (answer) {
      button.disabled = true;
      if (option.key === item.correctKey) button.classList.add("correct");
      if (option.key === answer.selectedKey && !answer.correct) button.classList.add("incorrect");
    }
    button.addEventListener("click", () => {
      state.answers.set(item.id, {
        selectedKey: option.key,
        correct: option.key === item.correctKey,
      });
      renderQuestion();
      if (state.answers.size === state.passage.items.length) {
        maybeSaveAndShowResults();
      }
    });
    optionsEl.appendChild(button);
  });

  if (!answer) {
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = "";
  } else {
    feedbackEl.hidden = false;
    feedbackEl.className = `practice-feedback ${answer.correct ? "is-correct" : "is-incorrect"}`;
    feedbackEl.innerHTML = `
      <strong>${answer.correct ? "Correct" : "Incorrect"}</strong>
      <p>The correct answer is <b>${item.correctKey}. ${item.correctAnswer}</b></p>
      <p>${item.explanation}</p>
    `;
  }

  prevBtn.disabled = state.index === 0;
  nextBtn.textContent =
    state.index === state.passage.items.length - 1 ? "Finish" : "Next";
  const answered = [...state.answers.values()];
  scoreEl.textContent = `${answered.filter((a) => a.correct).length}/${answered.length || 0} correct`;
}

function bindControls() {
  prevBtn.addEventListener("click", () => {
    if (state.index > 0) {
      state.index -= 1;
      renderQuestion();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (state.index < state.passage.items.length - 1) {
      state.index += 1;
      renderQuestion();
      return;
    }
    if (state.answers.size < state.passage.items.length) {
      setStatus(
        `Answer all ${state.passage.items.length} questions before finishing. (${state.passage.items.length - state.answers.size} left)`
      );
      return;
    }
    maybeSaveAndShowResults();
  });

  const fresh = () => {
    state.sessionNumber += 1;
    startPassage();
    document
      .querySelector(".guided-practice-panel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  newPassageBtn.addEventListener("click", fresh);
  newPassageResultBtn.addEventListener("click", fresh);
}

async function boot() {
  setStatus("Loading Reading class bank…");
  try {
    state.bank = await loadBank();
    const qTotal = state.bank.reduce((sum, p) => sum + p.items.length, 0);
    setStatus(
      `Class bank ready · ${state.bank.length} passages · ${qTotal} questions · free intro excluded · no timer`
    );
    bindControls();
    startPassage();
  } catch (error) {
    console.error(error);
    setStatus(`Could not load Reading bank. ${error.message}`, true);
  }
}

if (window.ToeflAccess?.guardPage) {
  window.ToeflAccess.guardPage({
    title: "Reading guided practice is protected",
    body: "Class Reading bank drills are for Teacher Israel Ventura's groups. Enter the class code your teacher gave you. The free sample passage stays open on the Reading page.",
    secondaryHref: "reading.html",
    secondaryLabel: "Back to free Reading preview",
    onUnlocked: boot,
  });
} else {
  boot();
}
