(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> if a relative clause is <em>who / which / that + be + verb</em>, you can often drop <em>who/which/that + be</em> and keep only the verb form.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Find the full clause</strong><span>Look for <em>who is / which was / that were</em> after a noun.</span></article>
    <article><strong>2. Ask: active or passive?</strong><span>Does the noun <em>do</em> the action, or <em>receive</em> it?</span></article>
    <article><strong>3. Active → -ing</strong><span><em>the students who are taking the exam</em> → <em>the students taking the exam</em>.</span></article>
    <article><strong>4. Passive → past participle</strong><span><em>the book that was written in 1902</em> → <em>the book written in 1902</em>.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Active reduction</strong> → <em>-ing</em>. The noun does the action.<br>
      ✓ <em>the botanist <strong>studying</strong> the wetland</em><br>
      ✗ <em>the botanist studied the wetland presented the findings</em> (two main verbs)<br>
      ✗ <em>the botanist who studying the wetland</em> (dropped <em>be</em> but kept <em>who</em>)</li>
    <li><strong>Passive reduction</strong> → past participle. The noun receives the action.<br>
      ✓ <em>the samples <strong>collected</strong> last winter</em><br>
      ✗ <em>the samples collecting last winter</em></li>
    <li><strong>Being + participle</strong> → reduction of <em>which is being</em>.<br>
      ✓ <em>the method <strong>being tested</strong> this month</em><br>
      ✗ <em>the method testing this month</em> (that would mean the method tests something)</li>
    <li><strong>Do not keep who/which without be</strong><br>
      ✓ <em>students <strong>taking</strong> this course</em><br>
      ✗ <em>students who taking this course</em></li>
    <li><strong>Match the voice</strong> → writing vs written is the classic trap.<br>
      ✓ <em>the manuscript <strong>written</strong> in 1902</em><br>
      ✗ <em>the manuscript writing in 1902</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>If the noun does the action, use <em>-ing</em>. If the noun receives the action, use the past participle. Do not leave <em>who</em> hanging without a verb.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "The students ____ the exam must remain seated.",
      options: [
        { key: "A", text: "who taking" },
        { key: "B", text: "taking" },
        { key: "C", text: "taken" },
        { key: "D", text: "who are take" }
      ],
      correctKey: "B",
      slot: "Active · -ing",
      teach: "The students do the taking, so use taking (from who are taking). Common trap: taken, the passive form."
    },
    {
      title: "Demo 2",
      stem: "The samples ____ last winter are still frozen.",
      options: [
        { key: "A", text: "collecting" },
        { key: "B", text: "which collecting" },
        { key: "C", text: "collected" },
        { key: "D", text: "who collected" }
      ],
      correctKey: "C",
      slot: "Passive · past participle",
      teach: "The samples receive the action, so use collected (from that were collected). Common trap: collecting."
    },
    {
      title: "Demo 3",
      stem: "The botanist ____ the wetland presented the findings on Friday.",
      options: [
        { key: "A", text: "studying" },
        { key: "B", text: "studied" },
        { key: "C", text: "who studying" },
        { key: "D", text: "is studying" }
      ],
      correctKey: "A",
      slot: "Active · -ing",
      teach: "Studying reduces who is studying. Studied would create two main verbs. Who studying drops be but keeps who."
    },
    {
      title: "Demo 4",
      stem: "The manuscript ____ in 1902 has now been restored.",
      options: [
        { key: "A", text: "writing" },
        { key: "B", text: "written" },
        { key: "C", text: "which writing" },
        { key: "D", text: "who written" }
      ],
      correctKey: "B",
      slot: "Passive · written, not writing",
      teach: "The manuscript receives the writing, so written is required. Writing would mean the manuscript writes."
    },
    {
      title: "Demo 5",
      stem: "(A) The data (B) collecting (C) last year (D) support the claim.",
      options: [
        { key: "A", text: "The data" },
        { key: "B", text: "collecting" },
        { key: "C", text: "last year" },
        { key: "D", text: "support the claim" }
      ],
      correctKey: "B",
      slot: "Error ID · passive participle",
      teach: "Collecting is active. The data were collected, so use collected. Common trap: hunting support because data can be plural."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The students ____ the seminar must register by Friday.",
      options: [
        { key: "A", text: "taking" },
        { key: "B", text: "taken" },
        { key: "C", text: "who taking" },
        { key: "D", text: "who are take" }
      ],
      correctKey: "A",
      slot: "Active · -ing",
      explain: "The students do the taking, so taking is required."
    },
    {
      id: "Q02",
      stem: "The cores ____ in 2014 remain in cold storage.",
      options: [
        { key: "A", text: "collected" },
        { key: "B", text: "collecting" },
        { key: "C", text: "which collecting" },
        { key: "D", text: "who collected" }
      ],
      correctKey: "A",
      slot: "Passive · past participle",
      explain: "The cores receive the action, so collected is required, not collecting."
    },
    {
      id: "Q03",
      stem: "The botanist ____ the orchid teaches at the university.",
      options: [
        { key: "A", text: "studied" },
        { key: "B", text: "studying" },
        { key: "C", text: "who studying" },
        { key: "D", text: "is studying" }
      ],
      correctKey: "B",
      slot: "Active · -ing",
      explain: "Studying reduces who is studying. Studied would leave two main verbs."
    },
    {
      id: "Q04",
      stem: "The report ____ by the committee was published in May.",
      options: [
        { key: "A", text: "writing" },
        { key: "B", text: "written" },
        { key: "C", text: "which writing" },
        { key: "D", text: "who written" }
      ],
      correctKey: "B",
      slot: "Passive · written",
      explain: "The report receives the action, so written is required."
    },
    {
      id: "Q05",
      stem: "The method ____ this month requires extra heat.",
      options: [
        { key: "A", text: "testing" },
        { key: "B", text: "which testing" },
        { key: "C", text: "being tested" },
        { key: "D", text: "who tested" }
      ],
      correctKey: "C",
      slot: "Being + participle",
      explain: "Which is being tested reduces to being tested. Testing would mean the method tests something."
    },
    {
      id: "Q06",
      stem: "The archive ____ on the north campus opened last spring.",
      options: [
        { key: "A", text: "locating" },
        { key: "B", text: "which locating" },
        { key: "C", text: "located" },
        { key: "D", text: "who located" }
      ],
      correctKey: "C",
      slot: "Passive · located",
      explain: "The archive is located there, so located is the reduced passive."
    },
    {
      id: "Q07",
      stem: "The software ____ for field use stores the files offline.",
      options: [
        { key: "A", text: "designing" },
        { key: "B", text: "which designing" },
        { key: "C", text: "who designed" },
        { key: "D", text: "designed" }
      ],
      correctKey: "D",
      slot: "Passive · designed",
      explain: "The software was designed, so designed is required, not designing."
    },
    {
      id: "Q08",
      stem: "The researchers ____ protective gear entered the chamber.",
      options: [
        { key: "A", text: "worn" },
        { key: "B", text: "who wearing" },
        { key: "C", text: "who worn" },
        { key: "D", text: "wearing" }
      ],
      correctKey: "D",
      slot: "Active · -ing",
      explain: "The researchers wear the gear, so wearing is required."
    },
    {
      id: "Q09",
      stem: "(A) Last year (B) the manuscript (C) writing in 1902 (D) was restored.",
      options: [
        { key: "A", text: "Last year" },
        { key: "B", text: "the manuscript" },
        { key: "C", text: "writing in 1902" },
        { key: "D", text: "was restored" }
      ],
      correctKey: "C",
      slot: "Error ID · written, not writing",
      explain: "Writing is active. The manuscript was written, so use written in 1902."
    },
    {
      id: "Q10",
      stem: "Anyone ____ this course must complete a field notebook.",
      options: [
        { key: "A", text: "taken" },
        { key: "B", text: "taking" },
        { key: "C", text: "who taking" },
        { key: "D", text: "who taken" }
      ],
      correctKey: "B",
      slot: "Active · -ing",
      explain: "Anyone taking this course reduces who is taking. Taken is passive."
    },
    {
      id: "Q11",
      stem: "The inscriptions ____ on the temple wall have faded.",
      options: [
        { key: "A", text: "appearing" },
        { key: "B", text: "appeared" },
        { key: "C", text: "who appearing" },
        { key: "D", text: "which appearing" }
      ],
      correctKey: "A",
      slot: "Active · -ing",
      explain: "The inscriptions appear on the wall, so appearing is the reduced active form."
    },
    {
      id: "Q12",
      stem: "(A) The letters (B) from the settlers (C) are stored (D) writing in ink.",
      options: [
        { key: "A", text: "The letters" },
        { key: "B", text: "from the settlers" },
        { key: "C", text: "are stored" },
        { key: "D", text: "writing in ink" }
      ],
      correctKey: "D",
      slot: "Error ID · written",
      explain: "Writing in ink is active. Use written in ink."
    },
    {
      id: "Q13",
      stem: "The chamber ____ for the trial is sealed at night.",
      options: [
        { key: "A", text: "used" },
        { key: "B", text: "using" },
        { key: "C", text: "who used" },
        { key: "D", text: "which using" }
      ],
      correctKey: "A",
      slot: "Passive · used",
      explain: "The chamber is used for the trial, so used is required."
    },
    {
      id: "Q14",
      stem: "The heat ____ by the reaction must be monitored.",
      options: [
        { key: "A", text: "producing" },
        { key: "B", text: "produced" },
        { key: "C", text: "which producing" },
        { key: "D", text: "who produced" }
      ],
      correctKey: "B",
      slot: "Passive · produced",
      explain: "The heat is produced by the reaction, so produced is required."
    },
    {
      id: "Q15",
      stem: "(A) Before Friday (B) anyone (C) taken the seminar (D) must register.",
      options: [
        { key: "A", text: "Before Friday" },
        { key: "B", text: "anyone" },
        { key: "C", text: "taken the seminar" },
        { key: "D", text: "must register" }
      ],
      correctKey: "C",
      slot: "Error ID · taking, not taken",
      explain: "Taken is passive. Anyone taking the seminar is the reduced active form."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Active · -ing", ids: ["Q01", "Q03", "Q08", "Q10", "Q11", "Q15"] },
    { label: "Passive · participle", ids: ["Q02", "Q04", "Q06", "Q07", "Q13", "Q14"] },
    { label: "Being / writing vs written", ids: ["Q05", "Q09", "Q12"] }
  ];

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
