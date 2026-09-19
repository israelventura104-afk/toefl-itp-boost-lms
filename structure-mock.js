/**
 * Structure mock exam — Phase 4
 * TOEFL ITP-style Structure section: 40 questions, 25 minutes, feedback only at end.
 * Bank: data/structure-bank.json (excludes free intro set).
 */

const BANK_URL = "data/structure-bank.json";
const INTRO_URL = "data/structure-intro.json";
const MOCK_SIZE = 40;
const MOCK_SECONDS = 25 * 60;
const TARGET_COMPLETION = 15;
const TARGET_ERROR = 25;

const state = {
  bank: [],
  questions: [],
  index: 0,
  answers: new Map(),
  secondsLeft: MOCK_SECONDS,
  timerId: null,
  phase: "start", // start | exam | results
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
const prevBtn = document.querySelector("[data-mock-prev]");
const nextBtn = document.querySelector("[data-mock-next]");
const submitBtn = document.querySelector("[data-mock-submit]");
const beginBtn = document.querySelector("[data-mock-begin]");
const retryBtn = document.querySelector("[data-mock-retry]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function normalizeSkill(skill) {
  if (window.ToeflProgress?.normalizeSkill) {
    return window.ToeflProgress.normalizeSkill(skill);
  }
  return skill || "Other";
}

function formatCommonMistake(value, correctKey) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const ck = String(correctKey ?? "").trim().toUpperCase();
    const entries = Object.entries(value).filter(
      ([key]) => String(key).trim().toUpperCase() !== ck
    );
    return entries[0] ? String(entries[0][1]) : "";
  }
  return "";
}

function normalizeItem(raw) {
  let options = Array.isArray(raw.options)
    ? raw.options.map((option) => {
        if (typeof option === "string") return { key: option, text: option };
        return {
          key: String(option.key ?? "").trim(),
          text: String(option.text ?? option.key ?? "").trim(),
        };
      })
    : [];

  const rawType = raw.type || "Sentence Completion";
  const type =
    rawType === "structure_completion"
      ? "Sentence Completion"
      : rawType === "written_expression"
        ? "Error Identification"
        : rawType;
  const question = raw.question || raw.stem || "";
  options = options.map((option) => ({
    key: String(option.key ?? "").trim().toUpperCase(),
    text: String(option.text ?? option.key ?? "").trim(),
  }));
  if (window.StructureLib?.alignErrorOptions) {
    options = StructureLib.alignErrorOptions(question, options, type).map((option) => ({
      key: String(option.key ?? "").trim().toUpperCase(),
      text: String(option.text ?? option.key ?? "").trim(),
    }));
  }
  const correctKey = String(raw.correctKey ?? raw.correct_answer ?? "")
    .trim()
    .toUpperCase();
  const correctFromOptions = options.find((option) => option.key === correctKey);

  return {
    id: String(raw.id ?? "").trim(),
    type,
    skill: raw.skill || "Structure",
    subskill: raw.subskill || "",
    question,
    options,
    correctKey,
    correctAnswer: correctFromOptions?.text || raw.correctAnswer || correctKey,
    explanation: raw.explanation || "",
    commonMistake: formatCommonMistake(
      raw.commonMistake || raw.distractor_rationale,
      correctKey
    ),
  };
}

