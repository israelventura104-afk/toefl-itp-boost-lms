(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> if the subject <em>receives</em> the action, do not use an active verb. Use <em>be</em> + past participle.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Ask who does it</strong><span>If the subject is not the doer, you need passive.</span></article>
    <article><strong>2. Put be + past participle</strong><span><em>is stored, was published, has been tested, will be announced</em>.</span></article>
    <article><strong>3. Match time on be</strong><span>Present, past, present perfect, or future lives on <em>be</em>, not on a bare participle.</span></article>
    <article><strong>4. After a modal</strong><span><em>must / should / can / will</em> + <em>be</em> + participle: <em>must be labeled</em>.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Present / past be</strong> → the subject receives the action.<br>
      ✓ <em>The files <strong>are stored</strong> in a locked cabinet.</em><br>
      ✗ <em>The files store in a locked cabinet.</em></li>
    <li><strong>Modal + be + participle</strong><br>
      ✓ <em>Every file <strong>must be labeled</strong> before storage.</em><br>
      ✗ <em>Every file must labeled before storage.</em></li>
    <li><strong>Present perfect passive</strong> → <em>has / have been</em> + participle.<br>
      ✓ <em>The method <strong>has been tested</strong> in two trials.</em><br>
      ✗ <em>The method has tested in two trials.</em></li>
    <li><strong>Progressive passive</strong> → <em>is being</em> + participle.<br>
      ✓ <em>The method <strong>is being tested</strong> this month.</em><br>
      ✗ <em>The method is testing this month</em> (that would mean the method tests something).</li>
    <li><strong>Do not drop be</strong> in a full clause. A bare participle is a reduced relative, not a main verb.<br>
      ✓ <em>The cores <strong>were collected</strong> in 2014.</em><br>
      ✗ <em>The cores collected in 2014.</em> as a complete sentence</li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>The time marker tells you the form of <em>be</em>. The main verb stays a past participle: <em>stored, published, tested, announced</em>.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "The samples ____ every morning before analysis.",
      options: [
        { key: "A", text: "collect" },
        { key: "B", text: "are collected" },
        { key: "C", text: "collecting" },
        { key: "D", text: "have collect" }
      ],
      correctKey: "B",
      slot: "Present passive",
      teach: "The samples receive the action, so are collected is required. Common trap: collect, the active form."
    },
    {
      title: "Demo 2",
      stem: "The report ____ last year by two independent reviewers.",
      options: [
        { key: "A", text: "published" },
        { key: "B", text: "is publish" },
        { key: "C", text: "was published" },
        { key: "D", text: "has publish" }
      ],
      correctKey: "C",
      slot: "Past passive",
      teach: "Last year marks past. The report receives the action, so was published is required. Published alone is not a full main verb here."
    },
    {
      title: "Demo 3",
      stem: "The files ____ offline during field work.",
      options: [
        { key: "A", text: "must store" },
        { key: "B", text: "must stored" },
        { key: "C", text: "must be store" },
        { key: "D", text: "must be stored" }
      ],
      correctKey: "D",
      slot: "Modal + be + participle",
      teach: "After must, passive is must be stored. Common traps: dropping be, or using store instead of stored."
    },
    {
      title: "Demo 4",
      stem: "The dating method ____ in two separate trials.",
      options: [
        { key: "A", text: "has been tested" },
        { key: "B", text: "has tested" },
        { key: "C", text: "was test" },
        { key: "D", text: "have been test" }
      ],
      correctKey: "A",
      slot: "Present perfect passive",
      teach: "The method receives the testing, so has been tested is required. Has tested would make the method the doer."
    },
    {
      title: "Demo 5",
      stem: "(A) The proposal (B) must submitted (C) before Friday (D) this term.",
      options: [
        { key: "A", text: "The proposal" },
        { key: "B", text: "must submitted" },
        { key: "C", text: "before Friday" },
        { key: "D", text: "this term" }
      ],
      correctKey: "B",
      slot: "Error ID · missing be",
      teach: "Must submitted is missing be. Use must be submitted. Common trap: hunting before Friday."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The files ____ in a locked cabinet overnight.",
      options: [
        { key: "A", text: "are stored" },
        { key: "B", text: "store" },
        { key: "C", text: "storing" },
        { key: "D", text: "have store" }
      ],
      correctKey: "A",
      slot: "Present passive",
      explain: "The files receive the action, so are stored is required."
    },
    {
      id: "Q02",
      stem: "The chamber ____ at night during the trial.",
      options: [
        { key: "A", text: "was sealed" },
        { key: "B", text: "sealed" },
        { key: "C", text: "is seal" },
        { key: "D", text: "has seal" }
      ],
      correctKey: "A",
      slot: "Past passive",
      explain: "During the trial is past. The chamber receives the action, so was sealed is required."
    },
    {
      id: "Q03",
      stem: "Every file ____ before storage.",
      options: [
        { key: "A", text: "must label" },
        { key: "B", text: "must be labeled" },
        { key: "C", text: "must labeled" },
        { key: "D", text: "must be label" }
      ],
      correctKey: "B",
      slot: "Modal + be + participle",
      explain: "After must, use be + past participle: must be labeled."
    },
    {
      id: "Q04",
      stem: "The accuracy of the instrument ____ in two trials.",
      options: [
        { key: "A", text: "has confirmed" },
        { key: "B", text: "has been confirmed" },
        { key: "C", text: "was confirm" },
        { key: "D", text: "have been confirm" }
      ],
      correctKey: "B",
      slot: "Present perfect passive",
      explain: "Accuracy receives the action, so has been confirmed is required, not has confirmed."
    },
    {
      id: "Q05",
      stem: "The results ____ on Friday.",
      options: [
        { key: "A", text: "will announce" },
        { key: "B", text: "will announced" },
        { key: "C", text: "will be announced" },
        { key: "D", text: "will be announce" }
      ],
      correctKey: "C",
      slot: "Future passive",
      explain: "The results receive the action, so will be announced is required."
    },
    {
      id: "Q06",
      stem: "The cores ____ in 2014.",
      options: [
        { key: "A", text: "collected" },
        { key: "B", text: "were collect" },
        { key: "C", text: "were collected" },
        { key: "D", text: "have collect" }
      ],
      correctKey: "C",
      slot: "Past passive as main verb",
      explain: "As a complete sentence, the cores need were collected. Collected alone is not a full main verb here."
    },
    {
      id: "Q07",
      stem: "The heat from the reaction ____ from the control room.",
      options: [
        { key: "A", text: "can monitor" },
        { key: "B", text: "can monitored" },
        { key: "C", text: "can be monitor" },
        { key: "D", text: "can be monitored" }
      ],
      correctKey: "D",
      slot: "Modal + be + participle",
      explain: "After can, use be + past participle: can be monitored."
    },
    {
      id: "Q08",
      stem: "The grant application ____ by two independent readers.",
      options: [
        { key: "A", text: "should review" },
        { key: "B", text: "should reviewed" },
        { key: "C", text: "should be review" },
        { key: "D", text: "should be reviewed" }
      ],
      correctKey: "D",
      slot: "Modal + be + participle",
      explain: "After should, use be + past participle: should be reviewed."
    },
    {
      id: "Q09",
      stem: "(A) The proposal (B) must (C) submitted (D) before Friday.",
      options: [
        { key: "A", text: "The proposal" },
        { key: "B", text: "must" },
        { key: "C", text: "submitted" },
        { key: "D", text: "before Friday" }
      ],
      correctKey: "C",
      slot: "Error ID · missing be",
      explain: "Submitted after must needs be: must be submitted."
    },
    {
      id: "Q10",
      stem: "The method ____ this month.",
      options: [
        { key: "A", text: "is testing" },
        { key: "B", text: "is being tested" },
        { key: "C", text: "is been tested" },
        { key: "D", text: "being test" }
      ],
      correctKey: "B",
      slot: "Progressive passive",
      explain: "The method receives the testing now, so is being tested is required. Is testing would make the method the doer."
    },
    {
      id: "Q11",
      stem: "The catalogs ____ since last spring.",
      options: [
        { key: "A", text: "have been digitized" },
        { key: "B", text: "have digitized" },
        { key: "C", text: "were digitize" },
        { key: "D", text: "has been digitize" }
      ],
      correctKey: "A",
      slot: "Present perfect passive",
      explain: "Since last spring takes present perfect. The catalogs receive the action, so have been digitized."
    },
    {
      id: "Q12",
      stem: "(A) Every morning (B) before analysis (C) the samples (D) collect in the lab.",
      options: [
        { key: "A", text: "Every morning" },
        { key: "B", text: "before analysis" },
        { key: "C", text: "the samples" },
        { key: "D", text: "collect in the lab" }
      ],
      correctKey: "D",
      slot: "Error ID · active used as passive",
      explain: "Collect is active. The samples receive the action, so use are collected in the lab."
    },
    {
      id: "Q13",
      stem: "The manuscript ____ in storage.",
      options: [
        { key: "A", text: "was damaged" },
        { key: "B", text: "damaged" },
        { key: "C", text: "is damage" },
        { key: "D", text: "has damage" }
      ],
      correctKey: "A",
      slot: "Past passive",
      explain: "The manuscript receives the damage, so was damaged is required."
    },
    {
      id: "Q14",
      stem: "The site ____ before the eruption.",
      options: [
        { key: "A", text: "had evacuated" },
        { key: "B", text: "had been evacuated" },
        { key: "C", text: "was evacuate" },
        { key: "D", text: "has been evacuate" }
      ],
      correctKey: "B",
      slot: "Past perfect passive",
      explain: "Before the eruption, the earlier action is past perfect. The site receives the action, so had been evacuated."
    },
    {
      id: "Q15",
      stem: "(A) The accuracy (B) of the instrument (C) has confirmed (D) in two trials.",
      options: [
        { key: "A", text: "The accuracy" },
        { key: "B", text: "of the instrument" },
        { key: "C", text: "has confirmed" },
        { key: "D", text: "in two trials" }
      ],
      correctKey: "C",
      slot: "Error ID · missing been",
      explain: "Has confirmed makes accuracy the doer. Use has been confirmed."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Be + participle (present/past)", ids: ["Q01", "Q02", "Q06", "Q13"] },
    { label: "Modal + be + participle", ids: ["Q03", "Q07", "Q08", "Q09"] },
    { label: "Perfect / progressive passive", ids: ["Q04", "Q05", "Q10", "Q11", "Q14", "Q15"] },
    { label: "Active used as passive", ids: ["Q12"] }
  ];

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
