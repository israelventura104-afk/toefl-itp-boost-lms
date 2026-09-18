/**
 * Shared Listening loaders — Phase 6
 */

(function (global) {
  const BANK_URL = "data/listening-bank.json";
  const INTRO_URL = "data/listening-intro.json";

  function normalizeSkill(skill) {
    if (global.ToeflProgress?.normalizeSkill) {
      return global.ToeflProgress.normalizeSkill(skill);
    }
    return skill || "Listening";
  }

  function normalizeOptions(rawOptions) {
    if (!rawOptions) return [];
    if (Array.isArray(rawOptions)) {
      return rawOptions
        .map((choice) => {
          if (typeof choice === "string") {
            return { key: String(choice).trim().toUpperCase(), text: choice };
          }
          return {
            key: String(choice.id ?? choice.key ?? "").trim().toUpperCase(),
            text: String(choice.text ?? choice.label ?? "").trim(),
          };
        })
        .filter((option) => option.key && option.text);
    }
    if (typeof rawOptions === "object") {
      return Object.entries(rawOptions)
        .map(([key, text]) => ({
          key: String(key).trim().toUpperCase(),
          text: String(text ?? "").trim(),
        }))
        .filter((option) => option.key && option.text);
    }
    return [];
  }

  function normalizeItem(entry, raw) {
    const questions = (raw.questions || [])
      .map((q, index) => {
        const options = normalizeOptions(q.choices || q.options);
        const correctKey = String(q.answer_key ?? q.correctKey ?? q.correct_answer ?? "")
          .trim()
          .toUpperCase();
        const hit = options.find((o) => o.key === correctKey);
        // Always prefix with asset id: bank items reuse "Q1" on every Part A clip,
        // which would otherwise collapse answers across the whole guided/mock set.
        const localId = String(q.id || q.number || `Q${index + 1}`).trim() || `Q${index + 1}`;
        return {
          id: `${entry.id}-${localId}`,
          prompt: q.prompt || q.question || q.narrator_text || q.question_text || "",
          options,
          correctKey,
          correctAnswer: hit?.text || correctKey,
          explanation: q.explanation || "",
          evidence: q.evidence || "",
          skill: q.question_type || q.skill_tested || "",
        };
      })
      .filter((q) => q.prompt && q.options.length && q.correctKey);

    const transcript = raw.transcript || {};
    const assetType =
      raw.asset_type ||
      entry.asset_type ||
      raw.section ||
      (questions.length > 1 ? "Part B - Long Conversation" : "Part A");

    return {
      id: entry.id || raw.asset_id,
      assetType,
      topic: (raw.metadata && raw.metadata.topic) || raw.topic || entry.topic || "",
      difficulty: (raw.metadata && raw.metadata.difficulty) || entry.difficulty || "",
      audio: entry.audio,
      narratorIntro: transcript.narrator_intro || raw.narrator_intro || "",
      questionIntro: transcript.question_intro || raw.narrator_outro || "",
      dialogue: transcript.dialogue || raw.dialogue || [],
      questions,
    };
  }

  function isLongForm(item) {
    const type = String(item.assetType || "").toLowerCase();
    return (
      type.includes("part b") ||
      type.includes("part c") ||
      type.includes("long") ||
      type.includes("talk") ||
      (item.questions || []).length > 1
    );
  }

  /**
   * Keep long conversations whole. Part A first, then Part B (ITP order).
   * Fills leftover slots with short conversations if fewer Part B items exist.
   */
  function pickMixedItems(items, { targetQuestions, partBConversations } = {}) {
    const goal = Math.max(1, Number(targetQuestions) || 10);
    const wantB = Math.max(0, Number(partBConversations) || 0);
    const partA = shuffle(items.filter((item) => !isLongForm(item)));
    const partB = shuffle(items.filter(isLongForm));
    const pickedB = [];
    let fromB = 0;
    partB.forEach((item) => {
      if (pickedB.length >= wantB) return;
      const n = item.questions.length;
      if (!n || fromB + n > goal) return;
      pickedB.push(item);
      fromB += n;
    });
    const needA = Math.max(0, goal - fromB);
    const pickedA = partA.slice(0, needA);
    return [...pickedA, ...pickedB];
  }

  function buildMixedRows(items, spec) {
    return flattenRows(pickMixedItems(items, spec));
  }

  async function fetchJson(url) {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Could not load ${url} (${res.status})`);
    return res.json();
  }

  async function loadBankEntries() {
    const bank = await fetchJson(BANK_URL);
    return (bank.items || []).filter((item) => item.ready_for_practice && item.audio);
  }

  async function loadIntroIds() {
    try {
      const intro = await fetchJson(INTRO_URL);
      return new Set(intro.item_ids || []);
    } catch {
      return new Set(["LIST-0001", "LIST-0002", "LIST-0003"]);
    }
  }

  async function hydrateEntries(entries) {
    const items = [];
    for (const entry of entries) {
      const raw = await fetchJson(entry.data);
      const item = normalizeItem(entry, raw);
      if (item.questions.length && item.audio) items.push(item);
    }
    return items;
  }

  async function loadIntroItems() {
    const [bank, introIds] = await Promise.all([loadBankEntries(), loadIntroIds()]);
    const ordered = [...introIds]
      .map((id) => bank.find((entry) => entry.id === id))
      .filter(Boolean);
    // Fallback first 3 bank items if intro ids missing from ready bank
    const list = ordered.length ? ordered : bank.slice(0, 3);
    return hydrateEntries(list);
  }

  async function loadClassItems({ excludeIntro = true } = {}) {
    const [bank, introIds] = await Promise.all([loadBankEntries(), loadIntroIds()]);
    const filtered = excludeIntro
      ? bank.filter((entry) => !introIds.has(entry.id))
      : bank;
    return hydrateEntries(filtered);
  }

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /** Flatten item.questions into practice rows: one audio clip per question (usually 1). */
  function flattenRows(items) {
    const rows = [];
    items.forEach((item) => {
      item.questions.forEach((question) => {
        rows.push({ item, question });
      });
    });
    return rows;
  }

  global.ListeningLib = {
    normalizeSkill,
    loadIntroItems,
    loadClassItems,
    shuffle,
    flattenRows,
    isLongForm,
    pickMixedItems,
    buildMixedRows,
    fetchJson,
  };
})(window);
