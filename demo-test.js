/**
 * Short free demo test — entry snapshot
 * Structure (3) + Listening (3) + Reading (3) = 9 items
 * No class code. No timer. Dashboard is not the start.
 */

const CONFIG_URL = "data/demo-test.json";
const STORAGE_KEY = "toefl-itp-boost.demoSnapshot.v1";

const state = {
  rows: [],
  index: 0,
  answers: new Map(),
  ready: false,
  phase: "start", // start | exam | results
};

const statusEl = document.querySelector("[data-demo-status]");
const startPanel = document.querySelector("[data-demo-start]");
const examPanel = document.querySelector("[data-demo-exam]");
const resultsPanel = document.querySelector("[data-demo-results]");
const sectionEl = document.querySelector("[data-demo-section]");
const progressEl = document.querySelector("[data-demo-progress]");
const counterEl = document.querySelector("[data-demo-counter]");
const typeEl = document.querySelector("[data-demo-type]");
const metaEl = document.querySelector("[data-demo-meta]");
const questionEl = document.querySelector("[data-demo-question]");
const optionsEl = document.querySelector("[data-demo-options]");
const passageWrap = document.querySelector("[data-demo-passage-wrap]");
const passageTitleEl = document.querySelector("[data-demo-passage-title]");
const passageTextEl = document.querySelector("[data-demo-passage-text]");
const audioWrap = document.querySelector("[data-demo-audio-wrap]");
const audioEl = document.querySelector("[data-demo-audio]");
const beginBtn = document.querySelector("[data-demo-begin]");
const prevBtn = document.querySelector("[data-demo-prev]");
const nextBtn = document.querySelector("[data-demo-next]");
const retryBtn = document.querySelector("[data-demo-retry]");

function setStatus(message, isError = false) {
  if (!statusEl) return;
  statusEl.hidden = !message;
  statusEl.textContent = message || "";
  statusEl.classList.toggle("is-error", Boolean(isError));
}

