/**
 * Shared Structure helpers — Error Identification display (ITP-style underlines).
 * Bank items store markers as "phrase (A) phrase (B) …"; render as four clear chunks.
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
    return /\(A\)[\s\S]*\(B\)[\s\S]*\(C\)[\s\S]*\(D\)/.test(String(questionText || ""));
  }

  /**
   * Parse "… (A) … (B) … (C) … (D) …" into four labeled segments + trailing text.
   * Letter comes AFTER the phrase it labels (prep-book convention).
   */
  function parseErrorSegments(questionText) {
    const text = String(questionText ?? "");
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
      return null;
    }

    const segments = [];
    let cursor = 0;
    for (const marker of markers) {
      const raw = text.slice(cursor, marker.index);
      segments.push({
        letter: marker.letter,
        text: raw.trim(),
      });
      cursor = marker.end;
    }

    return {
      segments,
      trailing: text.slice(cursor).trim(),
    };
  }

  /**
   * Convert parenthetical markers into underlined A–D chunks (exam look).
   * Sentence Completion and plain text pass through escaped only.
   */
  function formatStructureQuestionHtml(questionText, type) {
    const text = String(questionText ?? "");
    if (!text) return "";

    if (!isErrorIdentification(type, text)) {
      return escapeHtml(text);
    }

    const parsed = parseErrorSegments(text);
    if (!parsed) return escapeHtml(text);

    const chunks = parsed.segments
      .filter((seg) => seg.text)
      .map(
        (seg) =>
          `<span class="error-id-chunk" data-choice="${seg.letter}">` +
          `<span class="error-id-text">${escapeHtml(seg.text)}</span>` +
          `<span class="error-id-letter">${seg.letter}</span>` +
          `</span>`
      )
      .join("");

    // Keep trailing text / final period outside the last underline
    let ending = "";
    const trail = parsed.trailing;
    if (!trail || trail === ".") {
      ending = `<span class="error-id-end">.</span>`;
    } else {
      ending = `<span class="error-id-trail"> ${escapeHtml(trail)}</span>`;
    }

    return `<span class="error-id-sentence">${chunks}${ending}</span>`;
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
    parseErrorSegments,
    formatStructureQuestionHtml,
    setStructureQuestion,
  };
})(window);
