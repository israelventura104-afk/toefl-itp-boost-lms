(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> circle the time marker, name the timeline, then pick the verb form that fits. Do not choose by “what sounds familiar.”</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Circle the marker</strong><span><em>since, ago, last, already, by the time, after, until, currently</em>.</span></article>
    <article><strong>2. Name the timeline</strong><span>Finished past, past-to-now, earlier past, or still ahead.</span></article>
    <article><strong>3. Match the form</strong><span>Simple past, present perfect, past perfect, or present in a time clause.</span></article>
    <article><strong>4. Watch time clauses</strong><span>After <em>when / before / after / until / as soon as</em>, do not use <em>will</em>.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Time clause: no <em>will</em></strong> → use present (or past if the main clause is past).<br>
      ✓ <em>The students will submit the paper after they <strong>finish</strong> the figures.</em><br>
      ✗ <em>The students will submit the paper after they will finish the figures.</em></li>
    <li><strong>Since / for / already / yet / so far</strong> → present perfect.<br>
      ✓ <em>The botanist <strong>has monitored</strong> this wetland since 2014.</em><br>
      ✗ <em>The botanist monitored this wetland since 2014.</em></li>
    <li><strong>Ago / last / in 1998</strong> → simple past, not present perfect.<br>
      ✓ <em>The expedition <strong>mapped</strong> the valley twenty years ago.</em><br>
      ✗ <em>The expedition has mapped the valley twenty years ago.</em></li>
    <li><strong>By the time + past</strong> → past perfect for the earlier action.<br>
      ✓ <em>By the time the glacier retreated, plants <strong>had colonized</strong> the slope.</em><br>
      ✗ <em>By the time the glacier retreated, plants have colonized the slope.</em></li>
    <li><strong>Currently / at the moment</strong> → present continuous (or simple present for a fact), not a finished past.<br>
      ✓ <em>The engineers <strong>are inspecting</strong> the bridge at the moment.</em><br>
      ✗ <em>The engineers inspected the bridge at the moment.</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p><em>Ago</em> closes the door to now (simple past). <em>Since</em> keeps the door open (present perfect). In a future sentence, a time clause still uses present, not <em>will</em>.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1 · Time clause (no will)",
      stem: "The students will submit the paper after they ____ the appendix.",
      options: [
        { key: "A", text: "will finish" },
        { key: "B", text: "finished" },
        { key: "C", text: "finish" },
        { key: "D", text: "have been finishing" }
      ],
      correctKey: "C",
      slot: "Time clause · present, not will",
      teach: "After introduces a time clause. Even when the main verb is will submit, the time clause uses present: finish. Common trap: repeating will."
    },
    {
      title: "Demo 2 · Since → present perfect",
      stem: "The research team ____ the same site since 2019.",
      options: [
        { key: "A", text: "studied" },
        { key: "B", text: "has studied" },
        { key: "C", text: "studies" },
        { key: "D", text: "is studying" }
      ],
      correctKey: "B",
      slot: "Since · present perfect",
      teach: "Since 2019 connects a past start to now, so present perfect has studied is required. Common trap: simple past studied."
    },
    {
      title: "Demo 3 · Ago → simple past",
      stem: "The expedition ____ the valley twenty years ago.",
      options: [
        { key: "A", text: "mapped" },
        { key: "B", text: "has mapped" },
        { key: "C", text: "maps" },
        { key: "D", text: "is mapping" }
      ],
      correctKey: "A",
      slot: "Ago · simple past",
      teach: "Ago marks a finished time, so simple past mapped is required. Common trap: present perfect has mapped with ago."
    },
    {
      title: "Demo 4 · By the time → past perfect",
      stem: "By the time the glacier retreated, plants ____ the lower slope.",
      options: [
        { key: "A", text: "colonize" },
        { key: "B", text: "have colonized" },
        { key: "C", text: "had colonized" },
        { key: "D", text: "will colonize" }
      ],
      correctKey: "C",
      slot: "By the time · past perfect",
      teach: "The glacier retreated is past. The earlier past action uses past perfect: had colonized. Common trap: present perfect have colonized."
    },
    {
      title: "Demo 5 · Error ID · will in a time clause",
      stem: "The committee will announce the results (A) after it (B) will finish (C) the review (D).",
      options: [
        { key: "A", text: "The committee will announce the results" },
        { key: "B", text: "after it" },
        { key: "C", text: "will finish" },
        { key: "D", text: "the review" }
      ],
      correctKey: "C",
      slot: "Error ID · time clause",
      teach: "Will finish is incorrect. After it is a time clause, so use finishes, not will finish. The main clause already carries the future."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The students will submit the draft after they ____ the figures.",
      options: [
        { key: "A", text: "complete" },
        { key: "B", text: "will complete" },
        { key: "C", text: "completed" },
        { key: "D", text: "have been completing" }
      ],
      correctKey: "A",
      slot: "Time clause · present, not will",
      explain: "After they is a time clause. Use present complete, not will complete."
    },
    {
      id: "Q02",
      stem: "The botanist ____ this wetland since 2014.",
      options: [
        { key: "A", text: "has monitored" },
        { key: "B", text: "monitored" },
        { key: "C", text: "monitors" },
        { key: "D", text: "is monitoring" }
      ],
      correctKey: "A",
      slot: "Since · present perfect",
      explain: "Since 2014 keeps the action connected to now. Present perfect has monitored is required."
    },
    {
      id: "Q03",
      stem: "The survey ____ the coastline thirty years ago.",
      options: [
        { key: "A", text: "has mapped" },
        { key: "B", text: "mapped" },
        { key: "C", text: "maps" },
        { key: "D", text: "is mapping" }
      ],
      correctKey: "B",
      slot: "Ago · simple past",
      explain: "Ago marks a finished time, so simple past mapped is required, not has mapped."
    },
    {
      id: "Q04",
      stem: "By the time the volcano erupted, nearby residents ____ the area.",
      options: [
        { key: "A", text: "evacuate" },
        { key: "B", text: "had evacuated" },
        { key: "C", text: "have evacuated" },
        { key: "D", text: "will evacuate" }
      ],
      correctKey: "B",
      slot: "By the time · past perfect",
      explain: "The eruption is past. The earlier action uses past perfect: had evacuated."
    },
    {
      id: "Q05",
      stem: "We will leave as soon as the rain ____.",
      options: [
        { key: "A", text: "will stop" },
        { key: "B", text: "stopped" },
        { key: "C", text: "stops" },
        { key: "D", text: "is going to stop" }
      ],
      correctKey: "C",
      slot: "Time clause · as soon as",
      explain: "As soon as introduces a time clause. Use present stops, not will stop."
    },
    {
      id: "Q06",
      stem: "Historians ____ the archive for more than a decade.",
      options: [
        { key: "A", text: "used" },
        { key: "B", text: "use" },
        { key: "C", text: "have used" },
        { key: "D", text: "are using" }
      ],
      correctKey: "C",
      slot: "For · present perfect",
      explain: "For more than a decade connects past to now. Present perfect have used is required."
    },
    {
      id: "Q07",
      stem: "The museum ____ the collection last year.",
      options: [
        { key: "A", text: "has cataloged" },
        { key: "B", text: "catalogs" },
        { key: "C", text: "is cataloging" },
        { key: "D", text: "cataloged" }
      ],
      correctKey: "D",
      slot: "Last · simple past",
      explain: "Last year is a finished time, so simple past cataloged is required."
    },
    {
      id: "Q08",
      stem: "The lab will remain closed until the inspectors ____.",
      options: [
        { key: "A", text: "will arrive" },
        { key: "B", text: "arrived" },
        { key: "C", text: "are arriving" },
        { key: "D", text: "arrive" }
      ],
      correctKey: "D",
      slot: "Time clause · until",
      explain: "Until introduces a time clause. Use present arrive, not will arrive."
    },
    {
      id: "Q09",
      stem: "The engineers ____ the bridge at the moment.",
      options: [
        { key: "A", text: "are inspecting" },
        { key: "B", text: "inspected" },
        { key: "C", text: "have inspected" },
        { key: "D", text: "inspect" }
      ],
      correctKey: "A",
      slot: "At the moment · present continuous",
      explain: "At the moment marks an action in progress now. Are inspecting is required."
    },
    {
      id: "Q10",
      stem: "The samples ____ already at the laboratory.",
      options: [
        { key: "A", text: "have arrived" },
        { key: "B", text: "arrived" },
        { key: "C", text: "are arriving" },
        { key: "D", text: "arrive" }
      ],
      correctKey: "A",
      slot: "Already · present perfect",
      explain: "Already typically takes present perfect: have arrived. Simple past arrived needs a finished-time marker such as yesterday."
    },
    {
      id: "Q11",
      stem: "The team will publish the paper (A) after it (B) will complete (C) the analysis (D).",
      options: [
        { key: "A", text: "The team will publish the paper" },
        { key: "B", text: "after it" },
        { key: "C", text: "will complete" },
        { key: "D", text: "the analysis" }
      ],
      correctKey: "C",
      slot: "Error ID · time clause",
      explain: "Will complete is incorrect. After it is a time clause, so use completes."
    },
    {
      id: "Q12",
      stem: "By the time the lecture ended, most students ____ the hall.",
      options: [
        { key: "A", text: "leave" },
        { key: "B", text: "have left" },
        { key: "C", text: "are leaving" },
        { key: "D", text: "had left" }
      ],
      correctKey: "D",
      slot: "By the time · past perfect",
      explain: "The lecture ended is past. The earlier action uses past perfect: had left."
    },
    {
      id: "Q13",
      stem: "(A) The expedition (B) has reached (C) the summit (D) two years ago.",
      options: [
        { key: "A", text: "The expedition" },
        { key: "B", text: "has reached" },
        { key: "C", text: "the summit" },
        { key: "D", text: "two years ago" }
      ],
      correctKey: "B",
      slot: "Error ID · ago",
      explain: "Has reached is incorrect with two years ago. Use reached."
    },
    {
      id: "Q14",
      stem: "When the tide ____, the researchers will collect the shells.",
      options: [
        { key: "A", text: "will fall" },
        { key: "B", text: "falls" },
        { key: "C", text: "fell" },
        { key: "D", text: "is going to fall" }
      ],
      correctKey: "B",
      slot: "Time clause · when",
      explain: "When introduces a time clause. Use present falls, not will fall."
    },
    {
      id: "Q15",
      stem: "The observatory (A) in Chile (B) recorded (C) seismic activity since 2008 (D).",
      options: [
        { key: "A", text: "The observatory" },
        { key: "B", text: "in Chile" },
        { key: "C", text: "recorded" },
        { key: "D", text: "seismic activity since 2008" }
      ],
      correctKey: "C",
      slot: "Error ID · since",
      explain: "Recorded is incorrect with since 2008. Use has recorded. In Chile is only a prepositional phrase."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Time clauses (no will)", ids: ["Q01", "Q05", "Q08", "Q11", "Q14"] },
    { label: "Since / for / already", ids: ["Q02", "Q06", "Q10", "Q15"] },
    { label: "Ago / last (simple past)", ids: ["Q03", "Q07", "Q13"] },
    { label: "By the time (past perfect)", ids: ["Q04", "Q12"] },
    { label: "At the moment", ids: ["Q09"] }
  ];

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
