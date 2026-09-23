(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> Written Expression is a hunt. Four parts are underlined. <em>Exactly one</em> must change for the sentence to be standard written English.</p>
  <h3>The routine</h3>
  <div class="slot-grid">
    <article><strong>1. Read the whole sentence</strong><span>Do not start at underline A. Get the meaning first.</span></article>
    <article><strong>2. Find subject and verb</strong><span>Who or what is doing the action? Does the verb match?</span></article>
    <article><strong>3. Test A, then B, then C, then D</strong><span>Ask one question per underline: must this change, or is it already grammatical?</span></article>
    <article><strong>4. Keep the one must-change</strong><span>If two look wrong, you misread. Only one underline is the error.</span></article>
  </div>

  <h3>What to test on each underline</h3>
  <ul>
    <li><strong>Agreement</strong> → does the verb match the true subject, not the nearest noun?<br>
      ✓ <em>The results of the experiment <strong>indicate</strong> a problem.</em><br>
      ✗ <em>The results of the experiment indicates a problem.</em></li>
    <li><strong>Word form</strong> → noun, adjective, or adverb in that slot?<br>
      ✓ <em>The team completed the restoration <strong>successfully</strong>.</em><br>
      ✗ <em>The team completed the restoration successful.</em></li>
    <li><strong>Parallel structure</strong> → same form after <em>and / or / both…and</em>.<br>
      ✓ <em>to collect, to measure, and <strong>to report</strong></em><br>
      ✗ <em>to collect, to measure, and reporting</em></li>
    <li><strong>Tense</strong> → does the time marker match the verb?<br>
      ✓ <em>The survey <strong>mapped</strong> the coast thirty years ago.</em><br>
      ✗ <em>The survey has mapped the coast thirty years ago.</em></li>
    <li><strong>Extra word / wrong relative</strong> → no double subject; <em>who</em> for people, <em>which</em> for things.<br>
      ✓ <em>the glacier <strong>which retreated</strong></em><br>
      ✗ <em>the glacier which it retreated</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>Long underlines are often traps, not errors. A short verb or suffix is frequently the one that must change.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "(A) The results (B) of the laboratory experiment (C) indicates (D) a serious problem.",
      options: [
        { key: "A", text: "The results" },
        { key: "B", text: "of the laboratory experiment" },
        { key: "C", text: "indicates" },
        { key: "D", text: "a serious problem" }
      ],
      correctKey: "C",
      slot: "Agreement",
      teach: "Subject = results (plural). Cross out of the laboratory experiment. Indicates must be indicate. Common trap: agreeing with experiment."
    },
    {
      title: "Demo 2",
      stem: "(A) The team completed (B) the restoration (C) successful (D) last month.",
      options: [
        { key: "A", text: "The team completed" },
        { key: "B", text: "the restoration" },
        { key: "C", text: "successful" },
        { key: "D", text: "last month" }
      ],
      correctKey: "C",
      slot: "Word form",
      teach: "Successful is an adjective, but it modifies the verb completed. Use successfully. Common trap: hunting last month."
    },
    {
      title: "Demo 3",
      stem: "(A) The report is (B) both detailed (C) and accuracy (D) in its conclusions.",
      options: [
        { key: "A", text: "The report is" },
        { key: "B", text: "both detailed" },
        { key: "C", text: "and accuracy" },
        { key: "D", text: "in its conclusions" }
      ],
      correctKey: "C",
      slot: "Parallel structure",
      teach: "Both detailed and… needs a second adjective. Accuracy is a noun. Use and accurate. Common trap: hunting in its conclusions."
    },
    {
      title: "Demo 4",
      stem: "(A) The committee will announce the results (B) after it (C) will finish (D) the review.",
      options: [
        { key: "A", text: "The committee will announce the results" },
        { key: "B", text: "after it" },
        { key: "C", text: "will finish" },
        { key: "D", text: "the review" }
      ],
      correctKey: "C",
      slot: "Tense · time clause",
      teach: "After it is a time clause. Use finishes, not will finish. The main clause already carries the future."
    },
    {
      title: "Demo 5",
      stem: "(A) Last spring (B) the curator (C) whom cataloged the collection (D) published a paper.",
      options: [
        { key: "A", text: "Last spring" },
        { key: "B", text: "the curator" },
        { key: "C", text: "whom cataloged the collection" },
        { key: "D", text: "published a paper" }
      ],
      correctKey: "C",
      slot: "Relative pronoun",
      teach: "The curator cataloged the collection, so the relative is a subject. Use who cataloged, not whom cataloged."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "(A) The accurate (B) of the dating method (C) was questioned (D) by two reviewers.",
      options: [
        { key: "A", text: "The accurate" },
        { key: "B", text: "of the dating method" },
        { key: "C", text: "was questioned" },
        { key: "D", text: "by two reviewers" }
      ],
      correctKey: "A",
      slot: "Word form · noun after the",
      explain: "The accurate is missing a noun head. Use The accuracy of the dating method."
    },
    {
      id: "Q02",
      stem: "(A) If I was (B) the director, (C) I would expand (D) the archive hours.",
      options: [
        { key: "A", text: "If I was" },
        { key: "B", text: "the director" },
        { key: "C", text: "I would expand" },
        { key: "D", text: "the archive hours" }
      ],
      correctKey: "A",
      slot: "Unreal were",
      explain: "This if-clause is hypothetical (would expand). Use If I were, not If I was."
    },
    {
      id: "Q03",
      stem: "(A) The number of applications (B) have increased (C) every year (D) since 2018.",
      options: [
        { key: "A", text: "The number of applications" },
        { key: "B", text: "have increased" },
        { key: "C", text: "every year" },
        { key: "D", text: "since 2018" }
      ],
      correctKey: "B",
      slot: "Agreement · the number of",
      explain: "The number of is singular. Use has increased, not have increased."
    },
    {
      id: "Q04",
      stem: "(A) The glacier (B) retreated rapid (C) after several warm summers (D) last decade.",
      options: [
        { key: "A", text: "The glacier" },
        { key: "B", text: "retreated rapid" },
        { key: "C", text: "after several warm summers" },
        { key: "D", text: "last decade" }
      ],
      correctKey: "B",
      slot: "Word form · adverb",
      explain: "Rapid is an adjective, but it modifies retreated. Use retreated rapidly."
    },
    {
      id: "Q05",
      stem: "(A) The lecture was (B) clear, concise, (C) and information (D) throughout.",
      options: [
        { key: "A", text: "The lecture was" },
        { key: "B", text: "clear, concise," },
        { key: "C", text: "and information" },
        { key: "D", text: "throughout" }
      ],
      correctKey: "C",
      slot: "Parallel structure",
      explain: "Clear and concise are adjectives, so use and informative, not and information."
    },
    {
      id: "Q06",
      stem: "(A) The students will submit the draft (B) after they (C) will complete (D) the figures.",
      options: [
        { key: "A", text: "The students will submit the draft" },
        { key: "B", text: "after they" },
        { key: "C", text: "will complete" },
        { key: "D", text: "the figures" }
      ],
      correctKey: "C",
      slot: "Tense · time clause",
      explain: "After they is a time clause. Use complete, not will complete."
    },
    {
      id: "Q07",
      stem: "(A) The course requires (B) attending lectures, (C) completing labs, (D) and to submit a paper by May.",
      options: [
        { key: "A", text: "The course requires" },
        { key: "B", text: "attending lectures" },
        { key: "C", text: "completing labs" },
        { key: "D", text: "and to submit a paper by May" }
      ],
      correctKey: "D",
      slot: "Parallel structure",
      explain: "Attending and completing are gerunds. Use and submitting a paper, not and to submit."
    },
    {
      id: "Q08",
      stem: "(A) Students were (B) more interested (C) in field work (D) than laboratory drills.",
      options: [
        { key: "A", text: "Students were" },
        { key: "B", text: "more interested" },
        { key: "C", text: "in field work" },
        { key: "D", text: "than laboratory drills" }
      ],
      correctKey: "D",
      slot: "Parallel · repeat the preposition",
      explain: "The first side is interested in field work, so the second side needs than in laboratory drills."
    },
    {
      id: "Q09",
      stem: "(A) An large (B) archive of maps (C) was donated (D) last year.",
      options: [
        { key: "A", text: "An large" },
        { key: "B", text: "archive of maps" },
        { key: "C", text: "was donated" },
        { key: "D", text: "last year" }
      ],
      correctKey: "A",
      slot: "Article",
      explain: "Large begins with a consonant sound, so use A large, not An large."
    },
    {
      id: "Q10",
      stem: "(A) Each of the participants (B) were asked (C) to complete a survey (D) before leaving.",
      options: [
        { key: "A", text: "Each of the participants" },
        { key: "B", text: "were asked" },
        { key: "C", text: "to complete a survey" },
        { key: "D", text: "before leaving" }
      ],
      correctKey: "B",
      slot: "Agreement · each",
      explain: "Each is singular. Use was asked, not were asked. Participants is a trap."
    },
    {
      id: "Q11",
      stem: "(A) Scientists (B) debated (C) the valid of the new dating method (D) yesterday.",
      options: [
        { key: "A", text: "Scientists" },
        { key: "B", text: "debated" },
        { key: "C", text: "the valid of the new dating method" },
        { key: "D", text: "yesterday" }
      ],
      correctKey: "C",
      slot: "Word form · noun after the",
      explain: "After the, use a noun: the validity of the new dating method, not the valid."
    },
    {
      id: "Q12",
      stem: "(A) The team plans (B) to survey the site, (C) to photograph the ruins, (D) and writing a report.",
      options: [
        { key: "A", text: "The team plans" },
        { key: "B", text: "to survey the site" },
        { key: "C", text: "to photograph the ruins" },
        { key: "D", text: "and writing a report" }
      ],
      correctKey: "D",
      slot: "Parallel structure",
      explain: "To survey and to photograph are infinitives. Use and to write a report, not and writing."
    },
    {
      id: "Q13",
      stem: "(A) The survey has mapped (B) the coastline (C) thirty years ago (D) in detail.",
      options: [
        { key: "A", text: "The survey has mapped" },
        { key: "B", text: "the coastline" },
        { key: "C", text: "thirty years ago" },
        { key: "D", text: "in detail" }
      ],
      correctKey: "A",
      slot: "Tense · ago",
      explain: "Ago marks a finished time. Use mapped, not has mapped."
    },
    {
      id: "Q14",
      stem: "(A) The department chair, as well as the senior lecturers, (B) have submitted (C) the annual report (D) this week.",
      options: [
        { key: "A", text: "The department chair, as well as the senior lecturers," },
        { key: "B", text: "have submitted" },
        { key: "C", text: "the annual report" },
        { key: "D", text: "this week" }
      ],
      correctKey: "B",
      slot: "Agreement · as well as",
      explain: "As well as does not join subjects. The true subject is the department chair. Use has submitted."
    },
    {
      id: "Q15",
      stem: "(A) The procedure (B) is (C) suitability (D) for first-year laboratory students.",
      options: [
        { key: "A", text: "The procedure" },
        { key: "B", text: "is" },
        { key: "C", text: "suitability" },
        { key: "D", text: "for first-year laboratory students" }
      ],
      correctKey: "C",
      slot: "Word form · adjective after be",
      explain: "After is, use an adjective: suitable, not suitability."
    }
  ];

  const slotLabel = "Hunt";
  const patternGroups = [
    { label: "Agreement", ids: ["Q03", "Q10", "Q14"] },
    { label: "Word form / article", ids: ["Q01", "Q04", "Q09", "Q11", "Q15"] },
    { label: "Parallel", ids: ["Q05", "Q07", "Q08", "Q12"] },
    { label: "Tense / were", ids: ["Q02", "Q06", "Q13"] }
  ];

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

  function bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups }) {
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
        return {
          index, item, chosen, ok,
          chosenText: item.options.find((o) => o.key === chosen)?.text || "—",
          rightText: item.options.find((o) => o.key === item.correctKey)?.text || ""
        };
      });
      results.hidden = false;
      scoreLine.textContent = `Score: ${correct} / 15 (${Math.round((correct / 15) * 100)}%)`;
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

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
