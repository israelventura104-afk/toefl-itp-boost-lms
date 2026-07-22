/**
 * Structure guided practice — Phase 3
 * Loads 190-item bank from data/structure-bank.json (never the 10 free intro items).
 * 15 questions, no timer, balanced by skill, session saved to localStorage.
 */

const BANK_URL = "data/structure-bank.json";
const INTRO_URL = "data/structure-intro.json";
const PRACTICE_SIZE = 15;

const guidedState = {
  index: 0,
  answers: new Map(),
  questions: [],
  bank: [],
  sessionNumber: 1,
  ready: false,
  savedForSession: false,
};

const questionEl = document.querySelector("[data-question]");
const metaEl = document.querySelector("[data-question-meta]");
const optionsEl = document.querySelector("[data-options]");
const feedbackEl = document.querySelector("[data-feedback]");
const counterEl = document.querySelector("[data-counter]");
const prevBtn = document.querySelector("[data-prev]");
const nextBtn = document.querySelector("[data-next]");
const scoreEl = document.querySelector("[data-score]");
const progressBarEl = document.querySelector("[data-progress-bar]");
const resultsEl = document.querySelector("[data-results]");
const finalScoreEl = document.querySelector("[data-final-score]");
const finalNoteEl = document.querySelector("[data-final-note]");
const resultMessageEl = document.querySelector("[data-result-message]");
const studyFocusEl = document.querySelector("[data-study-focus]");
const mistakesEl = document.querySelector("[data-mistakes]");
const sessionLabelEl = document.querySelector("[data-session-label]");
const newPracticeBtn = document.querySelector("[data-new-practice]");
const newPracticeResultBtn = document.querySelector("[data-new-practice-result]");
const statusEl = document.querySelector("[data-guided-status]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function normalizeSkill(skill) {
  if (window.ToeflProgress && typeof window.ToeflProgress.normalizeSkill === "function") {
    return window.ToeflProgress.normalizeSkill(skill);
  }
  return skill || "Other";
}

function formatCommonMistake(value, correctKey) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const entries = Object.entries(value).filter(([key]) => key !== correctKey);
    if (!entries.length) return "";
    return entries[0][1];
  }
  return "";
}

