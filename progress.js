/**
 * Practice progress — Phase 3
 * Saves guided Structure sessions on this device (localStorage).
 * No accounts. No store. Teacher class materials only.
 */

(function (global) {
  const STORAGE_KEY = "toefl-itp-boost.progress.v1";
  const MAX_SESSIONS = 40;

  function emptyState() {
    return {
      version: 1,
      structureSessions: [],
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.structureSessions)) return emptyState();
      return data;
    } catch {
      return emptyState();
    }
  }

  function save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function normalizeSkill(skill) {
    const lower = String(skill || "")
      .toLowerCase()
      .trim()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ");

    const names = {
      "subject verb agreement": "Subject-Verb Agreement",
      "subject-verb agreement": "Subject-Verb Agreement",
      "verb tense": "Verb Tenses",
      "verb tenses": "Verb Tenses",
      "verb forms": "Verb Tenses",
      "passive voice": "Passive Voice",
      "adjective clauses": "Adjective Clauses",
      "relative clauses": "Adjective Clauses",
      "noun clauses": "Noun Clauses",
      inversion: "Inversions",
      inversions: "Inversions",
      "parallel structure": "Parallel Structure",
      "gerunds and infinitives": "Gerunds and Infinitives",
      prepositions: "Prepositions",
      comparisons: "Comparatives",
      comparatives: "Comparatives",
      "comparatives and superlatives": "Comparatives",
      "word forms": "Word Forms",
      conditionals: "Conditionals",
      modals: "Modals",
      subjunctive: "Subjunctive",
      articles: "Articles",
      "article usage": "Articles",
      "articles and determiners": "Articles",
      "reduced adjective clauses": "Reduced Clauses",
      "reduced clauses": "Reduced Clauses",
      connectors: "Connectors",
      "mixed advanced": "Mixed Advanced",
    };

    if (names[lower]) return names[lower];

    return String(skill || "Other")
      .split(/[\s_-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

  /**
   * @param {object} session
   * @param {string} session.section - e.g. structure
   * @param {string} session.mode - e.g. guided
   * @param {number} session.correct
   * @param {number} session.total
   * @param {Array<{skill:string, subskill?:string, correct:boolean}>} session.items
   * @param {string[]} [session.questionIds]
   */
  function recordStructureSession(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

    const skillMap = {};
    const mistakes = [];

    (session.items || []).forEach((entry) => {
      const skill = normalizeSkill(entry.skill);
      if (!skillMap[skill]) skillMap[skill] = { correct: 0, total: 0 };
      skillMap[skill].total += 1;
      if (entry.correct) skillMap[skill].correct += 1;
      else {
        mistakes.push({
          skill,
          subskill: entry.subskill || "",
          questionId: entry.questionId || "",
          prompt: entry.prompt || "",
        });
      }
    });

    const record = {
      id: `str-${Date.now()}`,
      section: "structure",
      mode: session.mode || "guided",
      at: new Date().toISOString(),
      correct,
      total,
      percent,
      skills: skillMap,
      mistakes,
      questionIds: session.questionIds || [],
    };

    state.structureSessions.unshift(record);
    if (state.structureSessions.length > MAX_SESSIONS) {
      state.structureSessions = state.structureSessions.slice(0, MAX_SESSIONS);
    }
    save(state);
    return record;
  }

  function getStructureSessions() {
    return load().structureSessions;
  }

  function getSkillTotals() {
    const totals = {};
    getStructureSessions().forEach((session) => {
      Object.entries(session.skills || {}).forEach(([skill, row]) => {
        if (!totals[skill]) totals[skill] = { correct: 0, total: 0 };
        totals[skill].correct += row.correct || 0;
        totals[skill].total += row.total || 0;
      });
    });
    return totals;
  }

  function skillStatus(correct, total) {
    if (!total) return { label: "Not practiced", width: 0 };
    const pct = Math.round((correct / total) * 100);
    if (pct >= 80) return { label: "Strong", width: pct };
    if (pct >= 60) return { label: "Stable", width: pct };
    if (pct >= 40) return { label: "Review", width: pct };
    return { label: "Needs work", width: Math.max(pct, 12) };
  }

  function getTopSkills(limit = 4) {
    const totals = getSkillTotals();
    return Object.entries(totals)
      .map(([skill, row]) => {
        const status = skillStatus(row.correct, row.total);
        return {
          skill,
          correct: row.correct,
          total: row.total,
          percent: row.total ? Math.round((row.correct / row.total) * 100) : 0,
          label: status.label,
          width: status.width,
        };
      })
      .sort((a, b) => {
        // weakest first for study focus
        if (a.percent !== b.percent) return a.percent - b.percent;
        return b.total - a.total;
      })
      .slice(0, limit);
  }

  function getRecentMistakes(limit = 5) {
    const seen = new Set();
    const list = [];
    getStructureSessions().forEach((session) => {
      (session.mistakes || []).forEach((m) => {
        const key = `${m.skill}|${m.subskill}|${m.questionId || m.prompt}`;
        if (seen.has(key)) return;
        seen.add(key);
        list.push(m);
      });
    });
    return list.slice(0, limit);
  }

  function dayKey(iso) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  }

  function getStreakDays() {
    const days = [
      ...new Set(getStructureSessions().map((s) => dayKey(s.at)).filter(Boolean)),
    ].sort()
      .reverse();

    if (!days.length) return 0;

    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = yesterday.toISOString().slice(0, 10);

    if (days[0] !== todayKey && days[0] !== yKey) return 0;

    let streak = 1;
    let cursor = new Date(days[0] + "T12:00:00");

    for (let i = 1; i < days.length; i += 1) {
      cursor.setDate(cursor.getDate() - 1);
      const expected = cursor.toISOString().slice(0, 10);
      if (days[i] === expected) streak += 1;
      else break;
    }
    return streak;
  }

  function getSummary() {
    const sessions = getStructureSessions();
    const sessionCount = sessions.length;
    const questionsAttempted = sessions.reduce((sum, s) => sum + (s.total || 0), 0);
    const questionsCorrect = sessions.reduce((sum, s) => sum + (s.correct || 0), 0);
    const last = sessions[0] || null;
    const avg =
      sessionCount > 0
        ? Math.round(
            sessions.reduce((sum, s) => sum + (s.percent || 0), 0) / sessionCount
          )
        : null;

    let readiness = { label: "Not started", width: 8, note: "Complete a Structure guided drill to build your baseline." };
    if (sessionCount >= 1 && (avg ?? 0) < 60) {
      readiness = {
        label: "Building",
        width: 35,
        note: "Keep guided practice going. Focus on the weak skills below.",
      };
    } else if (sessionCount >= 2 && (avg ?? 0) >= 60 && (avg ?? 0) < 80) {
      readiness = {
        label: "On track",
        width: 62,
        note: "Solid progress. One more strong drill before timed mocks (coming next).",
      };
    } else if (sessionCount >= 3 && (avg ?? 0) >= 80) {
      readiness = {
        label: "Almost ready",
        width: 82,
        note: "Strong Structure sessions. Timed mock exams are the next phase.",
      };
    } else if (sessionCount >= 1) {
      readiness = {
        label: "In progress",
        width: 48,
        note: "Baseline started. Review mistakes and run another 15-question drill.",
      };
    }

    const weak = getTopSkills(1)[0];
    return {
      sessionCount,
      questionsAttempted,
      questionsCorrect,
      averagePercent: avg,
      streakDays: getStreakDays(),
      last,
      readiness,
      focusSkill: weak
        ? weak.skill
        : "Subject-Verb Agreement",
      focusNote: weak
        ? `Your weakest practiced skill so far is ${weak.skill} (${weak.percent}%).`
        : "Start guided practice to discover which patterns need work.",
      skills: getTopSkills(4),
      recentMistakes: getRecentMistakes(5),
    };
  }

  function clearProgress() {
    localStorage.removeItem(STORAGE_KEY);
  }

  global.ToeflProgress = {
    normalizeSkill,
    recordStructureSession,
    getStructureSessions,
    getSkillTotals,
    getTopSkills,
    getRecentMistakes,
    getStreakDays,
    getSummary,
    clearProgress,
    load,
  };
})(window);
