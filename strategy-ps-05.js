(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> when words are joined by <em>and / or</em> or by a pair such as <em>both…and</em>, they must share the <em>same grammatical form</em>.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Find the list or pair</strong><span>Look for <em>and, or, both…and, not only…but also, rather than, than</em>.</span></article>
    <article><strong>2. Name the form already used</strong><span>Noun, adjective, <em>-ing</em>, <em>to</em> + verb, or a full clause?</span></article>
    <article><strong>3. Match the missing piece</strong><span>The blank must copy that same form — not a cousin that “sounds smart.”</span></article>
    <article><strong>4. Check the last item</strong><span>On Error ID, the break is often the last item after <em>and</em>.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Lists with <em>and / or</em></strong> → same form all the way through.<br>
      ✓ <em>The course emphasizes <strong>reading, writing, and speaking</strong>.</em><br>
      ✗ <em>The course emphasizes reading, writing, and to speak.</em></li>
    <li><strong>Infinitive series</strong> → keep <em>to</em> + verb.<br>
      ✓ <em>They hope <strong>to collect, to measure, and to report</strong> the data.</em><br>
      ✗ <em>They hope to collect, to measure, and reporting the data.</em></li>
    <li><strong>Both…and / not only…but also</strong> → matching forms on both sides.<br>
      ✓ <em>The report is both <strong>accurate and complete</strong>.</em><br>
      ✗ <em>The report is both accurate and completeness.</em></li>
    <li><strong>Comparatives with <em>than</em></strong> → repeat the preposition or marker.<br>
      ✓ <em>more interested <strong>in history than in chemistry</strong></em><br>
      ✗ <em>more interested in history than chemistry</em> (the second <em>in</em> is what TOEFL wants when the first side has it)</li>
    <li><strong>Rather than</strong> → usually a gerund or a bare verb matching the other side.<br>
      ✓ <em>Rather than <strong>discarding</strong> the samples, the lab froze them.</em><br>
      ✗ <em>Rather than to discard the samples, the lab froze them.</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>Do not mix an <em>-ing</em> with a <em>to</em>-verb, or an adjective with a noun, inside the same pair. Name the form first, then choose.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1 · Gerund list",
      stem: "The course emphasizes reading academic texts, writing lab notes, and ____ in seminars.",
      options: [
        { key: "A", text: "to speak" },
        { key: "B", text: "speak" },
        { key: "C", text: "speaking" },
        { key: "D", text: "spoken" }
      ],
      correctKey: "C",
      slot: "And-list · gerunds",
      teach: "Reading and writing are gerunds, so the third item must be speaking. Common trap: switching to an infinitive (to speak) at the end of the list."
    },
    {
      title: "Demo 2 · Infinitive series",
      stem: "Researchers hope to collect samples, to measure salinity, and ____ the results.",
      options: [
        { key: "A", text: "reporting" },
        { key: "B", text: "to report" },
        { key: "C", text: "report" },
        { key: "D", text: "reported" }
      ],
      correctKey: "B",
      slot: "And-list · infinitives",
      teach: "The list is already to collect and to measure, so to report keeps the series parallel. Common trap: dropping to or switching to -ing."
    },
    {
      title: "Demo 3 · Both…and",
      stem: "The final report is both accurate and ____.",
      options: [
        { key: "A", text: "complete" },
        { key: "B", text: "completeness" },
        { key: "C", text: "completely" },
        { key: "D", text: "completing" }
      ],
      correctKey: "A",
      slot: "Both…and · adjectives",
      teach: "Accurate is an adjective, so complete must be an adjective too. Common trap: completeness (a noun) because it looks more academic."
    },
    {
      title: "Demo 4 · Not only…but also",
      stem: "The new design was not only innovative but also ____.",
      options: [
        { key: "A", text: "practicality" },
        { key: "B", text: "practically" },
        { key: "C", text: "practical" },
        { key: "D", text: "practicing" }
      ],
      correctKey: "C",
      slot: "Not only…but also · adjectives",
      teach: "Innovative is an adjective, so practical matches. Common trap: practically (adverb) or practicality (noun)."
    },
    {
      title: "Demo 5 · Error ID · mixed forms",
      stem: "(A) The intern learned (B) to label samples, (C) to enter data, (D) and preparing slides for the meeting.",
      options: [
        { key: "A", text: "The intern learned" },
        { key: "B", text: "to label samples" },
        { key: "C", text: "to enter data" },
        { key: "D", text: "and preparing slides for the meeting" }
      ],
      correctKey: "D",
      slot: "Error ID · infinitive series",
      teach: "And preparing slides breaks the infinitive series. Use and to prepare slides. Common trap: hunting the first two items, which are already parallel."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The seminar focused on mapping habitats, recording temperatures, and ____ specimens.",
      options: [
        { key: "A", text: "cataloging" },
        { key: "B", text: "to catalog" },
        { key: "C", text: "catalog" },
        { key: "D", text: "cataloged" }
      ],
      correctKey: "A",
      slot: "And-list · gerunds",
      explain: "Mapping and recording are gerunds, so cataloging is required."
    },
    {
      id: "Q02",
      stem: "The team plans to survey the site, to photograph the ruins, and ____ a report.",
      options: [
        { key: "A", text: "to write" },
        { key: "B", text: "writing" },
        { key: "C", text: "write" },
        { key: "D", text: "written" }
      ],
      correctKey: "A",
      slot: "And-list · infinitives",
      explain: "The series is to survey and to photograph, so to write keeps the infinitives parallel."
    },
    {
      id: "Q03",
      stem: "The method is both efficient and ____.",
      options: [
        { key: "A", text: "reliability" },
        { key: "B", text: "reliable" },
        { key: "C", text: "reliably" },
        { key: "D", text: "relying" }
      ],
      correctKey: "B",
      slot: "Both…and · adjectives",
      explain: "Efficient is an adjective, so reliable matches. Reliability is a noun and breaks the pair."
    },
    {
      id: "Q04",
      stem: "The software not only stores the files but also ____ them.",
      options: [
        { key: "A", text: "organizing" },
        { key: "B", text: "organizes" },
        { key: "C", text: "organization" },
        { key: "D", text: "organizer" }
      ],
      correctKey: "B",
      slot: "Not only…but also · verbs",
      explain: "Stores is a present-tense verb, so organizes is the parallel verb."
    },
    {
      id: "Q05",
      stem: "Rather than ____ the samples, the lab froze them overnight.",
      options: [
        { key: "A", text: "to discard" },
        { key: "B", text: "discarded" },
        { key: "C", text: "discarding" },
        { key: "D", text: "a discard of" }
      ],
      correctKey: "C",
      slot: "Rather than · gerund",
      explain: "Rather than is typically followed by a gerund: discarding, not to discard."
    },
    {
      id: "Q06",
      stem: "The lecture was clear, concise, and ____.",
      options: [
        { key: "A", text: "inform" },
        { key: "B", text: "information" },
        { key: "C", text: "informative" },
        { key: "D", text: "informatively" }
      ],
      correctKey: "C",
      slot: "And-list · adjectives",
      explain: "Clear and concise are adjectives, so informative is required."
    },
    {
      id: "Q07",
      stem: "Students were more interested in field work than ____ laboratory drills.",
      options: [
        { key: "A", text: "to" },
        { key: "B", text: "at" },
        { key: "C", text: "for" },
        { key: "D", text: "in" }
      ],
      correctKey: "D",
      slot: "Than · repeat the preposition",
      explain: "The first side is interested in field work, so the second side needs in laboratory drills."
    },
    {
      id: "Q08",
      stem: "The grant will fund the excavation, the conservation, and ____ of the artifacts.",
      options: [
        { key: "A", text: "documenting" },
        { key: "B", text: "to document" },
        { key: "C", text: "document" },
        { key: "D", text: "the documentation" }
      ],
      correctKey: "D",
      slot: "And-list · noun phrases",
      explain: "The excavation and the conservation are noun phrases, so the documentation matches."
    },
    {
      id: "Q09",
      stem: "(A) The workshop covers (B) planning experiments, (C) analyzing data, (D) and to present findings in a poster.",
      options: [
        { key: "A", text: "The workshop covers" },
        { key: "B", text: "planning experiments" },
        { key: "C", text: "analyzing data" },
        { key: "D", text: "and to present findings in a poster" }
      ],
      correctKey: "D",
      slot: "Error ID · gerund list",
      explain: "And to present breaks the gerund series. Use and presenting findings."
    },
    {
      id: "Q10",
      stem: "The museum acquired both a sculpture and ____.",
      options: [
        { key: "A", text: "painted" },
        { key: "B", text: "a painting" },
        { key: "C", text: "to paint" },
        { key: "D", text: "painting" }
      ],
      correctKey: "B",
      slot: "Both…and · noun phrases",
      explain: "A sculpture is a noun phrase, so a painting is the parallel noun phrase."
    },
    {
      id: "Q11",
      stem: "The study not only identified the species but also ____ its habitat.",
      options: [
        { key: "A", text: "described" },
        { key: "B", text: "describing" },
        { key: "C", text: "description of" },
        { key: "D", text: "to describe" }
      ],
      correctKey: "A",
      slot: "Not only…but also · verbs",
      explain: "Identified is a past-tense verb, so described is required."
    },
    {
      id: "Q12",
      stem: "Climate, soil quality, and ____ affect crop yields in the valley.",
      options: [
        { key: "A", text: "how much it rains" },
        { key: "B", text: "raining" },
        { key: "C", text: "rainfall" },
        { key: "D", text: "to rain" }
      ],
      correctKey: "C",
      slot: "And-list · nouns",
      explain: "Climate and soil quality are nouns, so rainfall is the parallel noun. A clause (how much it rains) breaks the list."
    },
    {
      id: "Q13",
      stem: "The lab aims to isolate the compound, to purify it, and ____ its structure.",
      options: [
        { key: "A", text: "to determine" },
        { key: "B", text: "determining" },
        { key: "C", text: "determine" },
        { key: "D", text: "determined" }
      ],
      correctKey: "A",
      slot: "And-list · infinitives",
      explain: "To isolate and to purify set an infinitive series, so to determine is required."
    },
    {
      id: "Q14",
      stem: "The lecture was both engaging and ____.",
      options: [
        { key: "A", text: "information" },
        { key: "B", text: "informative" },
        { key: "C", text: "inform" },
        { key: "D", text: "informatively" }
      ],
      correctKey: "B",
      slot: "Both…and · adjectives",
      explain: "Engaging is an adjective, so informative matches."
    },
    {
      id: "Q15",
      stem: "(A) The candidates were (B) more prepared for the interview (C) than taking the written exam (D) last spring.",
      options: [
        { key: "A", text: "The candidates were" },
        { key: "B", text: "more prepared for the interview" },
        { key: "C", text: "than taking the written exam" },
        { key: "D", text: "last spring" }
      ],
      correctKey: "C",
      slot: "Error ID · than + parallel marker",
      explain: "Than taking does not match prepared for. Use than for the written exam."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "And/or lists", ids: ["Q01", "Q02", "Q06", "Q08", "Q09", "Q12", "Q13"] },
    { label: "Both…and / not only…but also", ids: ["Q03", "Q04", "Q10", "Q11", "Q14"] },
    { label: "Rather than / than", ids: ["Q05", "Q07", "Q15"] }
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
