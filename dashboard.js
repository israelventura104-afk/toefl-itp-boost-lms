/**
 * Student dashboard — results & stats only.
 * Name saved on this browser (localStorage). No accounts.
 */

(function () {
  const NAME_KEY = "toefl-itp-boost.studentName.v1";

  function text(el, value) {
    if (el) el.textContent = value == null ? "" : String(value);
  }

  function getName() {
    try {
      return String(localStorage.getItem(NAME_KEY) || "").trim();
    } catch {
      return "";
    }
  }

  function setName(name) {
    const clean = String(name || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 40);
    if (!clean) {
      localStorage.removeItem(NAME_KEY);
      return "";
    }
    localStorage.setItem(NAME_KEY, clean);
    return clean;
  }

  function renderNameUI() {
    const name = getName();
    const greeting = document.querySelector("[data-dash-greeting]");
    const panel = document.querySelector("[data-dash-name-panel]");
    const form = document.querySelector("[data-dash-name-form]");
    const input = document.querySelector("[data-dash-name-input]");

    if (greeting) {
      greeting.textContent = name ? `Welcome, ${name}.` : "Welcome.";
    }

    if (!panel || !form) return;

    if (name) {
      panel.innerHTML = `
        <div class="dash-name-saved">
          <span>Signed in as <strong>${escapeHtml(name)}</strong></span>
          <button class="button secondary compact-button" type="button" data-dash-edit-name>
            Change name
          </button>
        </div>
        <p class="dash-name-hint">Saved only on this browser — no account needed.</p>
      `;
      panel.querySelector("[data-dash-edit-name]")?.addEventListener("click", () => {
        panel.innerHTML = `
          <form class="dash-name-form" data-dash-name-form>
            <label>
              Your name
              <input
                type="text"
                name="studentName"
                data-dash-name-input
                maxlength="40"
                autocomplete="name"
                value="${escapeHtml(name)}"
                required
              />
            </label>
            <button class="button primary" type="submit">Save name</button>
          </form>
          <p class="dash-name-hint">Saved only on this browser — no account needed.</p>
        `;
        bindNameForm(panel.querySelector("[data-dash-name-form]"));
        panel.querySelector("[data-dash-name-input]")?.focus();
      });
    } else if (input) {
      // initial empty form already in HTML
      bindNameForm(form);
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function bindNameForm(form) {
    if (!form || form.dataset.bound === "1") return;
    form.dataset.bound = "1";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("[data-dash-name-input]");
      const saved = setName(input ? input.value : "");
      if (!saved) return;
      renderNameUI();
    });
  }

  function skillRowsHtml(skills) {
    if (!skills || !skills.length) {
      return `<p class="dash-empty-note">No practice saved yet.</p>`;
    }
    return skills
      .map(
        (row) => `
      <div class="skill-row">
        <span>${escapeHtml(row.skill)}</span>
        <div class="mini-bar"><span style="width: ${row.width}%"></span></div>
        <b>${row.percent}%</b>
      </div>`
      )
      .join("");
  }

  function formatWhen(iso) {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return "";
    }
  }

  function renderRecent(summary) {
    const host = document.querySelector("[data-dash-recent]");
    if (!host) return;

    const rows = [];

    if (summary.last) {
      rows.push({
        label: summary.last.mode === "mock" ? "Structure mock" : "Structure guided",
        score: `${summary.last.correct}/${summary.last.total} (${summary.last.percent}%)`,
        at: summary.last.at,
      });
    }
    if (summary.listening?.last) {
      rows.push({
        label:
          summary.listening.last.mode === "mock" ? "Listening mock" : "Listening guided",
        score: `${summary.listening.last.correct}/${summary.listening.last.total} (${summary.listening.last.percent}%)`,
        at: summary.listening.last.at,
      });
    }
    if (summary.reading?.last) {
      rows.push({
        label: summary.reading.last.mode === "mock" ? "Reading mock" : "Reading guided",
        score: `${summary.reading.last.correct}/${summary.reading.last.total} (${summary.reading.last.percent}%)`,
        at: summary.reading.last.at,
      });
    }
    if (summary.fullMock?.last) {
      rows.push({
        label: "Full mock",
        score: `${summary.fullMock.last.correct}/${summary.fullMock.last.total} (${summary.fullMock.last.percent}%)`,
        at: summary.fullMock.last.at,
      });
    }

    rows.sort((a, b) => new Date(b.at) - new Date(a.at));

    if (!rows.length) {
      host.innerHTML =
        `<li class="dash-empty-note">Finish a guided set or mock to see results here.</li>`;
      return;
    }

    host.innerHTML = rows
      .slice(0, 6)
      .map(
        (row) => `
      <li>
        <div>
          <strong>${escapeHtml(row.label)}</strong>
          <span>${escapeHtml(formatWhen(row.at))}</span>
        </div>
        <b>${escapeHtml(row.score)}</b>
      </li>`
      )
      .join("");
  }

  function render() {
    renderNameUI();
    bindNameForm(document.querySelector("[data-dash-name-form]"));

    if (!window.ToeflProgress) return;
    const summary = window.ToeflProgress.getSummary();

    // Focus — one message only
    text(
      document.querySelector("[data-dash-focus-title]"),
      summary.totalSessionsAll
        ? `Focus: ${summary.focusSkill}`
        : "Complete a practice set to see your focus."
    );
    text(document.querySelector("[data-dash-focus-note]"), summary.focusNote);

    // Section averages
    text(
      document.querySelector("[data-dash-avg-structure]"),
      summary.averagePercent == null ? "—" : `${summary.averagePercent}%`
    );
    text(
      document.querySelector("[data-dash-note-structure]"),
      summary.sessionCount
        ? `${summary.sessionCount} session${summary.sessionCount === 1 ? "" : "s"}`
        : "No sessions yet"
    );

    text(
      document.querySelector("[data-dash-avg-listening]"),
      summary.listening?.averagePercent == null
        ? "—"
        : `${summary.listening.averagePercent}%`
    );
    text(
      document.querySelector("[data-dash-note-listening]"),
      summary.listening?.sessionCount
        ? `${summary.listening.sessionCount} session${
            summary.listening.sessionCount === 1 ? "" : "s"
          }`
        : "No sessions yet"
    );

    text(
      document.querySelector("[data-dash-avg-reading]"),
      summary.reading?.averagePercent == null
        ? "—"
        : `${summary.reading.averagePercent}%`
    );
    text(
      document.querySelector("[data-dash-note-reading]"),
      summary.reading?.sessionCount
        ? `${summary.reading.sessionCount} session${
            summary.reading.sessionCount === 1 ? "" : "s"
          }`
        : "No sessions yet"
    );

    text(
      document.querySelector("[data-dash-streak]"),
      summary.streakDays
        ? `${summary.streakDays} day${summary.streakDays > 1 ? "s" : ""}`
        : "—"
    );
    text(
      document.querySelector("[data-dash-streak-note]"),
      summary.streakDays ? "Keep the rhythm" : "Practice today to start"
    );

    const totalSessions = summary.totalSessionsAll || 0;
    text(document.querySelector("[data-dash-sessions]"), String(totalSessions));
    text(
      document.querySelector("[data-dash-sessions-note]"),
      totalSessions
        ? "Guided + mocks on this device"
        : "Guided + mocks on this device"
    );

    // Skills × 3 sections
    const sHost = document.querySelector("[data-dash-skills-structure]");
    const lHost = document.querySelector("[data-dash-skills-listening]");
    const rHost = document.querySelector("[data-dash-skills-reading]");
    if (sHost) sHost.innerHTML = skillRowsHtml(summary.skills);
    if (lHost) lHost.innerHTML = skillRowsHtml(summary.listening?.skills);
    if (rHost) rHost.innerHTML = skillRowsHtml(summary.reading?.skills);

    renderRecent(summary);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
