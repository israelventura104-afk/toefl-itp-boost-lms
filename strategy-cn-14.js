(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> match the connector to what follows it. A <em>clause</em> has a subject and a verb. A <em>noun phrase</em> does not.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Look right of the connector</strong><span>Is there a full clause (<em>the rain was heavy</em>) or a noun (<em>the rain / the delay</em>)?</span></article>
    <article><strong>2. Clause connectors</strong><span><em>although, even though, because, unless, whereas, so that</em> + subject + verb.</span></article>
    <article><strong>3. Noun connectors</strong><span><em>despite, in spite of, because of, due to</em> + noun phrase.</span></article>
    <article><strong>4. Sentence connectors</strong><span><em>however, therefore, nevertheless</em> join two sentences. Use a period or a semicolon, not a comma alone.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Although / even though</strong> → clause. <strong>Despite / in spite of</strong> → noun.<br>
      ✓ <em><strong>Although</strong> the rain was heavy, the excavation continued.</em><br>
      ✓ <em><strong>Despite</strong> the rain, the excavation continued.</em><br>
      ✗ <em>Despite the rain was heavy, the excavation continued.</em></li>
    <li><strong>Because</strong> → clause. <strong>Because of / due to</strong> → noun.<br>
      ✓ <em>The trial was delayed <strong>because</strong> the equipment failed.</em><br>
      ✓ <em>The trial was delayed <strong>because of</strong> equipment failure.</em><br>
      ✗ <em>The trial was delayed because of the equipment failed.</em></li>
    <li><strong>However / nevertheless</strong> → after a period or semicolon.<br>
      ✓ <em>The method is efficient; <strong>however</strong>, it is expensive.</em><br>
      ✗ <em>The method is efficient, however it is expensive.</em></li>
    <li><strong>Whereas</strong> → contrast two clauses in one sentence.<br>
      ✓ <em>The north slope is forested, <strong>whereas</strong> the south slope is bare.</em></li>
    <li><strong>Unless / so that</strong> → clause.<br>
      ✓ <em>The chamber stays sealed <strong>unless</strong> the trial ends.</em><br>
      ✓ <em>The samples were frozen <strong>so that</strong> they would not decay.</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>If you see a subject + verb after the blank, lock <em>although / because</em>. If you see a noun, lock <em>despite / because of</em>.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "____ the rain, the excavation continued.",
      options: [
        { key: "A", text: "Although" },
        { key: "B", text: "Despite" },
        { key: "C", text: "Because" },
        { key: "D", text: "However" }
      ],
      correctKey: "B",
      slot: "Despite + noun",
      teach: "The rain is a noun phrase, so despite is required. Although needs a clause: although the rain was heavy."
    },
    {
      title: "Demo 2",
      stem: "____ the samples were frozen, they remained usable.",
      options: [
        { key: "A", text: "Despite" },
        { key: "B", text: "Because of" },
        { key: "C", text: "Although" },
        { key: "D", text: "Due to" }
      ],
      correctKey: "C",
      slot: "Although + clause",
      teach: "The samples were frozen is a clause, so although is required. Despite cannot take a clause."
    },
    {
      title: "Demo 3",
      stem: "The trial was delayed ____ equipment failure.",
      options: [
        { key: "A", text: "because" },
        { key: "B", text: "although" },
        { key: "C", text: "because of" },
        { key: "D", text: "however" }
      ],
      correctKey: "C",
      slot: "Because of + noun",
      teach: "Equipment failure is a noun phrase, so because of is required. Because needs a clause."
    },
    {
      title: "Demo 4",
      stem: "The method is efficient; ____, it is expensive.",
      options: [
        { key: "A", text: "although" },
        { key: "B", text: "despite" },
        { key: "C", text: "because of" },
        { key: "D", text: "however" }
      ],
      correctKey: "D",
      slot: "However after a semicolon",
      teach: "However joins two sentences after a semicolon. Although would not take a comma after it here."
    },
    {
      title: "Demo 5",
      stem: "(A) The lecture continued (B) although (C) the noise (D) in the hall.",
      options: [
        { key: "A", text: "The lecture continued" },
        { key: "B", text: "although" },
        { key: "C", text: "the noise" },
        { key: "D", text: "in the hall" }
      ],
      correctKey: "B",
      slot: "Error ID · although needs a clause",
      teach: "Although the noise is incomplete. Use despite the noise. Common trap: hunting in the hall."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "____ the delay, the team finished the survey.",
      options: [
        { key: "A", text: "Despite" },
        { key: "B", text: "Although" },
        { key: "C", text: "Because" },
        { key: "D", text: "However" }
      ],
      correctKey: "A",
      slot: "Despite + noun",
      explain: "The delay is a noun phrase, so despite is required."
    },
    {
      id: "Q02",
      stem: "____ the cores were damaged, the data were still useful.",
      options: [
        { key: "A", text: "Although" },
        { key: "B", text: "Despite" },
        { key: "C", text: "Because of" },
        { key: "D", text: "Due to" }
      ],
      correctKey: "A",
      slot: "Although + clause",
      explain: "The cores were damaged is a clause, so although is required."
    },
    {
      id: "Q03",
      stem: "The archive closed ____ a flood on the north campus.",
      options: [
        { key: "A", text: "because" },
        { key: "B", text: "because of" },
        { key: "C", text: "although" },
        { key: "D", text: "however" }
      ],
      correctKey: "B",
      slot: "Because of + noun",
      explain: "A flood is a noun phrase, so because of is required."
    },
    {
      id: "Q04",
      stem: "____ the method is slow, it is accurate.",
      options: [
        { key: "A", text: "Despite" },
        { key: "B", text: "Because of" },
        { key: "C", text: "Even though" },
        { key: "D", text: "Due to" }
      ],
      correctKey: "C",
      slot: "Even though + clause",
      explain: "The method is slow is a clause, so even though is required."
    },
    {
      id: "Q05",
      stem: "____ the cost, the lab bought the instrument.",
      options: [
        { key: "A", text: "Although" },
        { key: "B", text: "Because" },
        { key: "C", text: "In spite of" },
        { key: "D", text: "However" }
      ],
      correctKey: "C",
      slot: "In spite of + noun",
      explain: "The cost is a noun phrase, so in spite of is required."
    },
    {
      id: "Q06",
      stem: "The glacier retreated ____ summers were unusually warm.",
      options: [
        { key: "A", text: "because of" },
        { key: "B", text: "despite" },
        { key: "C", text: "because" },
        { key: "D", text: "however" }
      ],
      correctKey: "C",
      slot: "Because + clause",
      explain: "Summers were unusually warm is a clause, so because is required."
    },
    {
      id: "Q07",
      stem: "The north slope is forested, ____ the south slope is bare.",
      options: [
        { key: "A", text: "despite" },
        { key: "B", text: "because of" },
        { key: "C", text: "however" },
        { key: "D", text: "whereas" }
      ],
      correctKey: "D",
      slot: "Whereas + clause",
      explain: "Whereas contrasts two clauses. However would need a semicolon, not a comma."
    },
    {
      id: "Q08",
      stem: "The chamber stays sealed ____ the trial ends.",
      options: [
        { key: "A", text: "despite" },
        { key: "B", text: "because of" },
        { key: "C", text: "however" },
        { key: "D", text: "unless" }
      ],
      correctKey: "D",
      slot: "Unless + clause",
      explain: "Unless takes a clause: unless the trial ends."
    },
    {
      id: "Q09",
      stem: "(A) The excavation continued (B) despite of (C) the rain (D) all afternoon.",
      options: [
        { key: "A", text: "The excavation continued" },
        { key: "B", text: "despite of" },
        { key: "C", text: "the rain" },
        { key: "D", text: "all afternoon" }
      ],
      correctKey: "B",
      slot: "Error ID · despite, not despite of",
      explain: "Despite of is incorrect. Use despite the rain, or in spite of the rain."
    },
    {
      id: "Q10",
      stem: "The design is innovative; ____, it is not practical.",
      options: [
        { key: "A", text: "although" },
        { key: "B", text: "however" },
        { key: "C", text: "despite" },
        { key: "D", text: "because of" }
      ],
      correctKey: "B",
      slot: "However after a semicolon",
      explain: "However joins the two sentences after a semicolon."
    },
    {
      id: "Q11",
      stem: "The samples were frozen ____ they would not decay.",
      options: [
        { key: "A", text: "so that" },
        { key: "B", text: "despite" },
        { key: "C", text: "because of" },
        { key: "D", text: "however" }
      ],
      correctKey: "A",
      slot: "So that + clause",
      explain: "So that introduces a purpose clause: so that they would not decay."
    },
    {
      id: "Q12",
      stem: "(A) Overnight (B) the trial (C) was delayed (D) because of the equipment failed.",
      options: [
        { key: "A", text: "Overnight" },
        { key: "B", text: "the trial" },
        { key: "C", text: "was delayed" },
        { key: "D", text: "because of the equipment failed" }
      ],
      correctKey: "D",
      slot: "Error ID · because of needs a noun",
      explain: "Because of cannot take a clause. Use because the equipment failed, or because of equipment failure."
    },
    {
      id: "Q13",
      stem: "The delay was ____ a power failure.",
      options: [
        { key: "A", text: "due to" },
        { key: "B", text: "although" },
        { key: "C", text: "because" },
        { key: "D", text: "however" }
      ],
      correctKey: "A",
      slot: "Due to + noun",
      explain: "A power failure is a noun phrase, so due to is required."
    },
    {
      id: "Q14",
      stem: "The report is long. ____, it is well organized.",
      options: [
        { key: "A", text: "Despite" },
        { key: "B", text: "Nevertheless" },
        { key: "C", text: "Although" },
        { key: "D", text: "Because of" }
      ],
      correctKey: "B",
      slot: "Nevertheless after a period",
      explain: "Nevertheless connects two sentences after a period. Although cannot stand alone with a comma like this."
    },
    {
      id: "Q15",
      stem: "(A) The team finished (B) the survey (C) although (D) the delay.",
      options: [
        { key: "A", text: "The team finished" },
        { key: "B", text: "the survey" },
        { key: "C", text: "although" },
        { key: "D", text: "the delay" }
      ],
      correctKey: "C",
      slot: "Error ID · although needs a clause",
      explain: "Although the delay is incomplete. Use despite the delay."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Despite / in spite of / due to + noun", ids: ["Q01", "Q05", "Q13"] },
    { label: "Although / even though / because / unless / so that + clause", ids: ["Q02", "Q04", "Q06", "Q08", "Q11"] },
    { label: "Because of + noun", ids: ["Q03"] },
    { label: "However / whereas / nevertheless", ids: ["Q07", "Q10", "Q14"] },
    { label: "Error ID · wrong partner", ids: ["Q09", "Q12", "Q15"] }
  ];

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