function isErrorType(item) {
  const t = String(item.type || "").toLowerCase();
  return t.includes("error") || t.includes("written");
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function takeKeyDiverse(pool, count, keyCounts) {
  const available = [...pool];
  const picked = [];
  while (picked.length < count && available.length) {
    available.sort((a, b) => {
      const ka = String(a.correctKey || "").toUpperCase();
      const kb = String(b.correctKey || "").toUpperCase();
      return (keyCounts[ka] || 0) - (keyCounts[kb] || 0) || Math.random() - 0.5;
    });
    const item = available.shift();
    picked.push(item);
    const k = String(item.correctKey || "").toUpperCase();
    if (keyCounts[k] !== undefined) keyCounts[k] += 1;
  }
  return picked;
}

function buildMockSet(bank, size) {
  const completion = shuffle(bank.filter((item) => !isErrorType(item)));
  const errorItems = shuffle(bank.filter((item) => isErrorType(item)));
  const keyCounts = { A: 0, B: 0, C: 0, D: 0 };

  const takeCompletion = Math.min(TARGET_COMPLETION, completion.length, size);
  const chosen = takeKeyDiverse(completion, takeCompletion, keyCounts);

  const takeError = Math.min(TARGET_ERROR, errorItems.length, size - chosen.length);
  chosen.push(...takeKeyDiverse(errorItems, takeError, keyCounts));

  if (chosen.length < size) {
    const used = new Set(chosen.map((item) => item.id));
    const rest = shuffle(bank.filter((item) => !used.has(item.id)));
    chosen.push(...takeKeyDiverse(rest, size - chosen.length, keyCounts));
  }

  return shuffle(chosen).slice(0, size);
}

async function loadBank() {
  const [bankRes, introRes] = await Promise.all([
    fetch(BANK_URL, { cache: "no-cache" }),
    fetch(INTRO_URL, { cache: "no-cache" }),
  ]);

  if (!bankRes.ok) throw new Error(`Could not load ${BANK_URL} (${bankRes.status}).`);

  const bankData = await bankRes.json();
  const rawItems = Array.isArray(bankData) ? bankData : bankData.items;
  if (!rawItems?.length) throw new Error("Structure bank is empty.");

  let introIds = new Set();
  if (introRes.ok) {
    try {
      const introData = await introRes.json();
      const introItems = Array.isArray(introData) ? introData : introData.items || [];
      introIds = new Set(introItems.map((item) => item.id));
    } catch {
      introIds = new Set();
    }
  }

  const items = rawItems
    .map(normalizeItem)
    .filter((item) => item.id && item.question && item.options.length && item.correctKey)
    .filter((item) => !introIds.has(item.id));

  if (items.length < MOCK_SIZE) {
    throw new Error(`Bank too small for a 40-item mock (${items.length}).`);
  }

  return items;
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

function showPhase(phase) {
  state.phase = phase;
  startPanel.hidden = phase !== "start";
  examPanel.hidden = phase !== "exam";
  resultsPanel.hidden = phase !== "results";
}

function updateAnsweredCount() {
  answeredEl.textContent = `${state.answers.size} / ${state.questions.length} answered`;
}

function renderNav() {
  navEl.innerHTML = state.questions
    .map((item, index) => {
      const answered = state.answers.has(item.id);
      const current = index === state.index;
      return `<button type="button" class="mock-nav-btn${answered ? " is-answered" : ""}${
        current ? " is-current" : ""
      }" data-mock-goto="${index}">${index + 1}</button>`;
    })
    .join("");

  navEl.querySelectorAll("[data-mock-goto]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.index = Number(btn.getAttribute("data-mock-goto"));
      renderQuestion();
    });
  });
}

