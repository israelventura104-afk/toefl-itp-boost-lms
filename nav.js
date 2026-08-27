/**
 * One global menu + a 3-step section path (Learn & try / Guided / Mock).
 * Fills [data-site-header] and [data-site-sidebar] on every app page.
 */
(function () {
  const file = (location.pathname.split("/").pop() || "index.html").split("?")[0].toLowerCase();

  const SECTIONS = {
    structure: {
      home: "structure.html",
      guided: "structure-guided-practice.html",
      mock: "structure-mock.html",
    },
    listening: {
      home: "listening.html",
      guided: "listening-guided-practice.html",
      mock: "listening-mock.html",
    },
    reading: {
      home: "reading.html",
      guided: "reading-guided-practice.html",
      mock: "reading-mock.html",
    },
  };

  const GLOBAL = [
    { href: "dashboard.html", label: "Progress", area: "progress" },
    { href: "structure.html", label: "Structure", area: "structure" },
    { href: "listening.html", label: "Listening", area: "listening" },
    { href: "reading.html", label: "Reading", area: "reading" },
    { href: "full-mock.html", label: "Full mock", area: "full-mock" },
  ];

  function here() {
    if (file === "dashboard.html") return { area: "progress" };
    if (file === "full-mock.html") return { area: "full-mock" };
    if (file === "demo-test.html") return { area: "demo" };
    if (file === "strategies.html") return { area: "strategies" };
    for (const [area, pages] of Object.entries(SECTIONS)) {
      if (file === pages.home) return { area, page: "home" };
      if (file === pages.guided) return { area, page: "guided" };
      if (file === pages.mock) return { area, page: "mock" };
    }
    return { area: "" };
  }

  function loc() {
    return here();
  }

  function renderHeader(place) {
    const links = GLOBAL.map((item) => {
      const active = item.area === place.area ? " active" : "";
      const current = item.area === place.area ? ' aria-current="page"' : "";
      return `<a class="${active.trim()}" href="${item.href}"${current}>${item.label}</a>`;
    }).join("");

    return `
      <a class="brand" href="index.html" aria-label="TOEFL ITP Boost home">
        <span class="brand-mark" aria-hidden="true">
          <img class="brand-logo" src="assets/logo.png" alt="" width="44" height="44">
        </span>
        <span class="brand-copy">
          <small>By Teacher Israel Ventura</small>
          <strong>TOEFL ITP Boost</strong>
        </span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        Menu
      </button>
      <nav class="nav" id="site-nav" aria-label="Main navigation">${links}</nav>
    `;
  }

  function renderSidebar(place) {
    const pages = SECTIONS[place.area];
    if (!pages) return "";
    const items = [
      { href: pages.home, label: "Learn & try", page: "home" },
      { href: pages.guided, label: "Guided", page: "guided" },
      { href: pages.mock, label: "Mock", page: "mock" },
    ];
    const links = items
      .map((item) => {
        const active = item.page === place.page ? " active" : "";
        const current = item.page === place.page ? ' aria-current="page"' : "";
        return `<a class="${active.trim()}" href="${item.href}"${current}>${item.label}</a>`;
      })
      .join("");
    return `<p class="sidebar-kicker">In this section</p><nav class="app-nav" aria-label="Section path">${links}</nav>`;
  }

  function bindToggle(header) {
    const btn = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".nav");
    if (!btn || !nav || header.dataset.navBound) return;
    header.dataset.navBound = "1";
    const setOpen = (open) => {
      header.classList.toggle("is-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    };
    btn.addEventListener("click", () => {
      setOpen(!header.classList.contains("is-nav-open"));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });
  }

  const place = loc();
  const header = document.querySelector("[data-site-header]");
  const sidebar = document.querySelector("[data-site-sidebar]");
  const frame = document.querySelector("[data-site-frame]");

  if (header) {
    header.innerHTML = renderHeader(place);
  }

  document.querySelectorAll(".topbar").forEach(bindToggle);

  const sideHtml = renderSidebar(place);
  if (sidebar) {
    if (sideHtml) {
      sidebar.innerHTML = sideHtml;
      sidebar.hidden = false;
      frame?.classList.add("has-sidebar");
    } else {
      sidebar.innerHTML = "";
      sidebar.hidden = true;
      frame?.classList.remove("has-sidebar");
    }
  }
})();
