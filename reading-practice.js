/**
 * Reading free intro — Phase 5
 * Loads fixed free passage from data/reading-intro.json
 * No timer. Immediate feedback. Open to everyone.
 */

const INTRO_URL = "data/reading-intro.json";

const state = {
  passage: null,
  index: 0,
  answers: new Map(),
  ready: false,
};

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
const statusEl = document.querySelector("[data-reading-status]");

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

function normalizeQuestion(raw) {
  const options = Array.isArray(raw.options)
    ? raw.options.map((option) => {
        if (typeof option === "string") return { key: option, text: option };
        return {
          key: String(option.key ?? "").trim(),
          text: String(option.text ?? "").trim(),
        };
      })
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
  const source = raw.passage || raw;
  const items = (source.items || source.questions || []).map(normalizeQuestion);
  return {
    id: source.id || raw.id || "READ-INTRO",
    title: source.title || raw.title || "Reading passage",
    text: source.text || "",
    items,
  };
}

async function loadIntro() {
  const response = await fetch(INTRO_URL, { cache: "no-cache" });
  if (!response.ok) throw new Error(`Could not load ${INTRO_URL} (${response.status}).`);
  const data = await response.json();
  const passage = normalizePassage(data);
  if (!passage.items.length) throw new Error("Intro passage has no questions.");
  return passage;
}

function renderQuestion() {
  if (!state.ready) return;
  const item = state.passage.items[state.index];
  const answer = state.answers.get(item.id);

  passageTitleEl.textContent = state.passage.title;
  passageTextEl.innerHTML = paragraphs(state.passage.text);
  counterEl.textContent = `${state.index + 1} / ${state.passage.items.length}`;
  metaEl.textContent = [item.questionType, item.difficulty].filter(Boolean).join(" · ");
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
  nextBtn.disabled = state.index === state.passage.items.length - 1;
  const answered = [...state.answers.values()];
  const correct = answered.filter((row) => row.correct).length;
  scoreEl.textContent = `${correct}/${answered.length || 0} correct`;
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
    }
  });
}

async function init() {
  setStatus("Loading free Reading sample…");
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  try {
    state.passage = await loadIntro();
    state.ready = true;
    setStatus(
      `Free fixed passage · ${state.passage.items.length} questions · no timer · not used in class bank drills`
    );
    bindControls();
    renderQuestion();
  } catch (error) {
    console.error(error);
    setStatus(`Could not load the free Reading sample. ${error.message}`, true);
    questionEl.textContent = "Practice unavailable until the passage loads.";
  }
}

init();
