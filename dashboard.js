/**
 * Dashboard live stats — Phase 3
 * Reads ToeflProgress (localStorage) and fills real Structure practice data.
 */

(function () {
  function text(el, value) {
    if (el) el.textContent = value;
  }

  function textAll(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function render() {
    if (!window.ToeflProgress) return;
    const summary = window.ToeflProgress.getSummary();

    textAll("[data-dash-focus-skill]", summary.focusSkill);
    textAll("[data-dash-focus-note]", summary.focusNote);
    textAll(
      "[data-dash-focus-label]",
      summary.sessionCount ? "Based on your practice" : "Suggested start"
    );

    text(document.querySelector("[data-dash-plan-title]"), summary.sessionCount
      ? `${summary.focusSkill} needs attention next.`
      : "Structure is a strong place to start.");
    text(
      document.querySelector("[data-dash-plan-copy]"),
      summary.sessionCount
        ? summary.focusNote
        : "Learn the strategies, try the fixed sample set, then use guided practice when your teacher has opened class access on this device."
    );

    const skillsHost = document.querySelector("[data-dash-skills]");
    if (skillsHost) {
      if (!summary.skills.length) {
        skillsHost.innerHTML = `
          <div class="skill-row">
            <span>No guided sessions yet</span>
            <div class="mini-bar"><span style="width: 8%"></span></div>
            <b>Start</b>
          </div>
          <p class="dash-empty-note">Complete a 15-question Structure drill to build your skill breakdown.</p>
        `;
      } else {
        skillsHost.innerHTML = summary.skills
          .map(
            (row) => `
          <div class="skill-row">
            <span>${row.skill}</span>
            <div class="mini-bar"><span style="width: ${row.width}%"></span></div>
            <b>${row.label}</b>
          </div>
        `
          )
          .join("");
      }
    }

    const mistakesHost = document.querySelector("[data-dash-mistakes]");
    if (mistakesHost) {
      if (!summary.recentMistakes.length) {
        mistakesHost.innerHTML = `
          <li><b>No saved mistakes yet</b><span>Finish a guided drill to collect patterns</span></li>
        `;
      } else {
        const counts = {};
        summary.recentMistakes.forEach((m) => {
          const key = m.subskill ? `${m.skill} · ${m.subskill}` : m.skill;
          counts[key] = (counts[key] || 0) + 1;
        });
        mistakesHost.innerHTML = Object.entries(counts)
          .slice(0, 5)
          .map(
            ([label, count]) =>
              `<li><b>${label}</b><span>${count} recent miss${count > 1 ? "es" : ""}</span></li>`
          )
          .join("");
      }
    }

    text(document.querySelector("[data-dash-sessions]"), String(summary.sessionCount));
    text(
      document.querySelector("[data-dash-sessions-note]"),
      summary.sessionCount
        ? `${summary.questionsAttempted} Structure items practiced on this device`
        : "Across Structure guided practice"
    );

    text(
      document.querySelector("[data-dash-streak]"),
      summary.streakDays ? `${summary.streakDays} day${summary.streakDays > 1 ? "s" : ""}` : "—"
    );
    text(
      document.querySelector("[data-dash-streak-note]"),
      summary.streakDays ? "Keep the rhythm" : "Practice today to start a streak"
    );

    text(
      document.querySelector("[data-dash-avg]"),
      summary.averagePercent == null ? "—" : `${summary.averagePercent}%`
    );
    text(
      document.querySelector("[data-dash-avg-note]"),
      summary.averagePercent == null
        ? "After your first guided session"
        : "Average on completed Structure drills"
    );

    text(document.querySelector("[data-dash-ready-label]"), summary.readiness.label);
    text(document.querySelector("[data-dash-ready-note]"), summary.readiness.note);
    const meter = document.querySelector("[data-dash-ready-meter]");
    if (meter) meter.style.width = `${summary.readiness.width}%`;

    const lastHost = document.querySelector("[data-dash-last-session]");
    if (lastHost) {
      if (!summary.last) {
        lastHost.textContent = "No Structure sessions saved on this device yet.";
      } else {
        const when = new Date(summary.last.at);
        const kind = summary.last.mode === "mock" ? "Last mock" : "Last drill";
        lastHost.textContent = `${kind}: ${summary.last.correct}/${summary.last.total} (${summary.last.percent}%) · ${when.toLocaleString()}`;
      }
    }

    const lastMockHost = document.querySelector("[data-dash-last-mock]");
    if (lastMockHost) {
      if (!summary.lastMock) {
        lastMockHost.textContent = "No Structure mock saved on this device yet.";
      } else {
        const when = new Date(summary.lastMock.at);
        lastMockHost.textContent = `Last Structure mock: ${summary.lastMock.correct}/${summary.lastMock.total} (${summary.lastMock.percent}%) · ${when.toLocaleString()}${
          summary.mockCount > 1 ? ` · ${summary.mockCount} mocks total` : ""
        }`;
      }
    }

    const readingHost = document.querySelector("[data-dash-last-reading]");
    if (readingHost && summary.reading) {
      if (!summary.reading.last) {
        readingHost.textContent = "No Reading class sessions on this device yet.";
      } else {
        const when = new Date(summary.reading.last.at);
        const kind = summary.reading.last.mode === "mock" ? "Last Reading mock" : "Last Reading drill";
        readingHost.textContent = `${kind}: ${summary.reading.last.correct}/${summary.reading.last.total} (${summary.reading.last.percent}%) · ${when.toLocaleString()}${
          summary.reading.sessionCount > 1 ? ` · ${summary.reading.sessionCount} sessions` : ""
        }`;
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
