/**
 * Listening free intro — Phase 6
 * Fixed sample clips (listening-intro ids). Immediate feedback. Open to everyone.
 */

const state = {
  rows: [],
  index: 0,
  answers: new Map(),
  ready: false,
};

const statusEl = document.querySelector("[data-listening-status]");
const counterEl = document.querySelector("[data-listening-counter]");
const scoreEl = document.querySelector("[data-listening-score]");
const metaEl = document.querySelector("[data-listening-meta]");
const topicEl = document.querySelector("[data-listening-topic]");
const audioEl = document.querySelector("[data-listening-audio]");
const questionEl = document.querySelector("[data-listening-question]");
const optionsEl = document.querySelector("[data-listening-options]");
const feedbackEl = document.querySelector("[data-listening-feedback]");
const prevBtn = document.querySelector("[data-listening-prev]");
const nextBtn = document.querySelector("[data-listening-next]");
const replayBtn = document.querySelector("[data-listening-replay]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function current() {
  return state.rows[state.index];
}

function render() {
  const row = current();
  if (!row) return;
  const { item, question } = row;
  const answer = state.answers.get(question.id);

  counterEl.textContent = `${state.index + 1} / ${state.rows.length}`;
  topicEl.textContent = item.topic || item.assetType;
  metaEl.textContent = [item.difficulty, item.assetType].filter(Boolean).join(" · ");
  questionEl.textContent = question.prompt;

  if (audioEl.getAttribute("src") !== item.audio) {
    audioEl.src = item.audio;
    audioEl.load();
  }

  optionsEl.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.innerHTML = `<b>${option.key}</b><span>${option.text}</span>`;
    if (answer) {
      button.disabled = true;
      if (option.key === question.correctKey) button.classList.add("correct");
      if (option.key === answer.selectedKey && !answer.correct) button.classList.add("incorrect");
    }
    button.addEventListener("click", () => {
      state.answers.set(question.id, {
        selectedKey: option.key,
        correct: option.key === question.correctKey,
      });
      render();
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
      <p>The correct answer is <b>${question.correctKey}. ${question.correctAnswer}</b></p>
      <p>${question.explanation}</p>
      ${question.evidence ? `<small>Evidence: ${question.evidence}</small>` : ""}
    `;
  }

  prevBtn.disabled = state.index === 0;
  nextBtn.disabled = state.index === state.rows.length - 1;
  const answered = [...state.answers.values()];
  scoreEl.textContent = `${answered.filter((a) => a.correct).length}/${answered.length || 0} correct`;
}

function bind() {
  prevBtn.addEventListener("click", () => {
    if (state.index > 0) {
      state.index -= 1;
      render();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (state.index < state.rows.length - 1) {
      state.index += 1;
      render();
    }
  });
  replayBtn?.addEventListener("click", () => {
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  });
}

async function init() {
  setStatus("Loading free Listening samples…");
  try {
    const items = await window.ListeningLib.loadIntroItems();
    state.rows = window.ListeningLib.flattenRows(items);
    if (!state.rows.length) throw new Error("No free Listening samples available.");
    state.ready = true;
    setStatus(
      `Free fixed set · ${state.rows.length} short conversations · no timer · not reused in class drills`
    );
    bind();
    render();
  } catch (error) {
    console.error(error);
    setStatus(`Could not load free Listening samples. ${error.message}`, true);
  }
}

init();
