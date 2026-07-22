/**
 * Structure free intro practice — Phase 1
 * Single source of truth: data/structure-intro.json
 * Fixed order (no shuffle). No timer. Immediate feedback.
 */

const INTRO_DATA_URL = "data/structure-intro.json";

const quizState = {
  index: 0,
  answers: new Map(),
  questions: [],
  ready: false,
};

const questionEl = document.querySelector("[data-question]");
const metaEl = document.querySelector("[data-question-meta]");
const optionsEl = document.querySelector("[data-options]");
const feedbackEl = document.querySelector("[data-feedback]");
const counterEl = document.querySelector("[data-counter]");
const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");
const scoreEl = document.querySelector("[data-score]");
const statusEl = document.querySelector("[data-practice-status]");
const practiceCardEl = document.querySelector("[data-practice-card]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function normalizeItem(raw) {
  const options = Array.isArray(raw.options)
    ? raw.options.map((option) => {
        if (typeof option === "string") {
          return { key: option, text: option };
        }
        return {
          key: String(option.key ?? "").trim(),
          text: String(option.text ?? option.key ?? "").trim(),
        };
      })
    : [];

  const correctKey = String(raw.correctKey ?? "").trim();
  const correctFromOptions = options.find((option) => option.key === correctKey);

  return {
    id: String(raw.id ?? "").trim(),
    type: raw.type || "Sentence Completion",
    skill: raw.skill || "Structure",
    subskill: raw.subskill || "",
    question: raw.question || raw.stem || "",
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || correctFromOptions?.text || correctKey,
    explanation: raw.explanation || "",
    commonMistake: raw.commonMistake || "",
  };
}

function validateQuestions(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Intro set is empty.");
  }

  items.forEach((item, index) => {
    if (!item.id) throw new Error(`Item ${index + 1} is missing id.`);
    if (!item.question) throw new Error(`Item ${item.id || index + 1} is missing question text.`);
    if (!item.options.length) throw new Error(`Item ${item.id} has no options.`);
    if (!item.correctKey) throw new Error(`Item ${item.id} is missing correctKey.`);
    const keys = item.options.map((option) => option.key);
    if (!keys.includes(item.correctKey)) {
      throw new Error(`Item ${item.id}: correctKey "${item.correctKey}" is not in options.`);
    }
  });

  const ids = items.map((item) => item.id);
  const unique = new Set(ids);
  if (unique.size !== ids.length) {
    throw new Error("Intro set has duplicate ids.");
  }
}

async function loadIntroQuestions() {
  const response = await fetch(INTRO_DATA_URL, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Could not load ${INTRO_DATA_URL} (${response.status}).`);
  }

  const data = await response.json();
  const rawItems = Array.isArray(data) ? data : data.items;
  if (!rawItems) {
    throw new Error("structure-intro.json must be an array or { items: [...] }.");
  }

  const items = rawItems.map(normalizeItem);
  validateQuestions(items);
  return items;
}

function renderQuestion() {
  if (!quizState.ready || !quizState.questions.length) return;

  const item = quizState.questions[quizState.index];
  const answer = quizState.answers.get(item.id);
  const total = quizState.questions.length;

  counterEl.textContent = `${quizState.index + 1} / ${total}`;
  metaEl.textContent = item.subskill
    ? `${item.skill} · ${item.subskill}`
    : item.skill;
  if (window.StructureLib) {
    StructureLib.setStructureQuestion(questionEl, item.question, item.type);
  } else {
    questionEl.textContent = item.question;
  }
  optionsEl.innerHTML = "";

  item.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.type = "button";
    button.innerHTML = `<b>${option.key}</b><span>${option.text}</span>`;

    if (answer) {
      button.disabled = true;
      if (option.key === item.correctKey) button.classList.add("correct");
      if (option.key === answer.selectedKey && !answer.correct) {
        button.classList.add("incorrect");
      }
    }

    button.addEventListener("click", () => chooseAnswer(item, option));
    optionsEl.appendChild(button);
  });

  renderFeedback(item);
  prevBtn.disabled = quizState.index === 0;
  nextBtn.disabled = quizState.index === total - 1;
  nextBtn.textContent =
    quizState.index === total - 1 && answer ? "Done" : "Next";
  updateScore();
}

function chooseAnswer(item, option) {
  const correct = option.key === item.correctKey;
  quizState.answers.set(item.id, {
    selectedKey: option.key,
    correct,
  });
  renderQuestion();
}

function renderFeedback(item) {
  const answer = quizState.answers.get(item.id);
  if (!answer) {
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = "";
    return;
  }

  feedbackEl.hidden = false;
  feedbackEl.className = `practice-feedback ${
    answer.correct ? "is-correct" : "is-incorrect"
  }`;

  const mistakeLine =
    !answer.correct && item.commonMistake
      ? `<p class="feedback-trap"><small>Common trap: ${item.commonMistake}</small></p>`
      : "";

  feedbackEl.innerHTML = `
    <strong>${answer.correct ? "Correct" : "Incorrect"}</strong>
    <p>The correct answer is <b>${item.correctKey}. ${item.correctAnswer}</b></p>
    <p>${item.explanation}</p>
    ${mistakeLine}
  `;
}

function updateScore() {
  const answered = [...quizState.answers.values()];
  const correct = answered.filter((entry) => entry.correct).length;
  scoreEl.textContent = `${correct}/${answered.length || 0} correct`;
}

function bindControls() {
  prevBtn.addEventListener("click", () => {
    if (quizState.index > 0) {
      quizState.index -= 1;
      renderQuestion();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (quizState.index < quizState.questions.length - 1) {
      quizState.index += 1;
      renderQuestion();
    }
  });
}

async function init() {
  setStatus("Loading the fixed practice set…");
  if (practiceCardEl) practiceCardEl.setAttribute("aria-busy", "true");
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    const questions = await loadIntroQuestions();
    quizState.questions = questions;
    quizState.ready = true;
    setStatus(
      `Fixed set · ${questions.length} questions · same order every time · no timer`
    );
    if (practiceCardEl) practiceCardEl.setAttribute("aria-busy", "false");
    bindControls();
    renderQuestion();
  } catch (error) {
    console.error(error);
    quizState.ready = false;
    setStatus(
      `Could not load the fixed practice set. Open this page via a local server or GitHub Pages (not as a raw file). ${error.message}`,
      true
    );
    if (practiceCardEl) practiceCardEl.setAttribute("aria-busy", "false");
    questionEl.textContent = "Practice unavailable until the question bank loads.";
    metaEl.textContent = "";
    optionsEl.innerHTML = "";
    counterEl.textContent = "— / —";
    scoreEl.textContent = "0/0 correct";
  }
}

init();
