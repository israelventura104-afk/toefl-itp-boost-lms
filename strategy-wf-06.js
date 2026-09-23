(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> name the empty slot first, then pick the <em>word family</em> that fits: noun, verb, adjective, or adverb.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Name the slot</strong><span>Before a noun? After <em>be / seem / become</em>? Modifying a verb? After <em>the / a</em>?</span></article>
    <article><strong>2. Pick the family</strong><span>Noun names a thing. Adjective describes a noun. Adverb describes a verb or adjective. Verb shows the action.</span></article>
    <article><strong>3. Choose the suffix</strong><span><em>-tion / -ity / -ness</em> often nouns. <em>-ful / -al / -ous</em> adjectives. <em>-ly</em> adverbs.</span></article>
    <article><strong>4. Ignore “smart” cousins</strong><span>The longest or most academic-looking form is often the trap.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Before a noun</strong> → adjective, not adverb.<br>
      ✓ <em>a <strong>careful</strong> analysis</em><br>
      ✗ <em>a carefully analysis</em></li>
    <li><strong>Modifying a verb or adjective</strong> → adverb, not adjective.<br>
      ✓ <em>Temperatures rose <strong>sharply</strong>.</em><br>
      ✗ <em>Temperatures rose sharp.</em></li>
    <li><strong>After <em>the / a</em> as the head of the phrase</strong> → noun.<br>
      ✓ <em>The <strong>accuracy</strong> of the instrument was confirmed.</em><br>
      ✗ <em>The accurate of the instrument was confirmed.</em></li>
    <li><strong>After <em>be / seem / become</em></strong> → adjective.<br>
      ✓ <em>The climate became <strong>unstable</strong>.</em><br>
      ✗ <em>The climate became instability.</em></li>
    <li><strong><em>-ed</em> vs <em>-ing</em> adjectives</strong> → people often take <em>-ed</em>; things take <em>-ing</em>.<br>
      ✓ <em>The students were <strong>interested</strong>. The lecture was <strong>interesting</strong>.</em><br>
      ✗ <em>The students were interesting in the results.</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>Do not choose by meaning alone. <em>Accurate / accurately / accuracy</em> all “talk about being right,” but only one form fits the slot.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1 · Adjective before a noun",
      stem: "The researchers published a ____ summary of the field trial.",
      options: [
        { key: "A", text: "concise" },
        { key: "B", text: "concisely" },
        { key: "C", text: "conciseness" },
        { key: "D", text: "concising" }
      ],
      correctKey: "A",
      slot: "Adjective before noun",
      teach: "Summary is a noun, so the word in front must be an adjective: concise. Common trap: concisely, the adverb."
    },
    {
      title: "Demo 2 · Adverb modifying a verb",
      stem: "Average temperatures rose ____ during the last decade.",
      options: [
        { key: "A", text: "sharp" },
        { key: "B", text: "sharply" },
        { key: "C", text: "sharpness" },
        { key: "D", text: "sharpen" }
      ],
      correctKey: "B",
      slot: "Adverb modifying verb",
      teach: "Rose is a verb, so it needs an adverb: sharply. Common trap: sharp, the adjective."
    },
    {
      title: "Demo 3 · Noun after the",
      stem: "The ____ of the method was questioned by two reviewers.",
      options: [
        { key: "A", text: "accurate" },
        { key: "B", text: "accurately" },
        { key: "C", text: "accuracy" },
        { key: "D", text: "accurateness" }
      ],
      correctKey: "C",
      slot: "Noun after the",
      teach: "After the, the head of the phrase is a noun: accuracy. Common trap: accurate, which would need a noun after it (the accurate method)."
    },
    {
      title: "Demo 4 · -ed vs -ing",
      stem: "The visiting students were ____ in the archive’s oldest maps.",
      options: [
        { key: "A", text: "interesting" },
        { key: "B", text: "interest" },
        { key: "C", text: "interested" },
        { key: "D", text: "interestingly" }
      ],
      correctKey: "C",
      slot: "-ed adjective for people",
      teach: "People who feel something take -ed: interested. Interesting describes the thing that causes the feeling. Common trap: interesting because the maps are the topic."
    },
    {
      title: "Demo 5 · Error ID · adjective used as adverb",
      stem: "(A) The team completed (B) the restoration (C) successful (D) last month.",
      options: [
        { key: "A", text: "The team completed" },
        { key: "B", text: "the restoration" },
        { key: "C", text: "successful" },
        { key: "D", text: "last month" }
      ],
      correctKey: "C",
      slot: "Error ID · adverb slot",
      teach: "Successful is an adjective, but it is modifying the verb completed. Use successfully. Common trap: hunting last month, which is already a correct time phrase."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The committee requested a ____ review of the grant application.",
      options: [
        { key: "A", text: "thorough" },
        { key: "B", text: "thoroughly" },
        { key: "C", text: "thoroughness" },
        { key: "D", text: "thoroughing" }
      ],
      correctKey: "A",
      slot: "Adjective before noun",
      explain: "Review is a noun, so thorough (adjective) is required, not thoroughly."
    },
    {
      id: "Q02",
      stem: "The glacier retreated ____ after several warm summers.",
      options: [
        { key: "A", text: "rapidly" },
        { key: "B", text: "rapid" },
        { key: "C", text: "rapidity" },
        { key: "D", text: "rapidness" }
      ],
      correctKey: "A",
      slot: "Adverb modifying verb",
      explain: "Retreated is a verb, so the adverb rapidly is required."
    },
    {
      id: "Q03",
      stem: "The ____ of the sample surprised the chemists.",
      options: [
        { key: "A", text: "dense" },
        { key: "B", text: "density" },
        { key: "C", text: "densely" },
        { key: "D", text: "denser" }
      ],
      correctKey: "B",
      slot: "Noun after the",
      explain: "After the, the head of the phrase is a noun: density, not dense."
    },
    {
      id: "Q04",
      stem: "The new evidence seemed ____ to most of the panel.",
      options: [
        { key: "A", text: "reliability" },
        { key: "B", text: "reliable" },
        { key: "C", text: "reliably" },
        { key: "D", text: "rely" }
      ],
      correctKey: "B",
      slot: "Adjective after seem",
      explain: "After seem, use an adjective: reliable. Reliability is a noun."
    },
    {
      id: "Q05",
      stem: "The findings were ____ consistent across the three sites.",
      options: [
        { key: "A", text: "remark" },
        { key: "B", text: "remarkable" },
        { key: "C", text: "remarkably" },
        { key: "D", text: "remarking" }
      ],
      correctKey: "C",
      slot: "Adverb modifying adjective",
      explain: "Consistent is an adjective, so it is modified by the adverb remarkably."
    },
    {
      id: "Q06",
      stem: "The procedure is ____ for first-year laboratory students.",
      options: [
        { key: "A", text: "suitability" },
        { key: "B", text: "suitably" },
        { key: "C", text: "suitable" },
        { key: "D", text: "suit" }
      ],
      correctKey: "C",
      slot: "Adjective after be",
      explain: "After is, use an adjective: suitable, not suitability."
    },
    {
      id: "Q07",
      stem: "____ is essential before excavation can begin.",
      options: [
        { key: "A", text: "Document" },
        { key: "B", text: "Documentary" },
        { key: "C", text: "Documented" },
        { key: "D", text: "Documentation" }
      ],
      correctKey: "D",
      slot: "Noun as subject",
      explain: "The subject of is essential must be a noun: Documentation."
    },
    {
      id: "Q08",
      stem: "They proposed a ____ model of bird migration.",
      options: [
        { key: "A", text: "theory" },
        { key: "B", text: "theoretically" },
        { key: "C", text: "theorize" },
        { key: "D", text: "theoretical" }
      ],
      correctKey: "D",
      slot: "Adjective before noun",
      explain: "Model is a noun, so theoretical (adjective) is required."
    },
    {
      id: "Q09",
      stem: "(A) The committee reviewed (B) the proposal (C) careful (D) before voting.",
      options: [
        { key: "A", text: "The committee reviewed" },
        { key: "B", text: "the proposal" },
        { key: "C", text: "careful" },
        { key: "D", text: "before voting" }
      ],
      correctKey: "C",
      slot: "Error ID · adverb slot",
      explain: "Careful is an adjective modifying the verb reviewed. Use carefully."
    },
    {
      id: "Q10",
      stem: "Scientists debated the ____ of the new dating method.",
      options: [
        { key: "A", text: "valid" },
        { key: "B", text: "validity" },
        { key: "C", text: "validly" },
        { key: "D", text: "validate" }
      ],
      correctKey: "B",
      slot: "Noun after the",
      explain: "After the, use the noun validity. Valid would need a noun after it."
    },
    {
      id: "Q11",
      stem: "A ____ explanation appeared in the technical appendix.",
      options: [
        { key: "A", text: "plausible" },
        { key: "B", text: "plausibly" },
        { key: "C", text: "plausibility" },
        { key: "D", text: "plausibleness" }
      ],
      correctKey: "A",
      slot: "Adjective before noun",
      explain: "Explanation is a noun, so plausible is the matching adjective."
    },
    {
      id: "Q12",
      stem: "The river flooded ____ after the mountain storm.",
      options: [
        { key: "A", text: "extensive" },
        { key: "B", text: "extension" },
        { key: "C", text: "extend" },
        { key: "D", text: "extensively" }
      ],
      correctKey: "D",
      slot: "Adverb modifying verb",
      explain: "Flooded is a verb, so extensively (adverb) is required."
    },
    {
      id: "Q13",
      stem: "____ is required before the samples can be shipped.",
      options: [
        { key: "A", text: "Confirm" },
        { key: "B", text: "Confirmation" },
        { key: "C", text: "Confirmed" },
        { key: "D", text: "Confirms" }
      ],
      correctKey: "B",
      slot: "Noun as subject",
      explain: "The subject of is required must be a noun: Confirmation."
    },
    {
      id: "Q14",
      stem: "(A) The accurate (B) of the instrument (C) was confirmed (D) in two trials.",
      options: [
        { key: "A", text: "The accurate" },
        { key: "B", text: "of the instrument" },
        { key: "C", text: "was confirmed" },
        { key: "D", text: "in two trials" }
      ],
      correctKey: "A",
      slot: "Error ID · noun after the",
      explain: "The accurate is missing a noun head. Use The accuracy of the instrument."
    },
    {
      id: "Q15",
      stem: "(A) The students answered (B) the questions (C) complete (D) on the first attempt.",
      options: [
        { key: "A", text: "The students answered" },
        { key: "B", text: "the questions" },
        { key: "C", text: "complete" },
        { key: "D", text: "on the first attempt" }
      ],
      correctKey: "C",
      slot: "Error ID · adverb slot",
      explain: "Complete is an adjective, but it modifies answered. Use completely."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Adjective slots", ids: ["Q01", "Q04", "Q06", "Q08", "Q11"] },
    { label: "Adverb slots", ids: ["Q02", "Q05", "Q09", "Q12", "Q15"] },
    { label: "Noun slots", ids: ["Q03", "Q07", "Q10", "Q13", "Q14"] }
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
