(() => {
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

  function isEiItem(item) {
    const stem = String(item?.stem || "");
    const slot = String(item?.slot || "");
    const title = String(item?.title || "");
    if (/\(A\)/.test(stem) && /\(B\)/.test(stem) && /\(C\)/.test(stem) && /\(D\)/.test(stem)) return true;
    if (/error\s*id/i.test(slot) || /error\s*id/i.test(title)) return true;
    return false;
  }

  function eiAffixes(item) {
    const stem = String(item.stem || "");
    const optA = String(item.options?.[0]?.text || "").trim();
    const optD = String(item.options?.[item.options.length - 1]?.text || "").trim();
    const iA = stem.indexOf("(A)");
    const iD = stem.lastIndexOf("(D)");
    let prefix = "";
    if (iA > 0) {
      const before = stem.slice(0, iA).trim();
      if (before && before !== optA && !before.endsWith(optA) && !optA.startsWith(before)) {
        prefix = before;
      }
    }
    let suffix = "";
    if (iD >= 0) {
      const after = stem.slice(iD + 3).trim().replace(/\.+$/, "");
      if (after && after !== optD && !optD.endsWith(after) && !after.startsWith(optD)) {
        suffix = after;
      }
    }
    return { prefix, suffix };
  }

  function renderEiLine(item, selected, { locked = false, showKey = false } = {}) {
    const { prefix, suffix } = eiAffixes(item);
    const chunks = item.options.map((opt) => {
      const classes = ["ei-chunk"];
      if (selected === opt.key) classes.push("selected");
      if (showKey && opt.key === item.correctKey) classes.push("correct");
      if (showKey && selected === opt.key && selected !== item.correctKey) classes.push("miss");
      return `<button type="button" class="${classes.join(" ")}" data-key="${escapeHtml(opt.key)}" ${locked ? "disabled" : ""}>
        <span class="ei-words">${escapeHtml(opt.text)}</span>
        <span class="ei-lab">${escapeHtml(opt.key)}</span>
      </button>`;
    }).join("");
    const lead = prefix ? `<span class="ei-plain">${escapeHtml(prefix)} </span>` : "";
    const tail = suffix ? `<span class="ei-plain"> ${escapeHtml(suffix)}</span>` : "";
    return `<p class="ei-line">${lead}${chunks}${tail}.</p>`;
  }

  function renderChoiceButtons(item, selected, { locked = false, showKey = false } = {}) {
    const ok = selected === item.correctKey;
    return `<div class="options">${item.options.map((opt) => {
      const classes = ["opt"];
      if (selected === opt.key) classes.push("selected");
      if (showKey && opt.key === item.correctKey) classes.push("correct");
      if (showKey && selected === opt.key && !ok) classes.push("miss");
      return `<button type="button" class="${classes.join(" ")}" data-key="${escapeHtml(opt.key)}" ${locked ? "disabled" : ""}>
        <span class="key">${escapeHtml(opt.key)}</span><span>${escapeHtml(opt.text)}</span>
      </button>`;
    }).join("")}</div>`;
  }

  function bindChoices(root, onPick) {
    root.querySelectorAll(".ei-chunk, .opt").forEach((btn) => {
      btn.addEventListener("click", () => onPick(btn.getAttribute("data-key")));
    });
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
      const ei = isEiItem(item);
      demoMeta.textContent = ei
        ? `Demo ${demoIndex + 1} of ${demos.length} · tap the underlined part, then See feedback`
        : `Demo ${demoIndex + 1} of ${demos.length} · pick one, then See feedback`;
      demoProgress.style.width = `${((demoIndex + 1) / demos.length) * 100}%`;
      const verdict = ei
        ? (ok
          ? `Correct · ${escapeHtml(slotLabel)}: ${escapeHtml(item.slot)} · change “${escapeHtml(right?.text || "")}”`
          : `Not this time · ${escapeHtml(slotLabel)}: change “${escapeHtml(right?.text || "")}”`)
        : (ok
          ? `Correct · ${escapeHtml(slotLabel)}: ${escapeHtml(item.slot)} · ${escapeHtml(item.correctKey)}. ${escapeHtml(right?.text || "")}`
          : `Not this time · ${escapeHtml(slotLabel)}: ${escapeHtml(item.slot)} · answer ${escapeHtml(item.correctKey)}. ${escapeHtml(right?.text || "")}`);
      const body = ei
        ? `${renderEiLine(item, selected, { locked: opened, showKey: opened })}
      <p class="ei-hint">Tap the underlined part that must change.</p>`
        : `<p class="stem">${formatStem(item.stem)}</p>
      ${renderChoiceButtons(item, selected, { locked: opened, showKey: opened })}`;
      demoStage.innerHTML = `
      <h3 style="margin:0 0 8px;color:var(--navy);font-size:1.05rem">${escapeHtml(item.title)}</h3>
      ${body}
      <p class="status" id="demo-hint" hidden>${ei ? "Tap an underlined part first." : "Choose A, B, C, or D first."}</p>
      <div class="teach-box ${ok ? "ok" : "bad"}" id="demo-teach" ${opened ? "" : "hidden"}>
        <strong>${verdict}</strong>
        <p style="margin:8px 0 0">${escapeHtml(item.teach)}</p>
      </div>`;
      bindChoices(demoStage, (key) => {
        if (demoOpened.has(demoIndex)) return;
        demoAnswers.set(demoIndex, key);
        const hint = document.getElementById("demo-hint");
        if (hint) hint.hidden = true;
        renderDemo();
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
      const ei = isEiItem(practice[qIndex]);
      practiceStatus.hidden = false;
      practiceStatus.textContent = n === 15
        ? "All 15 answered. Submit when ready — no scores until then."
        : `Answered ${n} of 15. One question per screen.`;
      const answered = answers.has(practice[qIndex].id);
      practiceProgress.style.width = `${((qIndex + 1) / practice.length) * 100}%`;
      practiceMeta.textContent = `Question ${qIndex + 1} of ${practice.length}` + (answered ? (ei ? " · underlined part selected" : " · selected") : "");
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
      const ei = isEiItem(item);
      practiceStage.innerHTML = ei
        ? `${renderEiLine(item, selected, { locked: submitted, showKey: submitted })}
      <p class="ei-hint">Tap the underlined part that must change.</p>`
        : `<p class="stem">${formatStem(item.stem)}</p>
      ${renderChoiceButtons(item, selected, { locked: submitted, showKey: submitted })}`;
      bindChoices(practiceStage, (key) => {
        if (submitted) return;
        answers.set(item.id, key);
        renderPractice();
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
      if (patternGroups && patternGroups.length) {
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
      } else {
        balanceNote.textContent = `Correct-letter balance: A×${counts.A} · B×${counts.B} · C×${counts.C} · D×${counts.D}.`;
      }
      reviewList.innerHTML = review.map(({ index, item, chosen, chosenText, rightText, ok }) => {
        const ei = isEiItem(item);
        const body = ei
          ? `${renderEiLine(item, chosen, { locked: true, showKey: true })}
        <p>You tapped: <strong>${escapeHtml(chosenText)}</strong></p>
        <p>Must change: <strong>${escapeHtml(rightText)}</strong></p>`
          : `<p class="stem">${formatStem(item.stem)}</p>
        <p>Yours: <strong>${escapeHtml(chosen || "—")}. ${escapeHtml(chosenText)}</strong></p>
        <p>Correct: <strong>${escapeHtml(item.correctKey)}. ${escapeHtml(rightText)}</strong></p>`;
        return `<article class="review-item ${ok ? "ok" : "bad"}">
        <h4>Q${index + 1} · ${ok ? "Correct" : "Incorrect"} · ${escapeHtml(slotLabel)}: ${escapeHtml(item.slot)}</h4>
        ${body}
        <p>${escapeHtml(item.explain)}</p>
      </article>`;
      }).join("");
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

  window.bootStrategyClass = bootStrategyClass;
})();