function showPhase(phase) {
  state.phase = phase;
  startPanel.hidden = phase !== "start";
  examPanel.hidden = phase !== "exam";
  resultsPanel.hidden = phase !== "results";
  // Keep nav inert until the exam actually starts (avoids skipping Q1)
  if (prevBtn) prevBtn.disabled = phase !== "exam" || state.index === 0;
  if (nextBtn) nextBtn.disabled = phase !== "exam";
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

function normalizeStructure(raw, focusLabel) {
  const options = (raw.options || []).map((option) => {
    if (typeof option === "string") return { key: option, text: option };
    return {
      key: String(option.key ?? "").trim(),
      text: String(option.text ?? option.key ?? "").trim(),
    };
  });
  const correctKey = String(raw.correctKey ?? "").trim();
  const hit = options.find((o) => o.key === correctKey);
  return {
    uid: `structure:${raw.id}`,
    section: "structure",
    sectionLabel: "Structure",
    kind: "structure",
    focus: focusLabel || raw.skill || "Structure",
    prompt: raw.question || raw.stem || "",
    options,
    correctKey,
    correctAnswer: raw.correctAnswer || hit?.text || correctKey,
    explanation: raw.explanation || "",
    skill: raw.skill || "Structure",
    typeLabel: raw.type || "Structure",
  };
}

function normalizeListening(item, question) {
  return {
    uid: `listening:${item.id}:${question.id}`,
    section: "listening",
    sectionLabel: "Listening",
    kind: "listening",
    focus: item.topic || "Short conversation",
    prompt: question.prompt,
    options: question.options,
    correctKey: question.correctKey,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    skill: item.topic || "Listening",
    typeLabel: item.assetType || "Part A",
    audio: item.audio,
  };
}

function normalizeReading(passage, question) {
  const options = (question.options || []).map((option) => ({
    key: String(option.key ?? "").trim(),
    text: String(option.text ?? "").trim(),
  }));
  const correctKey = String(question.correctKey ?? "").trim();
  const hit = options.find((o) => o.key === correctKey);
  return {
    uid: `reading:${question.id}`,
    section: "reading",
    sectionLabel: "Reading",
    kind: "reading",
    focus: question.skill || question.questionType || "Reading",
    prompt: question.question || "",
    options,
    correctKey,
    correctAnswer: question.correctAnswer || hit?.text || correctKey,
    explanation: question.explanation || "",
    skill: question.skill || "Reading",
    typeLabel: question.questionType || "Reading",
    passageTitle: passage.title,
    passageText: passage.text,
  };
}

async function fetchJson(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Could not load ${url}`);
  return res.json();
}

async function buildDemoRows() {
  const config = await fetchJson(CONFIG_URL);
  const [structureBank, readingIntro, listeningItems] = await Promise.all([
    fetchJson("data/structure-intro.json"),
    fetchJson("data/reading-intro.json"),
    window.ListeningLib.loadIntroItems(),
  ]);

  const structureById = Object.fromEntries(
    (structureBank.items || []).map((item) => [item.id, item])
  );
  const structureRows = (config.structure_ids || []).map((id, index) => {
    const raw = structureById[id];
    if (!raw) throw new Error(`Missing structure item ${id}`);
    const focus = (config.structure_focus && config.structure_focus[index]) || raw.skill;
    return normalizeStructure(raw, focus);
  });

  const listenById = Object.fromEntries(listeningItems.map((item) => [item.id, item]));
  const listeningRows = [];
  for (const id of config.listening_ids || []) {
    const item = listenById[id];
    if (!item) throw new Error(`Missing listening item ${id}`);
    item.questions.forEach((q) => listeningRows.push(normalizeListening(item, q)));
  }

  const passage = readingIntro.passage || readingIntro;
  const qById = Object.fromEntries((passage.items || []).map((q) => [q.id, q]));
  const readingRows = (config.reading_question_ids || []).map((id) => {
    const q = qById[id];
    if (!q) throw new Error(`Missing reading question ${id}`);
    return normalizeReading(passage, q);
  });

  return [...structureRows, ...listeningRows, ...readingRows];
}

function beginDemo() {
  if (!state.ready || !state.rows.length) {
    setStatus("Demo items are still loading. Please wait a moment.", true);
    return;
  }
  state.index = 0;
  state.answers = new Map();
  showPhase("exam");
  setStatus(`Demo running · ${state.rows.length} items · free · no timer`);
  renderItem();
  examPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderItem() {
  if (state.phase !== "exam") return;
  const row = state.rows[state.index];
  if (!row) return;
  const selected = state.answers.get(row.uid);

  sectionEl.textContent = row.sectionLabel;
  progressEl.textContent = `${state.index + 1} / ${state.rows.length}`;
  counterEl.textContent = `${state.index + 1} / ${state.rows.length}`;
  typeEl.textContent = row.sectionLabel;
  metaEl.textContent = row.focus;
  questionEl.textContent = row.prompt;

  const layoutEl = document.querySelector("[data-demo-layout]");
  if (row.kind === "reading") {
    passageWrap.hidden = false;
    layoutEl?.classList.add("has-passage");
    passageTitleEl.textContent = row.passageTitle || "Passage";
    passageTextEl.innerHTML = paragraphs(row.passageText);
  } else {
    passageWrap.hidden = true;
    layoutEl?.classList.remove("has-passage");
  }

  const playBtn = document.querySelector("[data-demo-play]");
  if (row.kind === "listening" && row.audio) {
    audioWrap.hidden = false;
    if (audioEl.getAttribute("src") !== row.audio) {
      audioEl.pause();
      audioEl.src = row.audio;
      audioEl.load();
    }
    if (playBtn) {
      playBtn.textContent = "▶ Listen";
      playBtn.setAttribute("aria-label", "Play listening audio");
    }
  } else {
    audioWrap.hidden = true;
    audioEl.pause();
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
      renderItem();
    });
    optionsEl.appendChild(button);
  });

  prevBtn.disabled = state.index === 0;
  nextBtn.disabled = false;
  nextBtn.textContent =
    state.index === state.rows.length - 1 ? "See my snapshot" : "Next";
}

function scoreSection(section) {
  const rows = state.rows.filter((r) => r.section === section);
  let correct = 0;
  rows.forEach((row) => {
    if (state.answers.get(row.uid) === row.correctKey) correct += 1;
  });
  return { correct, total: rows.length, percent: rows.length ? Math.round((correct / rows.length) * 100) : 0 };
}

function finishDemo() {
  const unanswered = state.rows.filter((row) => !state.answers.has(row.uid)).length;
  if (unanswered > 0) {
    const ok = window.confirm(
      `You still have ${unanswered} unanswered item(s). See your snapshot anyway?`
    );
    if (!ok) return;
  }

  const structure = scoreSection("structure");
  const listening = scoreSection("listening");
  const reading = scoreSection("reading");
  const totalCorrect = structure.correct + listening.correct + reading.correct;
  const total = structure.total + listening.total + reading.total;
  const percent = total ? Math.round((totalCorrect / total) * 100) : 0;

  const snapshot = {
    at: new Date().toISOString(),
    structure,
    listening,
    reading,
    correct: totalCorrect,
    total,
    percent,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore */
  }

  document.querySelector("[data-demo-total]").textContent = `${totalCorrect}/${total}`;
  document.querySelector("[data-demo-total-note]").textContent = `${percent}% on this short demo`;
  document.querySelector("[data-demo-result-message]").textContent =
    percent >= 70
      ? "Solid start on this short sample. Next: dig into free strategies, then use your class code for full guided practice and mocks."
      : "Useful starting picture. Free strategies will help first; full course tools open with your teacher’s class code.";

  document.querySelector("[data-demo-section-scores]").innerHTML = `
    <article class="skill-result"><span>Structure</span><strong>${structure.correct}/${structure.total}</strong><small>${structure.percent}%</small></article>
    <article class="skill-result"><span>Listening</span><strong>${listening.correct}/${listening.total}</strong><small>${listening.percent}%</small></article>
    <article class="skill-result"><span>Reading</span><strong>${reading.correct}/${reading.total}</strong><small>${reading.percent}%</small></article>
  `;

  const weak = [
    { name: "Structure", ...structure, href: "structure.html" },
    { name: "Listening", ...listening, href: "listening.html" },
    { name: "Reading", ...reading, href: "reading.html" },
  ].sort((a, b) => a.percent - b.percent);

  const lowest = weak[0];
  document.querySelector("[data-demo-next-steps]").innerHTML = `
    <article class="mistake-review-item">
      <span>1 · Free practice</span>
      <h4>Start with free previews</h4>
      <p>Your lowest area on this short demo was <b>${lowest.name}</b> (${lowest.percent}%). Open free strategies and samples first.</p>
      <p><a class="button secondary compact-button" href="${lowest.href}">Open free ${lowest.name}</a></p>
    </article>
    <article class="mistake-review-item">
      <span>2 · Full course</span>
      <h4>Enter your teacher’s class code</h4>
      <p>Guided drills, section mocks, and the full ITP-style mock open with class access — not from the public home page dashboard.</p>
      <p><a class="button secondary compact-button" href="dashboard.html#class-access">Enter class code</a></p>
    </article>
    <article class="mistake-review-item">
      <span>3 · After access</span>
      <h4>Then use your dashboard</h4>
      <p>Once your class code is active on this device, the dashboard becomes your training home for guided practice and mocks.</p>
    </article>
  `;

  setStatus(`Demo snapshot saved on this device · ${totalCorrect}/${total} (${percent}%)`);
  showPhase("results");
  resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function bindControls() {
  beginBtn.addEventListener("click", beginDemo);
  retryBtn.addEventListener("click", () => {
    state.index = 0;
    state.answers = new Map();
    showPhase("start");
    setStatus("Demo ready whenever you want another snapshot.");
  });
  prevBtn.addEventListener("click", () => {
    if (state.phase !== "exam") return;
    if (state.index > 0) {
      state.index -= 1;
      renderItem();
    }
  });
  nextBtn.addEventListener("click", () => {
    if (state.phase !== "exam") return;
    if (state.index < state.rows.length - 1) {
      state.index += 1;
      renderItem();
      return;
    }
    finishDemo();
  });
  const playBtn = document.querySelector("[data-demo-play]");
  playBtn?.addEventListener("click", () => {
    if (!audioEl.src && !audioEl.currentSrc) return;
    if (audioEl.paused) {
      audioEl.play().catch(() => {});
      playBtn.textContent = "❚❚ Pause";
    } else {
      audioEl.pause();
      playBtn.textContent = "▶ Listen";
    }
  });
  audioEl?.addEventListener("ended", () => {
    if (playBtn) playBtn.textContent = "▶ Listen again";
  });
  audioEl?.addEventListener("pause", () => {
    if (playBtn && !audioEl.ended) playBtn.textContent = "▶ Listen";
  });
  audioEl?.addEventListener("play", () => {
    if (playBtn) playBtn.textContent = "❚❚ Pause";
  });
}

async function init() {
  setStatus("Loading free demo items…");
  beginBtn.disabled = true;
  try {
    state.rows = await buildDemoRows();
    state.ready = true;
    beginBtn.disabled = false;
    bindControls();
    showPhase("start");
    setStatus(
      `Demo ready · ${state.rows.length} items (3 Structure · 3 Listening · 3 Reading) · free · no timer`
    );
  } catch (error) {
    console.error(error);
    setStatus(`Could not load the demo test. ${error.message}`, true);
  }
}

init();
