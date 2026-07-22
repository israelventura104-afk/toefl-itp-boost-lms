/**
 * Shared Structure helpers — Error Identification display (ITP-style underlines).
 * Bank items store markers as "(A) … (B) … (C) … (D)"; render as underlined chunks.
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

  function isErrorIdentification(type, questionText) {
    const t = String(type || "").toLowerCase();
    if (t.includes("error") || t.includes("written")) return true;
    // Fallback: classic ABCD parenthetical markers in stem
    return /\(A\)[\s\S]*\(B\)[\s\S]*\(C\)[\s\S]*\(D\)/.test(String(questionText || ""));
  }

  /**
   * Convert "… (A) … (B) … (C) … (D)…" into underlined A–D segments.
   * Each letter sits under its underlined phrase (exam look).
   * Sentence Completion and plain text pass through escaped only.
   */
  function formatStructureQuestionHtml(questionText, type) {
    const text = String(questionText ?? "");
    if (!text) return "";

    if (!isErrorIdentification(type, text)) {
      return escapeHtml(text);
    }

    const markerRe = /\(([A-D])\)/g;
    const markers = [];
    let match;
    while ((match = markerRe.exec(text))) {
      markers.push({
        letter: match[1],
        index: match.index,
        end: match.index + match[0].length,
      });
    }

    if (
      markers.length !== 4 ||
      markers.map((m) => m.letter).join("") !== "ABCD"
    ) {
      return escapeHtml(text);
    }

    let html = "";
    let cursor = 0;

    for (const marker of markers) {
      const raw = text.slice(cursor, marker.index);
      const content = raw.trim();
      const start = content ? raw.indexOf(content) : raw.length;
      const end = start + content.length;

      html += escapeHtml(raw.slice(0, start));
      if (content) {
        html +=
          `<span class="error-id-chunk" data-choice="${marker.letter}">` +
          `<span class="error-id-text">${escapeHtml(content)}</span>` +
          `<span class="error-id-letter" aria-hidden="true">${marker.letter}</span>` +
          `</span>`;
      }
      html += escapeHtml(raw.slice(end));
      cursor = marker.end;
    }

    html += escapeHtml(text.slice(cursor));
    return html;
  }

  function setStructureQuestion(el, questionText, type) {
    if (!el) return;
    el.innerHTML = formatStructureQuestionHtml(questionText, type);
    el.classList.toggle(
      "is-error-identification",
      isErrorIdentification(type, questionText)
    );
  }

  global.StructureLib = {
    escapeHtml,
    isErrorIdentification,
    formatStructureQuestionHtml,
    setStructureQuestion,
  };
})(window);
