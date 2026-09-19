/**
 * Shared Structure helpers — Error Identification (ITP-style).
 * Standard: sentence with four underlined chunks (A–D after each);
 * options = those phrases; feedback = "B. phrase".
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
   * Parse "phrase (A) phrase (B) phrase (C) phrase (D)".
   * Letter comes AFTER the phrase it labels.
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
      segments.push({
        letter: marker.letter,
        text: text.slice(cursor, marker.index).trim(),
      });
      cursor = marker.end;
    }

    return {
      segments,
      trailing: text.slice(cursor).trim(),
    };
  }

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
        (seg, index) =>
          (index ? " " : "") +
          `<span class="error-id-chunk" data-choice="${seg.letter}">` +
          `<span class="error-id-text">${escapeHtml(seg.text)}</span>` +
          `<span class="error-id-letter">${seg.letter}</span>` +
          `</span>`
      )
      .join("");

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

  /** Force options A–D to equal the underlined phrases. */
  function alignErrorOptions(questionText, options, type) {
    if (!isErrorIdentification(type, questionText)) {
      return Array.isArray(options) ? options : [];
    }
    const parsed = parseErrorSegments(questionText);
    if (!parsed) {
      return (options || []).map((option) => ({
        key: String(option.key || "").trim().toUpperCase(),
        text: String(option.text ?? option.key ?? "").trim(),
      }));
    }

    return parsed.segments.map((seg) => ({
      key: seg.letter,
      text: seg.text,
    }));
  }

  /** Always "B. were asked" (never letter-only or bare word without letter). */
  function formatCorrectLabel(correctKey, correctAnswer) {
    const key = String(correctKey || "").trim().toUpperCase();
    const phrase = String(correctAnswer || "").trim();
    if (key && phrase && phrase.toUpperCase() !== key) {
      return `${key}. ${phrase}`;
    }
    if (key) return key;
    return phrase;
  }

  /**
   * Normalize an Error ID item: options = chunks, correctAnswer = phrase for correctKey.
   */
  function normalizeErrorFields(questionText, type, correctKey, options, correctAnswer) {
    const key = String(correctKey || "").trim().toUpperCase();
    const aligned = alignErrorOptions(questionText, options, type);
    const hit = aligned.find((option) => option.key === key);
    const phrase =
      (hit && hit.text) ||
      (String(correctAnswer || "").trim().toUpperCase() === key
        ? ""
        : String(correctAnswer || "").trim()) ||
      key;
    return {
      options: aligned,
      correctKey: key,
      correctAnswer: phrase || key,
      correctLabel: formatCorrectLabel(key, phrase || key),
    };
  }

  global.StructureLib = {
    escapeHtml,
    isErrorIdentification,
    parseErrorSegments,
    formatStructureQuestionHtml,
    setStructureQuestion,
    alignErrorOptions,
    formatCorrectLabel,
    normalizeErrorFields,
  };
})(window);
