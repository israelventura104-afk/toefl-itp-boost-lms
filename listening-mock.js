/**
 * Listening mock — Phase 6
 * Part A focus: 30 items / 20 minutes until longer parts are in the bank.
 */

const MOCK_SIZE = 30;
const MOCK_SECONDS = 20 * 60;

const state = {
  pool: [],
  rows: [],
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
const itemLabelEl = document.querySelector("[data-mock-item-label]");
const audioEl = document.querySelector("[data-mock-audio]");
const questionEl = document.querySelector("[data-mock-question]");
const optionsEl = document.querySelector("[data-mock-options]");
const navEl = document.querySelector("[data-mock-nav]");
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
    if (state.secondsLeft <= 60) timerEl.classList.add("is-urgent");
    if (state.secondsLeft <= 0) {
      stopTimer();
      finishExam({ auto: true });
    }
  }, 1000);
}

function resumeTimer() {
  stopTimer();
  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    timerEl.textContent = formatTime(state.secondsLeft);
    if (state.secondsLeft <= 60) timerEl.classList.add("is-urgent");
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
  answeredEl.textContent = `${state.answers.size} / ${state.rows.length} answered`;
}

function renderNav() {
  navEl.innerHTML = state.rows
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
  const row = state.rows[state.index];
  if (!row) return;
  const { item, question } = row;
  const selected = state.answers.get(question.id);

  counterEl.textContent = `${state.index + 1} / ${state.rows.length}`;
  typeEl.textContent = item.assetType || "Part A";
  metaEl.textContent = [item.difficulty, item.topic].filter(Boolean).join(" · ");
  itemLabelEl.textContent = item.id;
  questionEl.textContent = question.prompt;

  if (audioEl.getAttribute("src") !== item.audio) {
    audioEl.src = item.audio;
    audioEl.load();
  }

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
  nextBtn.textContent = state.index === state.rows.length - 1 ? "Last item" : "Next";
  updateAnswered();
  renderNav();
}

function beginExam() {
  const picked = window.ListeningLib.shuffle([...state.pool]).slice(0, MOCK_SIZE);
  state.rows = window.ListeningLib.flattenRows(picked);
  state.index = 0;
  state.answers = new Map();
  state.submitted = false;
  setStatus(`Listening mock running · ${state.rows.length} Part A items · feedback locked`);
  showPhase("exam");
  startTimer();
  renderItem();
  examPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function finishExam({ auto = false } = {}) {
  if (state.submitted) return;
  state.submitted = true;
  stopTimer();

  if (!auto && state.answers.size < state.rows.length) {
    const left = state.rows.length - state.answers.size;
    const ok = window.confirm(
      `You still have ${left} unanswered question(s). Submit the Listening mock anyway?`
    );
    if (!ok) {
      state.submitted = false;
      if (state.secondsLeft > 0) resumeTimer();
      return;
    }
  }

  const rows = state.rows.map(({ item, question }) => {
    const selectedKey = state.answers.get(question.id);
    const correct = selectedKey === question.correctKey;
    return {
      item,
      question,
      selectedKey,
      correct: Boolean(selectedKey) && correct,
      blank: !selectedKey,
    };
  });

  const correctCount = rows.filter((row) => row.correct).length;
  const percent = Math.round((correctCount / state.rows.length) * 100);
  const usedSeconds = MOCK_SECONDS - Math.max(0, state.secondsLeft);

  if (window.ToeflProgress?.recordListeningSession) {
    window.ToeflProgress.recordListeningSession({
      mode: "mock",
      correct: correctCount,
      total: state.rows.length,
      durationSeconds: usedSeconds,
      timedOut: auto,
      items: rows.map(({ item, question, correct }) => ({
        questionId: question.id,
        skill: item.topic || "Listening",
        subskill: item.assetType || "",
        correct,
        prompt: question.prompt,
        assetId: item.id,
      })),
    });
  }

  const studyRows = rows.map(({ item, correct }) => ({
    skill: item.topic || item.assetType || "Listening",
    correct,
  }));
  const mistakeCards = rows
    .filter((row) => !row.correct)
    .slice(0, 20)
    .map(({ item, question, selectedKey, blank }) => ({
      tag: [item.id, item.topic || item.assetType].filter(Boolean).join(" · "),
      stem: question.prompt,
      yours: blank ? "no answer" : selectedKey,
      correct: `${question.correctKey}. ${question.correctAnswer}`,
      explanation: question.explanation,
    }));

  if (window.ResultsLib) {
    ResultsLib.paint({
      scoreEl: document.querySelector("[data-mock-final-score]"),
      noteEl: document.querySelector("[data-mock-final-note]"),
      messageEl: document.querySelector("[data-mock-result-message]"),
      metaEl: document.querySelector("[data-mock-result-meta]"),
      studyEl: document.querySelector("[data-mock-study-focus]"),
      mistakesEl: document.querySelector("[data-mock-mistakes]"),
      correct: correctCount,
      total: state.rows.length,
      message: auto ? "Time is up — answers submitted automatically." : "",
      meta: `Time used: ${formatTime(usedSeconds)} of 20:00 · Answered ${state.answers.size}/${state.rows.length}`,
      studyRows,
      mistakes: mistakeCards,
    });
  }

  setStatus(`Listening mock saved · ${correctCount}/${state.rows.length} (${percent}%)`);
  showPhase("results");
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bind() {
  beginBtn.addEventListener("click", beginExam);
  retryBtn.addEventListener("click", () => {
    showPhase("start");
    setStatus("Ready for another Listening mock.");
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
  submitBtn.addEventListener("click", () => finishExam({ auto: false }));
  document.querySelector("[data-mock-replay]")?.addEventListener("click", () => {
    audioEl.currentTime = 0;
    audioEl.play().catch(() => {});
  });
}

async function boot() {
  setStatus("Loading Listening mock bank…");
  beginBtn.disabled = true;
  try {
    state.pool = await window.ListeningLib.loadClassItems({ excludeIntro: true });
    if (state.pool.length < MOCK_SIZE) {
      throw new Error(`Need at least ${MOCK_SIZE} class items (found ${state.pool.length}).`);
    }
    setStatus(
      `Mock bank ready · ${state.pool.length} Part A items · ${MOCK_SIZE} Q / 20 min (Part A focus)`
    );
    beginBtn.disabled = false;
    bind();
    showPhase("start");
  } catch (error) {
    console.error(error);
    setStatus(`Could not load Listening bank. ${error.message}`, true);
  }
}

if (window.ToeflAccess?.guardPage) {
  window.ToeflAccess.guardPage({
    title: "Listening mock is protected",
    body: "Timed Listening mocks are for Teacher Israel Ventura's class groups. Enter the class code your teacher gave you.",
    secondaryHref: "dashboard.html",
    secondaryLabel: "Back to dashboard",
    onUnlocked: boot,
  });
} else {
  boot();
}
