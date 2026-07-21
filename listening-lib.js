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

  function normalizeItem(entry, raw) {
    const questions = (raw.questions || []).map((q, index) => {
      const options = (q.choices || q.options || []).map((c) => ({
        key: String(c.id ?? c.key ?? "").trim(),
        text: String(c.text ?? "").trim(),
      }));
      const correctKey = String(q.answer_key ?? q.correctKey ?? "").trim();
      const hit = options.find((o) => o.key === correctKey);
      return {
        id: String(q.id || `${entry.id}-Q${index + 1}`),
        prompt: q.prompt || q.question || "",
        options,
        correctKey,
        correctAnswer: hit?.text || correctKey,
        explanation: q.explanation || "",
        evidence: q.evidence || "",
      };
    });

    return {
      id: entry.id || raw.asset_id,
      assetType: raw.asset_type || entry.asset_type || "Part A",
      topic: (raw.metadata && raw.metadata.topic) || entry.topic || "",
      difficulty: (raw.metadata && raw.metadata.difficulty) || entry.difficulty || "",
      audio: entry.audio,
      narratorIntro: raw.transcript?.narrator_intro || "",
      questionIntro: raw.transcript?.question_intro || "",
      dialogue: raw.transcript?.dialogue || [],
      questions,
    };
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
    fetchJson,
  };
})(window);