function renderQuestion() {
  const item = state.questions[state.index];
  if (!item) return;

  const selected = state.answers.get(item.id);
  counterEl.textContent = `${state.index + 1} / ${state.questions.length}`;
  typeEl.textContent =
    item.type === "Error Identification" ? "Error identification" : "Sentence completion";
  metaEl.textContent = item.subskill
    ? `${normalizeSkill(item.skill)} · ${item.subskill}`
    : normalizeSkill(item.skill);
  if (window.StructureLib) {
    StructureLib.setStructureQuestion(questionEl, item.question, item.type);
  } else {
    questionEl.textContent = item.question;
  }

  optionsEl.innerHTML = "";
  item.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${selected === option.key ? " is-selected" : ""}`;
    const label = window.StructureLib ? StructureLib.escapeHtml(option.text) : option.text;
    button.innerHTML = `<b>${option.key}</b><span>${label}</span>`;
    button.addEventListener("click", () => {
      state.answers.set(item.id, String(option.key ?? "").trim().toUpperCase());
      updateAnsweredCount();
      renderQuestion();
    });
    optionsEl.appendChild(button);
  });

  prevBtn.disabled = state.index === 0;
  nextBtn.textContent =
    state.index === state.questions.length - 1 ? "Last item" : "Next";
  updateAnsweredCount();
  renderNav();
}

function beginExam() {
  if (!state.bank.length) return;
  state.questions = buildMockSet(state.bank, MOCK_SIZE);
  state.index = 0;
  state.answers = new Map();
  state.submitted = false;
  setStatus(
    `Mock running · ${state.questions.length} questions · bank ${state.bank.length} · feedback locked until submit`
  );
  showPhase("exam");
  startTimer();
  renderQuestion();
  examPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function finishExam({ auto = false } = {}) {
  if (state.submitted) return;
  state.submitted = true;
  stopTimer();

  if (!auto && state.answers.size < state.questions.length) {
    const left = state.questions.length - state.answers.size;
    const ok = window.confirm(
      `You still have ${left} unanswered question(s). Submit the mock anyway?`
    );
    if (!ok) {
      state.submitted = false;
      if (state.secondsLeft > 0) {
        // resume timer
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
      return;
    }
  }

  const answered = state.questions.map((item) => {
    const rawSelected = state.answers.get(item.id);
    const blank = rawSelected == null || rawSelected === "";
    const selectedKey = blank ? null : String(rawSelected).trim().toUpperCase();
    const correct =
      !blank &&
      selectedKey === String(item.correctKey ?? "").trim().toUpperCase();
    return { item, selectedKey, correct, blank };
  });

  const correctCount = answered.filter((row) => row.correct).length;
  const percent = Math.round((correctCount / state.questions.length) * 100);
  const usedSeconds = MOCK_SECONDS - Math.max(0, state.secondsLeft);

  if (window.ToeflProgress?.recordStructureSession) {
    window.ToeflProgress.recordStructureSession({
      mode: "mock",
      correct: correctCount,
      total: state.questions.length,
      questionIds: state.questions.map((item) => item.id),
      durationSeconds: usedSeconds,
      timedOut: auto,
      items: answered.map(({ item, correct }) => ({
        questionId: item.id,
        skill: item.skill,
        subskill: item.subskill,
        correct,
        prompt: item.question,
      })),
    });
  }

  const studyRows = answered.map(({ item, correct }) => ({
    skill: normalizeSkill(item.skill),
    correct,
  }));
  const mistakeCards = answered
    .filter((row) => !row.correct)
    .map(({ item, selectedKey, blank }) => ({
      tag: [normalizeSkill(item.skill), item.subskill || item.type].filter(Boolean).join(" · "),
      stemHtml: window.StructureLib
        ? StructureLib.formatStructureQuestionHtml(item.question, item.type)
        : ResultsLib.escapeHtml(item.question),
      yours: blank ? "no answer" : selectedKey,
      correct: `${item.correctKey}. ${item.correctAnswer}`,
      explanation: item.explanation,
      trap: item.commonMistake,
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
      total: state.questions.length,
      message: auto ? "Time is up — answers submitted automatically." : "",
      meta: `Time used: ${formatTime(usedSeconds)} of 25:00 · Answered ${state.answers.size}/${state.questions.length}`,
      studyRows,
      mistakes: mistakeCards,
    });
  }

  setStatus(`Mock saved on this device · ${correctCount}/${state.questions.length} (${percent}%)`);
  showPhase("results");
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindControls() {
  beginBtn.addEventListener("click", beginExam);
  retryBtn.addEventListener("click", () => {
    showPhase("start");
    setStatus("Ready for another Structure mock when you are.");
    startPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  prevBtn.addEventListener("click", () => {
    if (state.index > 0) {
      state.index -= 1;
      renderQuestion();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
    }
  });

  submitBtn.addEventListener("click", () => finishExam({ auto: false }));
}

async function bootMock() {
  setStatus("Loading Structure mock bank…");
  beginBtn.disabled = true;

  try {
    state.bank = await loadBank();
    const errorCount = state.bank.filter(isErrorType).length;
    const completionCount = state.bank.length - errorCount;
    setStatus(
      `Mock bank ready · ${state.bank.length} items (${completionCount} completion-style · ${errorCount} error-style) · 40Q / 25 min`
    );
    beginBtn.disabled = false;
    bindControls();
    showPhase("start");
  } catch (error) {
    console.error(error);
    setStatus(`Could not load the mock bank. ${error.message}`, true);
    beginBtn.disabled = true;
  }
}

if (window.ToeflAccess?.guardPage) {
  window.ToeflAccess.guardPage({
    title: "Structure mock is protected",
    body: "Timed Structure mocks are for Teacher Israel Ventura's class groups. Enter the class code your teacher gave you.",
    secondaryHref: "dashboard.html",
    secondaryLabel: "Back to dashboard",
    onUnlocked: bootMock,
  });
} else {
  bootMock();
}
