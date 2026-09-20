(() => {
  const teachHtml = "\n<div class=\"prose\">\n  <p><strong>Goal today:</strong> choose the verb that matches the <em>true subject</em> \u2014 not the nearest noun.</p>\n  <h3>How to decide</h3>\n  <div class=\"slot-grid\">\n    <article><strong>1. Find the subject</strong><span>Ask: who or what is doing the action?</span></article>\n    <article><strong>2. Cross out traps</strong><span>Skip phrases like <em>of the students</em>, <em>as well as\u2026</em>, or relative clauses.</span></article>\n    <article><strong>3. Lock singular / plural</strong><span>Then pick the verb form that matches.</span></article>\n    <article><strong>4. Check special patterns</strong><span>Use the examples below for the most common TOEFL traps.</span></article>\n  </div>\n\n  <h3>High-yield patterns (with examples)</h3>\n  <ul>\n    <li><strong>The number of</strong> \u2192 singular.<br>\n      \u2713 <em>The number of applications <strong>has</strong> increased.</em><br>\n      \u2717 <em>The number of applications have increased.</em></li>\n    <li><strong>A number of</strong> \u2192 plural.<br>\n      \u2713 <em>A number of studies <strong>show</strong> the same result.</em><br>\n      \u2717 <em>A number of studies shows the same result.</em></li>\n    <li><strong>Each / every / one of</strong> \u2192 singular.<br>\n      \u2713 <em>Each of the participants <strong>was</strong> asked to wait.</em><br>\n      \u2717 <em>Each of the participants were asked to wait.</em></li>\n    <li><strong>Neither\u2026nor / either\u2026or</strong> \u2192 agree with the nearer subject.<br>\n      \u2713 <em>Neither the assistants nor the supervisor <strong>was</strong> informed.</em><br>\n      \u2713 <em>Neither the chair nor the members <strong>were</strong> ready.</em></li>\n    <li><strong>As well as / along with / together with</strong> \u2192 do not change the subject.<br>\n      \u2713 <em>The chair, as well as the lecturers, <strong>has</strong> submitted the report.</em><br>\n      \u2717 <em>The chair, as well as the lecturers, have submitted the report.</em></li>\n    <li><strong>There + noun</strong> \u2192 verb agrees with the noun after <em>there</em>.<br>\n      \u2713 <em>There <strong>are</strong> several explanations for the decline.</em><br>\n      \u2717 <em>There is several explanations for the decline.</em></li>\n    <li><strong>Intervening phrase</strong> \u2192 ignore nouns inside <em>of\u2026</em> / relative clauses.<br>\n      \u2713 <em>The results of the experiment <strong>indicate</strong> a problem.</em><br>\n      \u2717 <em>The results of the experiment indicates a problem.</em></li>\n  </ul>\n\n  <div class=\"callout\">\n    <strong>Remember</strong>\n    <p>If two nouns appear, ask which one is the real subject. The nearest noun is often a trap.</p>\n  </div>\n</div>\n";
  const demos = [{"title": "Demo 1 · The Number Of", "stem": "The number of people living in urban areas ____ increased dramatically.", "options": [{"key": "A", "text": "were"}, {"key": "B", "text": "have"}, {"key": "C", "text": "are"}, {"key": "D", "text": "has"}], "correctKey": "D", "slot": "Completion", "teach": "'The number of' is singular and takes the singular verb 'has.' Common trap: Choosing a plural verb because 'people' is plural."}, {"title": "Demo 2 · Neither...Nor", "stem": "Neither the director nor the assistants ____ available for the meeting.", "options": [{"key": "A", "text": "were"}, {"key": "B", "text": "has been"}, {"key": "C", "text": "is"}, {"key": "D", "text": "was"}], "correctKey": "A", "slot": "Completion", "teach": "With 'neither...nor,' the verb agrees with the nearer subject, 'assistants.' Common trap: Making the verb agree with the first subject instead of the nearest one."}, {"title": "Demo 3 · Inverted Structure", "stem": "Among the most valuable documents in the archive ____ several letters from early settlers.", "options": [{"key": "A", "text": "was"}, {"key": "B", "text": "has been"}, {"key": "C", "text": "is"}, {"key": "D", "text": "are"}], "correctKey": "D", "slot": "Completion", "teach": "The true subject is 'several letters,' which is plural, so 'are' is correct. Common trap: Choosing a singular verb because the sentence begins with a prepositional phrase."}, {"title": "Demo 4 · Each + Singular Verb", "stem": "Each of the participants (A) were asked (B) to complete a survey (C) before leaving the room (D).", "options": [{"key": "A", "text": "Each of the participants"}, {"key": "B", "text": "were asked"}, {"key": "C", "text": "to complete a survey"}, {"key": "D", "text": "before leaving the room"}], "correctKey": "B", "slot": "Error ID", "teach": "The underlined verb phrase \"were asked\" is incorrect. 'Each' is singular, so 'were asked' should be 'was asked.' Common trap: Making the verb agree with the plural noun 'participants.'"}, {"title": "Demo 5 · As Well As", "stem": "The department chair, as well as the senior lecturers, (A) have submitted the annual report (B) to the dean (C) this week (D).", "options": [{"key": "A", "text": "The department chair, as well as the senior lecturers,"}, {"key": "B", "text": "have submitted the annual report"}, {"key": "C", "text": "to the dean"}, {"key": "D", "text": "this week"}], "correctKey": "B", "slot": "Error ID", "teach": "The underlined verb phrase \"have submitted the annual report\" is incorrect. Phrases with 'as well as' do not make the subject plural. The subject is 'the department chair,' so the verb should be 'has submitted.' Common trap: Adding the noun after 'as well as' to the subject."}];
  const practice = [{"id": "Q01", "stem": "One of the most important findings of the study ____ that early trade networks were more complex than previously believed.", "options": [{"key": "A", "text": "have been"}, {"key": "B", "text": "being"}, {"key": "C", "text": "were"}, {"key": "D", "text": "was"}], "correctKey": "D", "slot": "One of + Singular Verb", "explain": "The subject is 'One,' which is singular, so the verb must be 'was.'"}, {"id": "Q02", "stem": "On the wall of the ancient temple ____ several inscriptions in an unknown language.", "options": [{"key": "A", "text": "appears"}, {"key": "B", "text": "has appeared"}, {"key": "C", "text": "appear"}, {"key": "D", "text": "appearing"}], "correctKey": "C", "slot": "Inverted Subject After Prepositional Phrase", "explain": "The true subject is 'several inscriptions,' which is plural, so the verb must be 'appear.'"}, {"id": "Q03", "stem": "The committee ____ reviewing the scholarship applications this week.", "options": [{"key": "A", "text": "have been"}, {"key": "B", "text": "are"}, {"key": "C", "text": "were"}, {"key": "D", "text": "is"}], "correctKey": "D", "slot": "Collective Noun", "explain": "In American academic English, a collective noun such as 'committee' is usually treated as singular."}, {"id": "Q04", "stem": "Either the department chair or the committee members ____ responsible for approving the proposal.", "options": [{"key": "A", "text": "has been"}, {"key": "B", "text": "was"}, {"key": "C", "text": "is"}, {"key": "D", "text": "are"}], "correctKey": "D", "slot": "Either...Or Agreement", "explain": "With 'either...or,' the verb agrees with the nearer subject, 'committee members.'"}, {"id": "Q05", "stem": "One of the theories proposed by early anthropologists ____ still discussed today.", "options": [{"key": "A", "text": "were"}, {"key": "B", "text": "have been"}, {"key": "C", "text": "is"}, {"key": "D", "text": "are"}], "correctKey": "C", "slot": "Complex Subject Agreement", "explain": "The subject is 'One,' not 'theories,' so the singular verb 'is' is required."}, {"id": "Q06", "stem": "The results of the laboratory experiment ____ that the compound was unstable at high temperatures.", "options": [{"key": "A", "text": "was indicated"}, {"key": "B", "text": "indicates"}, {"key": "C", "text": "indicating"}, {"key": "D", "text": "indicate"}], "correctKey": "D", "slot": "Intervening Prepositional Phrase", "explain": "The subject is plural, \"results,\" so the plural verb \"indicate\" is required. The prepositional phrase \"of the laboratory experiment\" does not control the verb."}, {"id": "Q07", "stem": "The professor and her assistant ____ the data before publishing the article.", "options": [{"key": "A", "text": "review"}, {"key": "B", "text": "reviews"}, {"key": "C", "text": "has reviewed"}, {"key": "D", "text": "reviewing"}], "correctKey": "A", "slot": "Compound Subject with And", "explain": "A compound subject joined by \"and\" normally takes a plural verb, so \"review\" is required."}, {"id": "Q08", "stem": "There ____ several possible explanations for the sudden decline in bee populations.", "options": [{"key": "A", "text": "are"}, {"key": "B", "text": "was"}, {"key": "C", "text": "is"}, {"key": "D", "text": "has been"}], "correctKey": "A", "slot": "There + Plural Subject", "explain": "In a \"there\" construction, the verb agrees with the real subject that follows it. Since \"several possible explanations\" is plural, \"are\" is required."}, {"id": "Q09", "stem": "Neither the laboratory assistants nor the supervisor (A) were informed (B) of the schedule change (C) before the meeting (D).", "options": [{"key": "A", "text": "Neither the laboratory assistants nor the supervisor"}, {"key": "B", "text": "were informed"}, {"key": "C", "text": "of the schedule change"}, {"key": "D", "text": "before the meeting"}], "correctKey": "B", "slot": "Neither…Nor (Nearer Subject)", "explain": "With neither…nor, the verb agrees with the nearer subject. The nearer subject is supervisor (singular), so were informed should be was informed."}, {"id": "Q10", "stem": "Neither the department chair nor the committee members (A) was prepared (B) to approve the proposal (C) before Friday (D).", "options": [{"key": "A", "text": "Neither the department chair nor the committee members"}, {"key": "B", "text": "was prepared"}, {"key": "C", "text": "to approve the proposal"}, {"key": "D", "text": "before Friday"}], "correctKey": "B", "slot": "Neither…Nor (Nearer Subject)", "explain": "With neither…nor, the verb agrees with the nearer subject. The nearer subject is committee members (plural), so was prepared should be were prepared."}, {"id": "Q11", "stem": "One of the most important discoveries (A) of the past decade (B) were announced (C) at the conference (D).", "options": [{"key": "A", "text": "One of the most important discoveries"}, {"key": "B", "text": "of the past decade"}, {"key": "C", "text": "were announced"}, {"key": "D", "text": "at the conference"}], "correctKey": "C", "slot": "One Of The + Plural Noun", "explain": "The underlined verb phrase \"were announced\" is incorrect. The subject is 'one,' which is singular, so the verb should be 'was announced,' not 'were announced.'"}, {"id": "Q12", "stem": "The number of applications (A) for the program (B) have increased (C) every year since 2018 (D).", "options": [{"key": "A", "text": "The number of applications"}, {"key": "B", "text": "for the program"}, {"key": "C", "text": "have increased"}, {"key": "D", "text": "every year since 2018"}], "correctKey": "C", "slot": "The Number Of", "explain": "The underlined verb phrase \"have increased\" is incorrect. 'The number of' is singular and takes 'has increased,' not 'have increased.'"}, {"id": "Q13", "stem": "A number of recent studies ____ that bilingual programs improve early literacy.", "options": [{"key": "A", "text": "shows"}, {"key": "B", "text": "has shown"}, {"key": "C", "text": "show"}, {"key": "D", "text": "showing"}], "correctKey": "C", "slot": "A Number Of (Plural)", "explain": "A number of is plural and takes a plural verb. Show agrees with studies as a plural idea after a number of."}, {"id": "Q14", "stem": "The lead researcher, along with her graduate students, ____ the samples every morning.", "options": [{"key": "A", "text": "analyze"}, {"key": "B", "text": "analyzes"}, {"key": "C", "text": "are analyzing"}, {"key": "D", "text": "have analyzed"}], "correctKey": "B", "slot": "Along With / Together With", "explain": "Phrases with along with do not make the subject plural. The true subject is The lead researcher (singular), so analyzes is required."}, {"id": "Q15", "stem": "The theory that early farmers built complex irrigation systems ____ still debated by historians.", "options": [{"key": "A", "text": "are"}, {"key": "B", "text": "have been"}, {"key": "C", "text": "is"}, {"key": "D", "text": "were"}], "correctKey": "C", "slot": "Intervening Relative Clause", "explain": "The true subject is The theory (singular). The relative clause that early farmers built complex irrigation systems does not control the verb."}];
  const slotLabel = "Pattern";

  const enhancedTeachHtml = teachHtml
    .replace(
      "Ask: who or what is doing the action?",
      "Find the complete subject, identify its head noun, and decide whether that head is singular or plural."
    )
    .replace("  </ul>", `    <li><strong>Compound subject with <em>and</em></strong> → normally plural.<br>
      ✓ <em>The professor and her assistant <strong>review</strong> the data.</em><br>
      ✗ <em>The professor and her assistant reviews the data.</em></li>
    <li><strong>Collective noun</strong> → for TOEFL's American English convention, normally singular when the group acts as one unit.<br>
      ✓ <em>The committee <strong>is</strong> reviewing the applications.</em><br>
      ✗ <em>The committee are reviewing the applications.</em></li>
    <li><strong>Inverted structure</strong> → find the subject after the opening phrase and make the verb agree with it.<br>
      ✓ <em>On the wall <strong>appear</strong> several inscriptions.</em><br>
      ✗ <em>On the wall appears several inscriptions.</em></li>
  </ul>`);

  const committeeItem = practice.find((item) => item.id === "Q03");
  if (committeeItem) {
    committeeItem.explain = "For TOEFL's American English convention, a collective noun such as 'committee' is normally singular when the group acts as one unit.";
  }


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
    const patternGroups = [
      { label: "Singular head words", ids: ["Q01", "Q05", "Q11", "Q12"] },
      { label: "Inverted / delayed subjects", ids: ["Q02", "Q08"] },
      { label: "Collective / compound subjects", ids: ["Q03", "Q07"] },
      { label: "Either / neither", ids: ["Q04", "Q09", "Q10"] },
      { label: "Intervening phrases / clauses", ids: ["Q06", "Q14", "Q15"] },
      { label: "A number of", ids: ["Q13"] }
    ];
    const performance = patternGroups.map(({ label, ids }) => {
      const groupCorrect = review.filter(({ item, ok }) => ids.includes(item.id) && ok).length;
      return `${label}: ${groupCorrect}/${ids.length}`;
    }).join(" · ");
    const nextStep = correct >= 13
      ? "Mastery achieved. Continue to the next strategy."
      : correct >= 10
        ? "Review the patterns you missed, then try again."
        : "Return to Teach and Demo before trying again.";
    balanceNote.textContent = `Performance by pattern: ${performance}. ${nextStep}`;
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

  bootStrategyClass({ teachHtml: enhancedTeachHtml, demos, practice, slotLabel });
})();
