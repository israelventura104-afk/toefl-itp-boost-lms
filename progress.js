/**
 * Practice progress — Phases 3–5
 * Saves Structure + Reading sessions on this device (localStorage).
 * No accounts. No store. Teacher class materials only.
 */

(function (global) {
  const STORAGE_KEY = "toefl-itp-boost.progress.v1";
  const MAX_SESSIONS = 40;

  function emptyState() {
    return {
      version: 1,
      structureSessions: [],
      readingSessions: [],
      listeningSessions: [],
      fullMocks: [],
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return emptyState();
      const data = JSON.parse(raw);
      if (!data || typeof data !== "object") return emptyState();
      if (!Array.isArray(data.structureSessions)) data.structureSessions = [];
      if (!Array.isArray(data.readingSessions)) data.readingSessions = [];
      if (!Array.isArray(data.listeningSessions)) data.listeningSessions = [];
      if (!Array.isArray(data.fullMocks)) data.fullMocks = [];
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
   * @param {string} [session.mode] - guided | mock
   * @param {number} session.correct
   * @param {number} session.total
   * @param {Array<{skill:string, subskill?:string, correct:boolean}>} session.items
   * @param {string[]} [session.questionIds]
   * @param {number} [session.durationSeconds]
   * @param {boolean} [session.timedOut]
   */
  function recordStructureSession(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const mode = session.mode || "guided";

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
      mode,
      at: new Date().toISOString(),
      correct,
      total,
      percent,
      skills: skillMap,
      mistakes,
      questionIds: session.questionIds || [],
      durationSeconds:
        typeof session.durationSeconds === "number" ? session.durationSeconds : null,
      timedOut: Boolean(session.timedOut),
    };

    state.structureSessions.unshift(record);
    if (state.structureSessions.length > MAX_SESSIONS) {
      state.structureSessions = state.structureSessions.slice(0, MAX_SESSIONS);
    }
    save(state);
    return record;
  }

  function recordReadingSession(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const mode = session.mode || "guided";

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
      id: `read-${Date.now()}`,
      section: "reading",
      mode,
      at: new Date().toISOString(),
      correct,
      total,
      percent,
      skills: skillMap,
      mistakes,
      passageId: session.passageId || null,
      passageTitle: session.passageTitle || null,
      passageIds: session.passageIds || [],
      durationSeconds:
        typeof session.durationSeconds === "number" ? session.durationSeconds : null,
      timedOut: Boolean(session.timedOut),
    };

    state.readingSessions.unshift(record);
    if (state.readingSessions.length > MAX_SESSIONS) {
      state.readingSessions = state.readingSessions.slice(0, MAX_SESSIONS);
    }
    save(state);
    return record;
  }

  function getStructureSessions() {
    return load().structureSessions;
  }

  function getReadingSessions() {
    return load().readingSessions;
  }

  function recordListeningSession(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    const mode = session.mode || "guided";

    const skillMap = {};
    const mistakes = [];
    (session.items || []).forEach((entry) => {
      const skill = normalizeSkill(entry.skill || "Listening");
      if (!skillMap[skill]) skillMap[skill] = { correct: 0, total: 0 };
      skillMap[skill].total += 1;
      if (entry.correct) skillMap[skill].correct += 1;
      else {
        mistakes.push({
          skill,
          subskill: entry.subskill || "",
          questionId: entry.questionId || "",
          prompt: entry.prompt || "",
          assetId: entry.assetId || "",
        });
      }
    });

    const record = {
      id: `list-${Date.now()}`,
      section: "listening",
      mode,
      at: new Date().toISOString(),
      correct,
      total,
      percent,
      skills: skillMap,
      mistakes,
      durationSeconds:
        typeof session.durationSeconds === "number" ? session.durationSeconds : null,
      timedOut: Boolean(session.timedOut),
    };

    state.listeningSessions.unshift(record);
    if (state.listeningSessions.length > MAX_SESSIONS) {
      state.listeningSessions = state.listeningSessions.slice(0, MAX_SESSIONS);
    }
    save(state);
    return record;
  }

  function getListeningSessions() {
    return load().listeningSessions;
  }

  function recordFullMock(session) {
    const state = load();
    const total = Number(session.total) || 0;
    const correct = Number(session.correct) || 0;
    const percent =
      typeof session.percent === "number"
        ? session.percent
        : total > 0
          ? Math.round((correct / total) * 100)
          : 0;
    const record = {
      id: `full-${Date.now()}`,
      at: session.finishedAt || new Date().toISOString(),
      startedAt: session.startedAt || null,
      correct,
      total,
      percent,
      listening: session.listening || null,
      structure: session.structure || null,
      reading: session.reading || null,
    };
    state.fullMocks.unshift(record);
    if (state.fullMocks.length > MAX_SESSIONS) {
      state.fullMocks = state.fullMocks.slice(0, MAX_SESSIONS);
    }
    save(state);
    return record;
  }

  function getFullMocks() {
    return load().fullMocks;
  }

  function getSkillTotals() {
    return aggregateSkillsFromSessions(getStructureSessions());
  }

  function aggregateSkillsFromSessions(sessions) {
    const totals = {};
    (sessions || []).forEach((session) => {
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

  function rankSkills(totals, limit = 4) {
    return Object.entries(totals || {})
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
        if (a.percent !== b.percent) return a.percent - b.percent;
        return b.total - a.total;
      })
      .slice(0, limit);
  }

  function getTopSkills(limit = 4) {
    return rankSkills(getSkillTotals(), limit);
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
    const all = [
      ...getStructureSessions(),
      ...getReadingSessions(),
      ...getListeningSessions(),
    ];
    const days = [...new Set(all.map((s) => dayKey(s.at)).filter(Boolean))]
      .sort()
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
    const guidedSessions = sessions.filter((s) => s.mode !== "mock");
    const mockSessions = sessions.filter((s) => s.mode === "mock");
    const sessionCount = sessions.length;
    const guidedCount = guidedSessions.length;
    const mockCount = mockSessions.length;
    const questionsAttempted = sessions.reduce((sum, s) => sum + (s.total || 0), 0);
    const questionsCorrect = sessions.reduce((sum, s) => sum + (s.correct || 0), 0);
    const last = sessions[0] || null;
    const lastMock = mockSessions[0] || null;
    const avg =
      sessionCount > 0
        ? Math.round(
            sessions.reduce((sum, s) => sum + (s.percent || 0), 0) / sessionCount
          )
        : null;
    const mockAvg =
      mockCount > 0
        ? Math.round(mockSessions.reduce((sum, s) => sum + (s.percent || 0), 0) / mockCount)
        : null;

    let readiness = {
      label: "Not started",
      width: 8,
      note: "Complete a Structure guided drill to build your baseline.",
    };
    if (mockCount >= 1 && (mockAvg ?? 0) >= 70) {
      readiness = {
        label: "Mock ready",
        width: 88,
        note: "You have completed Structure timed mock(s) with solid scores. Keep alternating guided review and mocks.",
      };
    } else if (mockCount >= 1) {
      readiness = {
        label: "Mock started",
        width: 72,
        note: "You have timed Structure mock experience. Review weak skills, then try another 40-question set.",
      };
    } else if (guidedCount >= 1 && (avg ?? 0) < 60) {
      readiness = {
        label: "Building",
        width: 35,
        note: "Keep guided practice going. Focus on the weak skills below, then attempt a Structure mock.",
      };
    } else if (guidedCount >= 2 && (avg ?? 0) >= 60 && (avg ?? 0) < 80) {
      readiness = {
        label: "On track",
        width: 62,
        note: "Solid guided progress. You are ready to try a timed Structure mock (40 questions / 25 minutes).",
      };
    } else if (guidedCount >= 3 && (avg ?? 0) >= 80) {
      readiness = {
        label: "Almost ready",
        width: 78,
        note: "Strong guided sessions. Take a Structure timed mock under exam conditions.",
      };
    } else if (guidedCount >= 1) {
      readiness = {
        label: "In progress",
        width: 48,
        note: "Baseline started. Review mistakes and run another 15-question drill—or try a mock when ready.",
      };
    }

    const structureSkills = getTopSkills(5);
    const weak = structureSkills[0];

    const readingSessions = getReadingSessions();
    const readingGuided = readingSessions.filter((s) => s.mode !== "mock");
    const readingMocks = readingSessions.filter((s) => s.mode === "mock");
    const readingCount = readingSessions.length;
    const readingAvg =
      readingCount > 0
        ? Math.round(
            readingSessions.reduce((sum, s) => sum + (s.percent || 0), 0) / readingCount
          )
        : null;
    const lastReading = readingSessions[0] || null;
    const lastReadingMock = readingMocks[0] || null;
    const readingSkills = rankSkills(aggregateSkillsFromSessions(readingSessions), 5);

    const listeningSessions = getListeningSessions();
    const listeningGuided = listeningSessions.filter((s) => s.mode !== "mock");
    const listeningMocks = listeningSessions.filter((s) => s.mode === "mock");
    const listeningCount = listeningSessions.length;
    const listeningAvg =
      listeningCount > 0
        ? Math.round(
            listeningSessions.reduce((sum, s) => sum + (s.percent || 0), 0) / listeningCount
          )
        : null;
    const lastListening = listeningSessions[0] || null;
    const lastListeningMock = listeningMocks[0] || null;
    const listeningSkills = rankSkills(aggregateSkillsFromSessions(listeningSessions), 5);

    // Overall study focus: weakest among practiced section skills (all sections)
    const allWeak = [
      ...structureSkills.map((s) => ({ ...s, section: "Structure" })),
      ...readingSkills.map((s) => ({ ...s, section: "Reading" })),
      ...listeningSkills.map((s) => ({ ...s, section: "Listening" })),
    ].sort((a, b) => a.percent - b.percent || b.total - a.total);

    const focus = allWeak[0] || null;
    const totalSessionsAll =
      sessionCount + readingCount + listeningCount + getFullMocks().length;

    return {
      sessionCount,
      guidedCount,
      mockCount,
      questionsAttempted,
      questionsCorrect,
      averagePercent: avg,
      mockAveragePercent: mockAvg,
      streakDays: getStreakDays(),
      last,
      lastMock,
      readiness,
      focusSkill: focus ? focus.skill : "Structure patterns",
      focusSection: focus ? focus.section : "Structure",
      focusNote: focus
        ? `${focus.section}: ${focus.skill} (${focus.percent}% so far).`
        : "Complete a guided drill to see what to study next.",
      skills: structureSkills,
      recentMistakes: getRecentMistakes(5),
      totalSessionsAll,
      reading: {
        sessionCount: readingCount,
        guidedCount: readingGuided.length,
        mockCount: readingMocks.length,
        averagePercent: readingAvg,
        last: lastReading,
        lastMock: lastReadingMock,
        skills: readingSkills,
      },
      listening: {
        sessionCount: listeningCount,
        guidedCount: listeningGuided.length,
        mockCount: listeningMocks.length,
        averagePercent: listeningAvg,
        last: lastListening,
        lastMock: lastListeningMock,
        skills: listeningSkills,
      },
      fullMock: {
        count: getFullMocks().length,
        last: getFullMocks()[0] || null,
      },
    };
  }

  function clearProgress() {
    localStorage.removeItem(STORAGE_KEY);
  }

  global.ToeflProgress = {
    normalizeSkill,
    recordStructureSession,
    recordReadingSession,
    recordListeningSession,
    recordFullMock,
    getStructureSessions,
    getReadingSessions,
    getListeningSessions,
    getFullMocks,
    getSkillTotals,
    getTopSkills,
    getRecentMistakes,
    getStreakDays,
    getSummary,
    clearProgress,
    load,
  };
})(window);
