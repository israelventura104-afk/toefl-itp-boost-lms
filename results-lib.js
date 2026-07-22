/**
 * Calm results UI — shared across guided / mock / full / demo.
 * Students: score + where they missed.
 * Study focus: what to practice next (weak skills).
 */
(function (global) {
  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function scoreNote(percent) {
    if (percent >= 80) return "Strong session";
    if (percent >= 60) return "Good base — study the focus below";
    return "Needs review — start with the focus below";
  }

  /**
   * @param {Array<{ skill: string, correct: boolean }>} rows
   * @param {number} [limit=3]
   */
  function buildStudyFocus(rows, limit) {
    const cap = limit == null ? 3 : limit;
    const map = new Map();
    (rows || []).forEach((row) => {
      const skill = String(row.skill || "General").trim() || "General";
      if (!map.has(skill)) {
        map.set(skill, { skill, correct: 0, total: 0, wrong: 0 });
      }
      const entry = map.get(skill);
      entry.total += 1;
      if (row.correct) entry.correct += 1;
      else entry.wrong += 1;
    });
    return [...map.values()]
      .filter((entry) => entry.wrong > 0)
      .sort(
        (a, b) =>
          b.wrong - a.wrong || a.correct / a.total - b.correct / b.total
      )
      .slice(0, cap);
  }

  function renderStudyFocusHtml(focusList) {
    if (!focusList || !focusList.length) {
      return `
        <div class="result-study is-clear">
          <p class="eyebrow">What to study</p>
          <p class="result-study-line"><strong>Nothing urgent.</strong> Clean score — keep one light practice warm.</p>
        </div>`;
    }
    return `
      <div class="result-study">
        <p class="eyebrow">What to study next</p>
        <ul class="result-study-list">
          ${focusList
            .map(
              (item) => `
            <li>
              <strong>${escapeHtml(item.skill)}</strong>
              <span>${item.wrong} miss${item.wrong === 1 ? "" : "es"}</span>
            </li>`
            )
            .join("")}
        </ul>
      </div>`;
  }

  /**
   * @param {Array<{
   *   tag?: string,
   *   stem?: string,
   *   stemHtml?: string,
   *   yours?: string,
   *   correct?: string,
   *   explanation?: string,
   *   trap?: string
   * }>} mistakes
   */
  function renderMistakesHtml(mistakes) {
    const list = mistakes || [];
    if (!list.length) {
      return `
        <div class="empty-review">
          <strong>No mistakes.</strong>
          <p>You knew where the answers were. Nice work.</p>
        </div>`;
    }

    return `
      <div class="result-misses-head">
        <p class="eyebrow">Where you missed</p>
        <strong>${list.length} mistake${list.length === 1 ? "" : "s"}</strong>
      </div>
      <div class="result-miss-list">
        ${list
          .map((m, index) => {
            const stem =
              m.stemHtml != null
                ? m.stemHtml
                : escapeHtml(m.stem || "");
            const why =
              m.explanation || m.trap
                ? `
            <details class="result-miss-why">
              <summary>Why</summary>
              ${
                m.explanation
                  ? `<p>${escapeHtml(m.explanation)}</p>`
                  : ""
              }
              ${
                m.trap
                  ? `<p class="result-miss-trap">Common trap: ${escapeHtml(
                      m.trap
                    )}</p>`
                  : ""
              }
            </details>`
                : "";
            return `
          <article class="result-miss">
            <div class="result-miss-top">
              <span class="result-miss-num">${index + 1}</span>
              <span class="result-miss-tag">${escapeHtml(m.tag || "")}</span>
            </div>
            <div class="result-miss-stem">${stem}</div>
            <p class="result-miss-keys">
              You: <b>${escapeHtml(m.yours || "—")}</b>
              · Correct: <b>${escapeHtml(m.correct || "—")}</b>
            </p>
            ${why}
          </article>`;
          })
          .join("")}
      </div>`;
  }

  function setText(el, value) {
    if (el) el.textContent = value == null ? "" : String(value);
  }

  /**
   * Fill score hero + study + mistakes in a results panel.
   * @param {object} opts
   */
  function paint(opts) {
    const {
      scoreEl,
      noteEl,
      messageEl,
      metaEl,
      studyEl,
      mistakesEl,
      correct,
      total,
      message,
      meta,
      studyRows,
      mistakes,
      studyLimit,
    } = opts;

    const percent = total ? Math.round((correct / total) * 100) : 0;
    setText(scoreEl, `${correct}/${total}`);
    setText(noteEl, scoreNote(percent));
    if (messageEl) {
      // Keep message short — prefer study focus over long coaching paragraphs
      setText(messageEl, message || "");
      if (messageEl.closest) {
        const wrap = messageEl.closest(".results-hero-copy") || messageEl.parentElement;
        if (wrap && !message) {
          messageEl.hidden = true;
        } else if (messageEl) {
          messageEl.hidden = !message;
        }
      }
    }
    if (metaEl) {
      setText(metaEl, meta || "");
      metaEl.hidden = !meta;
    }

    if (studyEl) {
      const focus = buildStudyFocus(studyRows || [], studyLimit);
      studyEl.innerHTML = renderStudyFocusHtml(focus);
    }
    if (mistakesEl) {
      mistakesEl.innerHTML = renderMistakesHtml(mistakes || []);
    }

    return percent;
  }

  global.ResultsLib = {
    escapeHtml,
    scoreNote,
    buildStudyFocus,
    renderStudyFocusHtml,
    renderMistakesHtml,
    paint,
  };
})(window);
