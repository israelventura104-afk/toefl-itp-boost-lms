(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> an adjective clause describes a noun already in the sentence. Choose the relative word that fits that noun’s job.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Find the noun</strong><span>The clause sits right after the person, thing, place, or time it describes.</span></article>
    <article><strong>2. Ask three questions</strong><span>Person or thing? Subject or object? Possession?</span></article>
    <article><strong>3. Lock the relative</strong><span><em>who</em> subject people · <em>whom</em> object people · <em>which</em> things · <em>whose</em> possession · <em>where / when</em> place / time.</span></article>
    <article><strong>4. Drop extra pronouns</strong><span>Do not keep <em>he / it / they</em> after the relative. One subject is enough.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Who</strong> → people as the subject of the clause.<br>
      ✓ <em>the botanist <strong>who</strong> discovered the species</em><br>
      ✗ <em>the botanist which discovered the species</em></li>
    <li><strong>Whom</strong> → people as the object of the clause (TOEFL written English).<br>
      ✓ <em>the historian <strong>whom</strong> the committee invited</em><br>
      ✗ <em>the historian which the committee invited</em></li>
    <li><strong>Which</strong> → things, not people.<br>
      ✓ <em>the manuscript <strong>which</strong> was damaged in storage</em><br>
      ✗ <em>the chemist which designed the assay</em></li>
    <li><strong>Whose</strong> → possession for people or things.<br>
      ✓ <em>the researcher <strong>whose</strong> samples were lost</em><br>
      ✓ <em>the archive <strong>whose</strong> catalogs were digitized</em></li>
    <li><strong>No double subject</strong> → the relative already fills the slot.<br>
      ✓ <em>the glacier <strong>which retreated</strong> last century</em><br>
      ✗ <em>the glacier which it retreated last century</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p><em>What</em> does not replace a noun that is already there. If the sentence has <em>the theory ____ …</em>, use <em>which</em>, not <em>what</em>.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "The botanist ____ discovered the orchid now teaches at the university.",
      options: [
        { key: "A", text: "which" },
        { key: "B", text: "who" },
        { key: "C", text: "whom" },
        { key: "D", text: "whose" }
      ],
      correctKey: "B",
      slot: "Who · people as subject",
      teach: "Botanist is a person and does the discovering, so who is required. Common trap: which, which is for things."
    },
    {
      title: "Demo 2",
      stem: "The manuscript ____ was damaged in storage has now been restored.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "which" },
        { key: "D", text: "whose" }
      ],
      correctKey: "C",
      slot: "Which · things",
      teach: "Manuscript is a thing, so which is required. Common trap: who, because the sentence feels academic and ‘human’."
    },
    {
      title: "Demo 3",
      stem: "The researcher ____ samples were lost repeated the experiment.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "which" },
        { key: "D", text: "whose" }
      ],
      correctKey: "D",
      slot: "Whose · possession",
      teach: "The samples belong to the researcher, so whose is required. Common trap: who, which cannot show possession."
    },
    {
      title: "Demo 4",
      stem: "The historian ____ the committee invited specializes in Roman aqueducts.",
      options: [
        { key: "A", text: "whom" },
        { key: "B", text: "who" },
        { key: "C", text: "whose" },
        { key: "D", text: "which" }
      ],
      correctKey: "A",
      slot: "Whom · people as object",
      teach: "The committee invited the historian, so the relative is an object: whom. Common trap: which."
    },
    {
      title: "Demo 5",
      stem: "(A) The botanist (B) which discovered (C) the orchid (D) teaches here.",
      options: [
        { key: "A", text: "The botanist" },
        { key: "B", text: "which discovered" },
        { key: "C", text: "the orchid" },
        { key: "D", text: "teaches here" }
      ],
      correctKey: "B",
      slot: "Error ID · who, not which",
      teach: "Which discovered is incorrect for a person. Use who discovered. Common trap: hunting teaches here."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The chemist ____ designed the protocol presented the findings on Friday.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "which" },
        { key: "C", text: "whom" },
        { key: "D", text: "whose" }
      ],
      correctKey: "A",
      slot: "Who · people as subject",
      explain: "Chemist is a person and designed the protocol, so who is required."
    },
    {
      id: "Q02",
      stem: "The instrument ____ failed during the trial has been replaced.",
      options: [
        { key: "A", text: "which" },
        { key: "B", text: "who" },
        { key: "C", text: "whom" },
        { key: "D", text: "whose" }
      ],
      correctKey: "A",
      slot: "Which · things",
      explain: "Instrument is a thing, so which is required, not who."
    },
    {
      id: "Q03",
      stem: "The geologist ____ maps guided the expedition taught at the university.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whose" },
        { key: "C", text: "whom" },
        { key: "D", text: "which" }
      ],
      correctKey: "B",
      slot: "Whose · possession",
      explain: "The maps belong to the geologist, so whose is required."
    },
    {
      id: "Q04",
      stem: "The lecturer ____ the dean invited specializes in ancient irrigation.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "whose" },
        { key: "D", text: "which" }
      ],
      correctKey: "B",
      slot: "Whom · people as object",
      explain: "The dean invited the lecturer, so the relative is an object: whom."
    },
    {
      id: "Q05",
      stem: "The laboratory ____ the samples are stored stays locked at night.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "where" },
        { key: "D", text: "whose" }
      ],
      correctKey: "C",
      slot: "Where · place",
      explain: "Laboratory is a place, so where is required. Who/whom are for people."
    },
    {
      id: "Q06",
      stem: "1969 was the year ____ the first cores reached the laboratory.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "when" },
        { key: "D", text: "whose" }
      ],
      correctKey: "C",
      slot: "When · time",
      explain: "Year is a time noun, so when is required."
    },
    {
      id: "Q07",
      stem: "The archive ____ catalogs were digitized opened to the public last spring.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "which" },
        { key: "C", text: "whom" },
        { key: "D", text: "whose" }
      ],
      correctKey: "D",
      slot: "Whose · possession (thing)",
      explain: "The catalogs belong to the archive, so whose is required even though archive is a thing."
    },
    {
      id: "Q08",
      stem: "The students ____ the professor selected will join the excavation.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whose" },
        { key: "C", text: "which" },
        { key: "D", text: "whom" }
      ],
      correctKey: "D",
      slot: "Whom · people as object",
      explain: "The professor selected the students, so whom is the object relative."
    },
    {
      id: "Q09",
      stem: "(A) The botanist (B) which discovered (C) the orchid (D) teaches here.",
      options: [
        { key: "A", text: "The botanist" },
        { key: "B", text: "which discovered" },
        { key: "C", text: "the orchid" },
        { key: "D", text: "teaches here" }
      ],
      correctKey: "B",
      slot: "Error ID · who, not which",
      explain: "Which discovered is incorrect for a person. Use who discovered."
    },
    {
      id: "Q10",
      stem: "The engineers ____ designed the dam inspected the site after the flood.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "which" },
        { key: "C", text: "whom" },
        { key: "D", text: "whose" }
      ],
      correctKey: "A",
      slot: "Who · people as subject",
      explain: "Engineers is a person-noun and designed the dam, so who is required."
    },
    {
      id: "Q11",
      stem: "The chamber ____ the reaction occurs is sealed during the trial.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whom" },
        { key: "C", text: "in which" },
        { key: "D", text: "whose" }
      ],
      correctKey: "C",
      slot: "Preposition + which",
      explain: "The reaction occurs in the chamber, so in which is required. Who/whom are for people."
    },
    {
      id: "Q12",
      stem: "The theory ____ the paper defends is still debated by historians.",
      options: [
        { key: "A", text: "what" },
        { key: "B", text: "who" },
        { key: "C", text: "whose" },
        { key: "D", text: "which" }
      ],
      correctKey: "D",
      slot: "Which, not what",
      explain: "Theory is already in the sentence, so which is the relative. What does not modify a noun that is already named."
    },
    {
      id: "Q13",
      stem: "The glacier (A) which it retreated (B) last century (C) is now (D) a lake.",
      options: [
        { key: "A", text: "which it retreated" },
        { key: "B", text: "last century" },
        { key: "C", text: "is now" },
        { key: "D", text: "a lake" }
      ],
      correctKey: "A",
      slot: "Error ID · no double subject",
      explain: "Which it retreated has two subjects. Use which retreated."
    },
    {
      id: "Q14",
      stem: "The campus ____ library flooded last spring has now reopened.",
      options: [
        { key: "A", text: "who" },
        { key: "B", text: "whose" },
        { key: "C", text: "whom" },
        { key: "D", text: "which" }
      ],
      correctKey: "B",
      slot: "Whose · possession (thing)",
      explain: "The library belongs to the campus, so whose is required."
    },
    {
      id: "Q15",
      stem: "(A) Last year (B) the chemist (C) whom designed the assay (D) received an award.",
      options: [
        { key: "A", text: "Last year" },
        { key: "B", text: "the chemist" },
        { key: "C", text: "whom designed the assay" },
        { key: "D", text: "received an award" }
      ],
      correctKey: "C",
      slot: "Error ID · who, not whom (subject)",
      explain: "The chemist designed the assay, so the relative is a subject. Use who designed, not whom designed."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Who / whom (people)", ids: ["Q01", "Q04", "Q08", "Q09", "Q10", "Q15"] },
    { label: "Which / what / double subject", ids: ["Q02", "Q12", "Q13"] },
    { label: "Whose", ids: ["Q03", "Q07", "Q14"] },
    { label: "Where / when / in which", ids: ["Q05", "Q06", "Q11"] }
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
