(() => {
  const teachHtml = "\n<div class=\"prose\">\n  <p><strong>Goal today:</strong> ignore the prepositional phrase between the subject and the verb. Agree with the <em>true subject</em> only.</p>\n  <h3>How to decide</h3>\n  <div class=\"slot-grid\">\n    <article><strong>1. Circle the subject</strong><span>Who or what is doing the action?</span></article>\n    <article><strong>2. Cross out the PP</strong><span>Skip <em>of\u2026</em>, <em>in\u2026</em>, <em>with\u2026</em>, <em>along with\u2026</em>, <em>as well as\u2026</em>.</span></article>\n    <article><strong>3. Match the verb</strong><span>Singular subject \u2192 singular verb. Plural subject \u2192 plural verb.</span></article>\n    <article><strong>4. Do not add extras</strong><span>Words after <em>as well as / along with</em> are not part of the subject.</span></article>\n  </div>\n\n  <h3>High-yield patterns (with examples)</h3>\n  <ul>\n    <li><strong>of / in / with + noun</strong> \u2192 ignore the noun inside the phrase.<br>\n      \u2713 <em>The results of the experiment <strong>indicate</strong> a problem.</em><br>\n      \u2717 <em>The results of the experiment indicates a problem.</em></li>\n    <li><strong>Singular head + plural PP</strong> \u2192 still singular.<br>\n      \u2713 <em>The quality of the products <strong>is</strong> excellent.</em><br>\n      \u2717 <em>The quality of the products are excellent.</em></li>\n    <li><strong>as well as</strong> \u2192 does not make the subject plural.<br>\n      \u2713 <em>The chair, as well as the lecturers, <strong>has</strong> submitted the report.</em><br>\n      \u2717 <em>The chair, as well as the lecturers, have submitted the report.</em></li>\n    <li><strong>along with / together with / in addition to</strong> \u2192 same rule.<br>\n      \u2713 <em>The researcher, along with her students, <strong>analyzes</strong> the samples.</em><br>\n      \u2717 <em>The researcher, along with her students, analyze the samples.</em></li>\n    <li><strong>with + assistants / equipment</strong> \u2192 still ignore it.<br>\n      \u2713 <em>The director, with two assistants, <strong>reviews</strong> every file.</em><br>\n      \u2717 <em>The director, with two assistants, review every file.</em></li>\n  </ul>\n\n  <div class=\"callout\">\n    <strong>Remember</strong>\n    <p>If a noun sits inside a prepositional phrase, it is almost never the subject. Cross it out first, then choose the verb.</p>\n  </div>\n</div>\n";
  const demos = [{"title": "Demo 1 · of + singular noun", "stem": "The results of the laboratory experiment ____ that the compound was unstable at high temperatures.", "options": [{"key": "A", "text": "was indicated"}, {"key": "B", "text": "indicates"}, {"key": "C", "text": "indicating"}, {"key": "D", "text": "indicate"}], "correctKey": "D", "slot": "Intervening of-phrase", "teach": "Subject = results (plural). Cross out of the laboratory experiment. Common trap: agreeing with experiment."}, {"title": "Demo 2 · Singular head + plural of-phrase", "stem": "The quality of the imported materials ____ carefully checked before production begins.", "options": [{"key": "A", "text": "are"}, {"key": "B", "text": "have been"}, {"key": "C", "text": "is"}, {"key": "D", "text": "were"}], "correctKey": "C", "slot": "Singular head noun", "teach": "Subject = quality (singular). Cross out of the imported materials. Common trap: agreeing with materials."}, {"title": "Demo 3 · as well as", "stem": "The department chair, as well as the senior lecturers, ____ submitted the annual report to the dean this week.", "options": [{"key": "A", "text": "have"}, {"key": "B", "text": "has"}, {"key": "C", "text": "are"}, {"key": "D", "text": "were"}], "correctKey": "B", "slot": "as well as", "teach": "as well as does not join subjects. True subject = the department chair (singular) → has. Common trap: adding lecturers to the subject."}, {"title": "Demo 4 · along with", "stem": "The lead researcher, along with her graduate students, ____ the samples every morning.", "options": [{"key": "A", "text": "analyze"}, {"key": "B", "text": "analyzes"}, {"key": "C", "text": "are analyzing"}, {"key": "D", "text": "have analyzed"}], "correctKey": "B", "slot": "along with", "teach": "along with is a prepositional interrupter. Subject = The lead researcher → analyzes. Common trap: treating graduate students as part of the subject."}, {"title": "Demo 5 · Error ID · with-phrase", "stem": "The museum director, with several curators, (A) have approved (B) the new exhibition plan (C) for next spring (D).", "options": [{"key": "A", "text": "The museum director, with several curators,"}, {"key": "B", "text": "have approved"}, {"key": "C", "text": "the new exhibition plan"}, {"key": "D", "text": "for next spring"}], "correctKey": "B", "slot": "Error ID · with", "teach": "The underlined verb phrase \"have approved\" is incorrect. with several curators does not change the subject. Use has approved. Common trap: agreeing with curators."}];
  const practice = [{"id": "Q01", "stem": "The findings of the recent survey ____ that remote work increased productivity for many teams.", "options": [{"key": "A", "text": "show"}, {"key": "B", "text": "shows"}, {"key": "C", "text": "has shown"}, {"key": "D", "text": "showing"}], "correctKey": "A", "slot": "of-phrase (plural head)", "explain": "Subject = findings (plural). Cross out of the recent survey. Show is required."}, {"id": "Q02", "stem": "The success of the training programs ____ largely on teacher preparation.", "options": [{"key": "A", "text": "depend"}, {"key": "B", "text": "depends"}, {"key": "C", "text": "are depending"}, {"key": "D", "text": "have depended"}], "correctKey": "B", "slot": "of-phrase (singular head)", "explain": "Subject = success (singular). Cross out of the training programs."}, {"id": "Q03", "stem": "The dean, as well as the committee members, ____ the proposal before Friday.", "options": [{"key": "A", "text": "review"}, {"key": "B", "text": "are reviewing"}, {"key": "C", "text": "reviews"}, {"key": "D", "text": "have reviewed"}], "correctKey": "C", "slot": "as well as", "explain": "as well as does not make the subject plural. Subject = The dean → reviews."}, {"id": "Q04", "stem": "The archivist, together with two assistants, ____ the manuscripts each afternoon.", "options": [{"key": "A", "text": "catalog"}, {"key": "B", "text": "are cataloging"}, {"key": "C", "text": "have cataloged"}, {"key": "D", "text": "catalogs"}], "correctKey": "D", "slot": "together with", "explain": "together with is an interrupter. Subject = The archivist → catalogs."}, {"id": "Q05", "stem": "The causes of the sudden decline in bee populations ____ still unclear.", "options": [{"key": "A", "text": "are"}, {"key": "B", "text": "is"}, {"key": "C", "text": "has been"}, {"key": "D", "text": "was"}], "correctKey": "A", "slot": "of-phrase (plural head)", "explain": "Subject = causes (plural). Cross out of the sudden decline…"}, {"id": "Q06", "stem": "The director of the research centers ____ responsible for the final budget.", "options": [{"key": "A", "text": "are"}, {"key": "B", "text": "is"}, {"key": "C", "text": "were"}, {"key": "D", "text": "have been"}], "correctKey": "B", "slot": "of-phrase (singular head)", "explain": "Subject = director (singular), not centers."}, {"id": "Q07", "stem": "The engineer, in addition to the technicians, ____ the safety checklist.", "options": [{"key": "A", "text": "complete"}, {"key": "B", "text": "are completing"}, {"key": "C", "text": "completes"}, {"key": "D", "text": "have completed"}], "correctKey": "C", "slot": "in addition to", "explain": "in addition to does not join subjects. Subject = The engineer → completes."}, {"id": "Q08", "stem": "The pages of the ancient manuscript ____ damaged by humidity.", "options": [{"key": "A", "text": "was"}, {"key": "B", "text": "has been"}, {"key": "C", "text": "is"}, {"key": "D", "text": "were"}], "correctKey": "D", "slot": "of-phrase (plural head)", "explain": "Subject = pages (plural). Cross out of the ancient manuscript."}, {"id": "Q09", "stem": "The professor, with three graduate students, (A) were preparing (B) the lab equipment (C) before class (D).", "options": [{"key": "A", "text": "were preparing"}, {"key": "B", "text": "The professor, with three graduate students,"}, {"key": "C", "text": "the lab equipment"}, {"key": "D", "text": "before class"}], "correctKey": "A", "slot": "Error ID · with", "explain": "were preparing is incorrect. with three graduate students is a PP interrupter. Use was preparing."}, {"id": "Q10", "stem": "The design of the new bridges ____ attention to seismic safety.", "options": [{"key": "A", "text": "require"}, {"key": "B", "text": "requires"}, {"key": "C", "text": "are requiring"}, {"key": "D", "text": "have required"}], "correctKey": "B", "slot": "of-phrase (singular head)", "explain": "Subject = design (singular), not bridges."}, {"id": "Q11", "stem": "The committee chair, as well as the voting members, (A) have signed (B) the final resolution (C) this morning (D).", "options": [{"key": "A", "text": "The committee chair, as well as the voting members,"}, {"key": "B", "text": "the final resolution"}, {"key": "C", "text": "have signed"}, {"key": "D", "text": "this morning"}], "correctKey": "C", "slot": "Error ID · as well as", "explain": "have signed is incorrect. as well as does not pluralize the subject. Use has signed."}, {"id": "Q12", "stem": "The effects of prolonged drought ____ visible across the region.", "options": [{"key": "A", "text": "is"}, {"key": "B", "text": "was"}, {"key": "C", "text": "has been"}, {"key": "D", "text": "are"}], "correctKey": "D", "slot": "of-phrase (plural head)", "explain": "Subject = effects (plural)."}, {"id": "Q13", "stem": "The curator, along with the conservation team, ____ the exhibit for opening day.", "options": [{"key": "A", "text": "prepares"}, {"key": "B", "text": "prepare"}, {"key": "C", "text": "are preparing"}, {"key": "D", "text": "have prepared"}], "correctKey": "A", "slot": "along with", "explain": "Subject = The curator (singular) → prepares."}, {"id": "Q14", "stem": "The purpose of these workshops ____ to help teachers use formative assessment.", "options": [{"key": "A", "text": "are"}, {"key": "B", "text": "is"}, {"key": "C", "text": "were"}, {"key": "D", "text": "have been"}], "correctKey": "B", "slot": "of-phrase (singular head)", "explain": "Subject = purpose (singular), not workshops."}, {"id": "Q15", "stem": "The reports from the field offices (A) was filed (B) late (C) last Friday (D).", "options": [{"key": "A", "text": "The reports from the field offices"}, {"key": "B", "text": "late"}, {"key": "C", "text": "was filed"}, {"key": "D", "text": "last Friday"}], "correctKey": "C", "slot": "Error ID · from-phrase", "explain": "was filed is incorrect. Subject = reports (plural). Cross out from the field offices. Use were filed."}];
  const slotLabel = "Pattern";

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function formatStem(stem) {
    return escapeHtml(stem).replace(/____/g, '<span class="blank">____</span>');
  }

function bootStrategyClass({ teachHtml, demos, practice, slotLabel }) {
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  practice.forEach((q) => { counts[q.correctKey] += 1; });
  console.info("[Strategy] balance", counts);

  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const name = tab.getAttribute("data-tab");
      tabs.forEach((t) => t.classList.toggle("active", t === tab));
      panels.forEach((p) => p.classList.toggle("active", p.getAttribute("data-panel") === name));
    });
  });

  document.getElementById("panel-teach").innerHTML = teachHtml;

  let demoIndex = 0;
  const demoAnswers = new Map();
  const demoOpened = new Set();
  const demoMeta = document.getElementById("demo-meta");
  const demoStage = document.getElementById("demo-stage");
  const demoProgress = document.getElementById("demo-progress");
  const demoPrev = document.getElementById("demo-prev");
  const demoNext = document.getElementById("demo-next");
  const demoReveal = document.getElementById("demo-reveal");

  function renderDemo() {
    const item = demos[demoIndex];
    const selected = demoAnswers.get(demoIndex);
    const opened = demoOpened.has(demoIndex);
    const right = item.options.find((o) => o.key === item.correctKey);
    const ok = selected === item.correctKey;
    demoMeta.textContent = `Demo ${demoIndex + 1} of ${demos.length} · pick one, then See feedback`;
    demoProgress.style.width = `${((demoIndex + 1) / demos.length) * 100}%`;
    const options = item.options.map((opt) => {
      const classes = ["opt"];
      if (selected === opt.key) classes.push("selected");
      if (opened && opt.key === item.correctKey) classes.push("correct");
      if (opened && selected === opt.key && !ok) classes.push("miss");
      return `<button type="button" class="${classes.join(" ")}" data-key="${escapeHtml(opt.key)}" ${opened ? "disabled" : ""}>
        <span class="key">${escapeHtml(opt.key)}</span><span>${escapeHtml(opt.text)}</span>
      </button>`;
    }).join("");
    const verdict = ok
      ? `Correct · ${escapeHtml(slotLabel)}: ${escapeHtml(item.slot)} · ${escapeHtml(item.correctKey)}. ${escapeHtml(right?.text || "")}`
      : `Not this time · ${escapeHtml(slotLabel)}: ${escapeHtml(item.slot)} · answer ${escapeHtml(item.correctKey)}. ${escapeHtml(right?.text || "")}`;
    demoStage.innerHTML = `
      <h3 style="margin:0 0 8px;color:var(--navy);font-size:1.05rem">${escapeHtml(item.title)}</h3>
      <p class="stem">${formatStem(item.stem)}</p>
      <div class="options">${options}</div>
      <p class="status" id="demo-hint" hidden>Choose A, B, C, or D first.</p>
      <div class="teach-box ${ok ? "ok" : "bad"}" id="demo-teach" ${opened ? "" : "hidden"}>
        <strong>${verdict}</strong>
        <p style="margin:8px 0 0">${escapeHtml(item.teach)}</p>
      </div>`;
    demoStage.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (demoOpened.has(demoIndex)) return;
        demoAnswers.set(demoIndex, btn.getAttribute("data-key"));
        const hint = document.getElementById("demo-hint");
        if (hint) hint.hidden = true;
        renderDemo();
      });
    });
    demoPrev.disabled = demoIndex === 0;
    demoNext.textContent = demoIndex === demos.length - 1 ? "Go to Practice tab" : "Next demo";
    demoReveal.textContent = opened ? "Hide feedback" : "See feedback";
  }

  demoPrev.addEventListener("click", () => {
    if (demoIndex > 0) { demoIndex -= 1; renderDemo(); }
  });
  demoNext.addEventListener("click", () => {
    if (demoIndex < demos.length - 1) { demoIndex += 1; renderDemo(); return; }
    document.querySelector('.tab[data-tab="practice"]').click();
  });
  demoReveal.addEventListener("click", () => {
    const hint = document.getElementById("demo-hint");
    if (!demoAnswers.has(demoIndex)) {
      if (hint) hint.hidden = false;
      return;
    }
    if (demoOpened.has(demoIndex)) demoOpened.delete(demoIndex);
    else demoOpened.add(demoIndex);
    renderDemo();
  });
  renderDemo();

  let qIndex = 0;
  let submitted = false;
  const answers = new Map();
  const practiceMeta = document.getElementById("practice-meta");
  const practiceStage = document.getElementById("practice-stage");
  const practiceProgress = document.getElementById("practice-progress");
  const practiceStatus = document.getElementById("practice-status");
  const practicePrev = document.getElementById("practice-prev");
  const practiceNext = document.getElementById("practice-next");
  const practiceNav = document.getElementById("practice-nav");
  const submitRow = document.getElementById("practice-submit-row");
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn = document.getElementById("reset-btn");
  const results = document.getElementById("results");
  const scoreLine = document.getElementById("score-line");
  const balanceNote = document.getElementById("balance-note");
  const reviewList = document.getElementById("review-list");

  function updatePracticeChrome() {
    const n = answers.size;
    practiceStatus.hidden = false;
    practiceStatus.textContent = n === 15
      ? "All 15 answered. Submit when ready — no scores until then."
      : `Answered ${n} of 15. One question per screen.`;
    const answered = answers.has(practice[qIndex].id);
    practiceProgress.style.width = `${((qIndex + 1) / practice.length) * 100}%`;
    practiceMeta.textContent = `Question ${qIndex + 1} of ${practice.length}` + (answered ? " · selected" : "");
    practicePrev.disabled = qIndex === 0 || submitted;
    if (qIndex === practice.length - 1) {
      practiceNext.hidden = true;
      submitRow.hidden = false;
    } else {
      practiceNext.hidden = false;
      practiceNext.textContent = "Next question";
      submitRow.hidden = submitted ? false : true;
    }
    if (submitted) {
      practiceNav.hidden = true;
      submitRow.hidden = false;
    }
  }

  function renderPractice() {
    const item = practice[qIndex];
    const selected = answers.get(item.id);
    const options = item.options.map((opt) => `
      <button type="button" class="opt${selected === opt.key ? " selected" : ""}" data-key="${escapeHtml(opt.key)}" ${submitted ? "disabled" : ""}>
        <span class="key">${escapeHtml(opt.key)}</span><span>${escapeHtml(opt.text)}</span>
      </button>`).join("");
    practiceStage.innerHTML = `
      <p class="stem">${formatStem(item.stem)}</p>
      <div class="options">${options}</div>`;
    practiceStage.querySelectorAll(".opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (submitted) return;
        answers.set(item.id, btn.getAttribute("data-key"));
        renderPractice();
      });
    });
    updatePracticeChrome();
  }

  practicePrev.addEventListener("click", () => { if (qIndex > 0) { qIndex -= 1; renderPractice(); } });
  practiceNext.addEventListener("click", () => { if (qIndex < practice.length - 1) { qIndex += 1; renderPractice(); } });

  submitBtn.addEventListener("click", () => {
    if (answers.size < 15) {
      practiceStatus.hidden = false;
      practiceStatus.textContent = `Answer all 15 before submitting (${answers.size}/15).`;
      return;
    }
    submitted = true;
    submitBtn.hidden = true;
    resetBtn.hidden = false;
    practiceNav.hidden = true;
    let correct = 0;
    const review = practice.map((item, index) => {
      const chosen = answers.get(item.id);
      const ok = chosen === item.correctKey;
      if (ok) correct += 1;
      return { index, item, chosen, ok,
        chosenText: item.options.find((o) => o.key === chosen)?.text || "—",
        rightText: item.options.find((o) => o.key === item.correctKey)?.text || "" };
    });
    results.hidden = false;
    scoreLine.textContent = `Score: ${correct} / 15 (${Math.round((correct / 15) * 100)}%)`;
    balanceNote.textContent = `Correct-letter balance: A×${counts.A} · B×${counts.B} · C×${counts.C} · D×${counts.D}.`;
    reviewList.innerHTML = review.map(({ index, item, chosen, chosenText, rightText, ok }) => `
      <article class="review-item ${ok ? "ok" : "bad"}">
        <h4>Q${index + 1} · ${ok ? "Correct" : "Incorrect"} · ${escapeHtml(slotLabel)}: ${escapeHtml(item.slot)}</h4>
        <p class="stem">${formatStem(item.stem)}</p>
        <p>Yours: <strong>${escapeHtml(chosen || "—")}. ${escapeHtml(chosenText)}</strong></p>
        <p>Correct: <strong>${escapeHtml(item.correctKey)}. ${escapeHtml(rightText)}</strong></p>
        <p>${escapeHtml(item.explain)}</p>
      </article>`).join("");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  resetBtn.addEventListener("click", () => {
    submitted = false;
    answers.clear();
    qIndex = 0;
    submitBtn.hidden = false;
    resetBtn.hidden = true;
    results.hidden = true;
    reviewList.innerHTML = "";
    practiceNav.hidden = false;
    renderPractice();
  });

  renderPractice();
}

  bootStrategyClass({ teachHtml, demos, practice, slotLabel });
})();
