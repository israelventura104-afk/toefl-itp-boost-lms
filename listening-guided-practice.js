/**
 * Listening guided practice — Phase 6
 * 10 random Part A items, no timer, feedback, save on complete.
 */

const PRACTICE_SIZE = 10;

const state = {
  pool: [],
  rows: [],
  index: 0,
  answers: new Map(),
  sessionNumber: 1,
  saved: false,
};

const statusEl = document.querySelector("[data-guided-status]");
const sessionLabelEl = document.querySelector("[data-session-label]");
const counterEl = document.querySelector("[data-counter]");
const scoreEl = document.querySelector("[data-score]");
const metaEl = document.querySelector("[data-meta]");
const topicEl = document.querySelector("[data-topic]");
const audioEl = document.querySelector("[data-audio]");
const questionEl = document.querySelector("[data-question]");
const optionsEl = document.querySelector("[data-options]");
const feedbackEl = document.querySelector("[data-feedback]");
const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");
const resultsEl = document.querySelector("[data-results]");
const mistakesEl = document.querySelector("[data-mistakes]");
const finalScoreEl = document.querySelector("[data-final-score]");
const finalNoteEl = document.querySelector("[data-final-note]");
const resultMessageEl = document.querySelector("[data-result-message]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function startSet() {
  const picked = window.ListeningLib.shuffle([...state.pool]).slice(0, PRACTICE_SIZE);
  state.rows = window.ListeningLib.flattenRows(picked);
  state.index = 0;
  state.answers = new Map();
  state.saved = false;
  resultsEl.hidden = true;
  sessionLabelEl.textContent = `Set ${state.sessionNumber} · ${state.rows.length} items · bank ${state.pool.length} · no timer`;
  render();
}

function render() {
  const row = state.rows[state.index];
  if (!row) return;
  const { item, question } = row;
  const answer = state.answers.get(question.id);

  counterEl.textContent = `${state.index + 1} / ${state.rows.length}`;
  metaEl.textContent = [item.difficulty, item.assetType].filter(Boolean).join(" · ");
  topicEl.textContent = item.topic || "Campus conversation";
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
      if (state.answers.size === state.rows.length) finishIfComplete();
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
  nextBtn.textContent = state.index === state.rows.length - 1 ? "Finish" : "Next";
  const answered = [...state.answers.values()];
  scoreEl.textContent = `${answered.filter((a) => a.correct).length}/${answered.length || 0} correct`;
}

function finishIfComplete() {
  if (state.answers.size < state.rows.length) {
    setStatus(
      `Answer all ${state.rows.length} items before finishing. (${state.rows.length - state.answers.size} left)`
    );
    return;
  }
  if (state.saved) {
    showResults();
    return;
  }

  const items = state.rows.map(({ item, question }) => {
    const answer = state.answers.get(question.id);
    return {
      questionId: question.id,
      skill: item.topic || "Listening",
      subskill: item.assetType || "",
      correct: Boolean(answer?.correct),
      prompt: question.prompt,
      assetId: item.id,
    };
  });
  const correct = items.filter((row) => row.correct).length;

  if (window.ToeflProgress?.recordListeningSession) {
    window.ToeflProgress.recordListeningSession({
      mode: "guided",
      correct,
      total: items.length,
      items,
    });
  }
  state.saved = true;
  showResults();
}

function showResults() {
  const correct = state.rows.filter((row) => state.answers.get(row.question.id)?.correct).length;
  const studyRows = state.rows.map(({ item, question }) => ({
    skill: item.topic || item.assetType || "Listening",
    correct: Boolean(state.answers.get(question.id)?.correct),
  }));
  const mistakeCards = state.rows
    .filter((row) => !state.answers.get(row.question.id)?.correct)
    .map(({ item, question }) => {
      const answer = state.answers.get(question.id);
      return {
        tag: [item.id, item.topic || item.assetType].filter(Boolean).join(" · "),
        stem: question.prompt,
        yours: answer?.selectedKey || "—",
        correct: `${question.correctKey}. ${question.correctAnswer}`,
        explanation: question.explanation,
      };
    });

  if (window.ResultsLib) {
    ResultsLib.paint({
      scoreEl: finalScoreEl,
      noteEl: finalNoteEl,
      messageEl: resultMessageEl,
      studyEl: document.querySelector("[data-study-focus]"),
      mistakesEl,
      correct,
      total: state.rows.length,
      studyRows,
      mistakes: mistakeCards,
    });
  }

  resultsEl.hidden = false;
  resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
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
      return;
    }
    finishIfComplete();
  });
  document.querySelector("[data-replay]")?.addEventListener("click", () => {
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  });
  const fresh = () => {
    state.sessionNumber += 1;
    startSet();
    document.querySelector(".guided-practice-panel")?.scrollIntoView({ behavior: "smooth" });
  };
  document.querySelector("[data-new-set]")?.addEventListener("click", fresh);
  document.querySelector("[data-new-set-result]")?.addEventListener("click", fresh);
}

async function boot() {
  setStatus("Loading Listening class bank…");
  try {
    state.pool = await window.ListeningLib.loadClassItems({ excludeIntro: true });
    if (state.pool.length < PRACTICE_SIZE) {
      throw new Error(`Need at least ${PRACTICE_SIZE} class items with audio (found ${state.pool.length}).`);
    }
    setStatus(
      `Class bank ready · ${state.pool.length} short conversations · sets of ${PRACTICE_SIZE} · free samples excluded`
    );
    bind();
    startSet();
  } catch (error) {
    console.error(error);
    setStatus(`Could not load Listening bank. ${error.message}`, true);
  }
}

if (window.ToeflAccess?.guardPage) {
  window.ToeflAccess.guardPage({
    title: "Listening guided practice is protected",
    body: "Class Listening drills are for Teacher Israel Ventura's groups. Enter the class code your teacher gave you. Free sample clips stay open on the Listening page.",
    secondaryHref: "listening.html",
    secondaryLabel: "Back to free Listening preview",
    onUnlocked: boot,
  });
} else {
  boot();
}