function normalizeItem(raw) {
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
  const correctFromOptions = options.find((option) => option.key === correctKey);
  const type =
    raw.type === "structure_completion"
      ? "Sentence Completion"
      : raw.type === "written_expression"
        ? "Error Identification"
        : raw.type || "Sentence Completion";

  return {
    id: String(raw.id ?? "").trim(),
    type,
    skill: raw.skill || "Structure",
    subskill: raw.subskill || "",
    question: raw.question || raw.stem || "",
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || correctFromOptions?.text || correctKey,
    explanation: raw.explanation || "",
    commonMistake: formatCommonMistake(
      raw.commonMistake || raw.distractor_rationale,
      correctKey
    ),
  };
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function groupBySkill(items) {
  const groups = new Map();
  items.forEach((item) => {
    const key = normalizeSkill(item.skill);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  });
  return groups;
}

function buildBalancedPractice(bank, size) {
  const groups = groupBySkill(shuffle([...bank]));
  const shuffledGroups = shuffle([...groups.values()]);
  const selected = [];

  while (selected.length < size && shuffledGroups.some((group) => group.length)) {
    shuffledGroups.forEach((group) => {
      if (selected.length < size && group.length) selected.push(group.shift());
    });
  }

  return shuffle(selected);
}

async function loadBank() {
  const [bankRes, introRes] = await Promise.all([
    fetch(BANK_URL, { cache: "no-cache" }),
    fetch(INTRO_URL, { cache: "no-cache" }),
  ]);

  if (!bankRes.ok) {
    throw new Error(`Could not load ${BANK_URL} (${bankRes.status}).`);
  }

  const bankData = await bankRes.json();
  const rawItems = Array.isArray(bankData) ? bankData : bankData.items;
  if (!rawItems || !rawItems.length) {
    throw new Error("Structure bank is empty.");
  }

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

  if (items.length < PRACTICE_SIZE) {
    throw new Error(
      `Practice bank too small after excluding free intro items (${items.length}).`
    );
  }

  return items;
}

function startPractice() {
  if (!guidedState.bank.length) return;

  guidedState.index = 0;
  guidedState.answers = new Map();
  guidedState.savedForSession = false;
  guidedState.questions = buildBalancedPractice(guidedState.bank, PRACTICE_SIZE);
  sessionLabelEl.textContent = `Random set ${guidedState.sessionNumber} · ${guidedState.questions.length} of ${guidedState.bank.length} bank items · no timer`;
  resultsEl.hidden = true;
  if (studyFocusEl) studyFocusEl.innerHTML = "";
  if (mistakesEl) mistakesEl.innerHTML = "";
  renderQuestion();
}

function renderQuestion() {
  const item = guidedState.questions[guidedState.index];
  if (!item) return;

  const answer = guidedState.answers.get(item.id);
  const answeredCount = guidedState.answers.size;

  counterEl.textContent = `${guidedState.index + 1} / ${guidedState.questions.length}`;
  metaEl.textContent = item.subskill
    ? `${normalizeSkill(item.skill)} · ${item.subskill}`
    : normalizeSkill(item.skill);
  if (window.StructureLib) {
    StructureLib.setStructureQuestion(questionEl, item.question, item.type);
  } else {
    questionEl.textContent = item.question;
  }
  progressBarEl.style.width = `${Math.round(
    (answeredCount / guidedState.questions.length) * 100
  )}%`;

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
  prevBtn.disabled = guidedState.index === 0;
  nextBtn.textContent =
    guidedState.index === guidedState.questions.length - 1 ? "View results" : "Next";
  updateScore();
}

function chooseAnswer(item, option) {
  const correct = option.key === item.correctKey;
  guidedState.answers.set(item.id, { selectedKey: option.key, correct });
  renderQuestion();
  if (guidedState.answers.size === guidedState.questions.length) {
    // auto-prepare results data; user still clicks View results / Next on last
  }
}

function renderFeedback(item) {
  const answer = guidedState.answers.get(item.id);
  if (!answer) {
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = "";
    return;
  }

  feedbackEl.hidden = false;
  feedbackEl.className = `practice-feedback ${
    answer.correct ? "is-correct" : "is-incorrect"
  }`;

  const trap =
    !answer.correct && item.commonMistake
      ? `<p class="feedback-trap"><small>Common trap: ${item.commonMistake}</small></p>`
      : "";

  feedbackEl.innerHTML = `
    <strong>${answer.correct ? "Correct" : "Incorrect"}</strong>
    <p>The correct answer is <b>${item.correctKey}. ${item.correctAnswer}</b></p>
    <p>${item.explanation}</p>
    ${trap}
  `;
}

function updateScore() {
  const answered = [...guidedState.answers.values()];
  const correct = answered.filter((entry) => entry.correct).length;
  scoreEl.textContent = `${correct}/${answered.length || 0} correct`;
}

function persistSession(answered) {
  if (guidedState.savedForSession) return;
  if (!window.ToeflProgress || typeof window.ToeflProgress.recordStructureSession !== "function") {
    console.warn("[TOEFL] ToeflProgress missing — Structure session not saved.");
    setStatus("Results shown, but progress could not be saved on this device.", true);
    return;
  }

  const correctCount = answered.filter((entry) => entry.answer?.correct).length;
  const payload = {
    mode: "guided",
    correct: correctCount,
    total: guidedState.questions.length,
    questionIds: guidedState.questions.map((item) => item.id),
    items: answered.map(({ item, answer }) => ({
      questionId: item.id,
      skill: item.skill || item.subskill || "Structure",
      subskill: item.subskill || "",
      correct: Boolean(answer?.correct),
      prompt: item.question,
    })),
  };

  try {
    const record = window.ToeflProgress.recordStructureSession(payload);
    guidedState.savedForSession = true;
    const skillCount = record?.skills ? Object.keys(record.skills).length : 0;
    console.info("[TOEFL] Structure session saved", record);
    if (!skillCount) {
      console.warn("[TOEFL] Session saved but skill map is empty.", record);
      setStatus(
        `Score ${correctCount}/${payload.total} saved, but skills were empty. Open Dashboard after a hard refresh.`,
        true
      );
    } else {
      setStatus(
        `Saved to this device · ${correctCount}/${payload.total} · ${skillCount} skill${skillCount === 1 ? "" : "s"}. Open Dashboard to see progress.`
      );
    }
  } catch (error) {
    console.error("[TOEFL] Failed to save Structure session.", error);
    setStatus("Could not save progress on this device (storage blocked or full).", true);
  }
}

function renderResults() {
  const answered = guidedState.questions.map((item) => ({
    item,
    answer: guidedState.answers.get(item.id),
  }));

  const unanswered = answered.filter((entry) => !entry.answer).length;
  if (unanswered > 0) {
    setStatus(`Answer all ${guidedState.questions.length} questions before viewing results. (${unanswered} left)`);
    return;
  }

  setStatus("");
  persistSession(answered);

  const correctCount = answered.filter((entry) => entry.answer?.correct).length;
  const misses = answered.filter((entry) => entry.answer && !entry.answer.correct);

  const studyRows = answered.map(({ item, answer }) => ({
    skill: normalizeSkill(item.skill),
    correct: Boolean(answer?.correct),
  }));

  const mistakeCards = misses.map(({ item, answer }) => ({
    tag: [normalizeSkill(item.skill), item.subskill || item.type].filter(Boolean).join(" · "),
    stemHtml: window.StructureLib
      ? StructureLib.formatStructureQuestionHtml(item.question, item.type)
      : ResultsLib.escapeHtml(item.question),
    yours: answer.selectedKey,
    correct: `${item.correctKey}. ${item.correctAnswer}`,
    explanation: item.explanation,
    trap: item.commonMistake,
  }));

  if (window.ResultsLib) {
    ResultsLib.paint({
      scoreEl: finalScoreEl,
      noteEl: finalNoteEl,
      messageEl: resultMessageEl,
      studyEl: studyFocusEl,
      mistakesEl,
      correct: correctCount,
      total: guidedState.questions.length,
      studyRows,
      mistakes: mistakeCards,
    });
  }

  resultsEl.hidden = false;
  resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleNewPractice() {
  guidedState.sessionNumber += 1;
  startPractice();
  document
    .querySelector(".guided-practice-panel")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindControls() {
  prevBtn.addEventListener("click", () => {
    if (guidedState.index > 0) {
      guidedState.index -= 1;
      renderQuestion();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (guidedState.index < guidedState.questions.length - 1) {
      guidedState.index += 1;
      renderQuestion();
      return;
    }
    renderResults();
  });

  newPracticeBtn.addEventListener("click", handleNewPractice);
  newPracticeResultBtn.addEventListener("click", handleNewPractice);
}

async function bootGuidedPractice() {
  setStatus("Loading Structure practice bank…");
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  try {
    guidedState.bank = await loadBank();
    guidedState.ready = true;
    setStatus(
      `Class bank ready · ${guidedState.bank.length} items · sets of ${PRACTICE_SIZE} · free intro items excluded · no timer`
    );
    bindControls();
    startPractice();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  } catch (error) {
    console.error(error);
    guidedState.ready = false;
    setStatus(
      `Could not load the practice bank. Use GitHub Pages or a local server. ${error.message}`,
      true
    );
    questionEl.textContent = "Practice unavailable until the bank loads.";
  }
}

if (window.ToeflAccess && typeof window.ToeflAccess.guardPage === "function") {
  window.ToeflAccess.guardPage({
    title: "Structure guided practice is protected",
    body: "This drill uses the full Structure bank for Teacher Israel Ventura's classes. Enter the class code your teacher gave you. Free preview strategies and the 10 fixed sample questions stay open on the Structure page without a code.",
    secondaryHref: "structure.html",
    secondaryLabel: "Back to free Structure preview",
    onUnlocked: bootGuidedPractice,
  });
} else {
  bootGuidedPractice();
}
