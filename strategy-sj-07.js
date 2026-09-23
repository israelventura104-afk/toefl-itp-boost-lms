(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> after a demand, suggestion, or <em>it is essential that</em>, use the <em>base verb</em> — the dictionary form with no <em>-s</em>, no tense.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Spot the trigger</strong><span><em>suggest, recommend, insist, demand, require, request</em> + <em>that</em>, or <em>essential / important / necessary that</em>.</span></article>
    <article><strong>2. Find that + subject</strong><span>The verb after the person or thing is the subjunctive slot.</span></article>
    <article><strong>3. Use the base form</strong><span><em>that she go, that he be, that it remain</em> — not <em>goes / is / remains</em>.</span></article>
    <article><strong>4. Keep not and be</strong><span>Negative: <em>that they not enter</em>. Passive: <em>that the report be submitted</em>.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Verb + that + base</strong> → no <em>-s</em>, even with <em>he / she / it</em>.<br>
      ✓ <em>The advisor recommended that the student <strong>take</strong> the course.</em><br>
      ✗ <em>The advisor recommended that the student takes the course.</em></li>
    <li><strong>It is essential / important / necessary that</strong> → same base form.<br>
      ✓ <em>It is essential that every participant <strong>sign</strong> the form.</em><br>
      ✗ <em>It is essential that every participant signs the form.</em></li>
    <li><strong>Passive</strong> → <em>be</em> + past participle, not <em>is / was</em>.<br>
      ✓ <em>The dean insisted that the report <strong>be submitted</strong> by Friday.</em><br>
      ✗ <em>The dean insisted that the report is submitted by Friday.</em></li>
    <li><strong>Negative</strong> → <em>not</em> + base, not <em>does not</em>.<br>
      ✓ <em>The rules require that visitors <strong>not enter</strong> the lab.</em><br>
      ✗ <em>The rules require that visitors do not enter the lab.</em></li>
    <li><strong>Unreal <em>were</em></strong> → after <em>if / wish</em> for a situation that is not true.<br>
      ✓ <em>If the archive <strong>were</strong> open on Sundays, more historians would visit.</em><br>
      ✗ <em>If the archive was open on Sundays, more historians would visit.</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>The subject after <em>that</em> does not control the verb. <em>He, she, it, the committee</em> still take the base form: <em>be, go, remain, submit</em>.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1 · Recommend that + base",
      stem: "The advisor recommended that the student ____ the advanced seminar.",
      options: [
        { key: "A", text: "takes" },
        { key: "B", text: "taking" },
        { key: "C", text: "take" },
        { key: "D", text: "to take" }
      ],
      correctKey: "C",
      slot: "Verb + that + base",
      teach: "Recommended that triggers the subjunctive. Use take, not takes. Common trap: adding -s because student is singular."
    },
    {
      title: "Demo 2 · It is essential that",
      stem: "It is essential that every participant ____ a consent form.",
      options: [
        { key: "A", text: "sign" },
        { key: "B", text: "signs" },
        { key: "C", text: "signed" },
        { key: "D", text: "signing" }
      ],
      correctKey: "A",
      slot: "Essential that + base",
      teach: "It is essential that takes the base form: sign. Common trap: signs, the ordinary present."
    },
    {
      title: "Demo 3 · Passive be + participle",
      stem: "The dean insisted that the report ____ by Friday.",
      options: [
        { key: "A", text: "is submitted" },
        { key: "B", text: "was submitted" },
        { key: "C", text: "submitting" },
        { key: "D", text: "be submitted" }
      ],
      correctKey: "D",
      slot: "That + be + past participle",
      teach: "Insisted that + passive uses be submitted, not is submitted. Common trap: keeping ordinary present passive."
    },
    {
      title: "Demo 4 · Negative not + base",
      stem: "The guidelines require that visitors ____ the restricted stacks.",
      options: [
        { key: "A", text: "do not enter" },
        { key: "B", text: "not enter" },
        { key: "C", text: "not enters" },
        { key: "D", text: "not entering" }
      ],
      correctKey: "B",
      slot: "That + not + base",
      teach: "The negative subjunctive is not + base: not enter. Common trap: do not enter, which is ordinary present."
    },
    {
      title: "Demo 5 · Error ID · is instead of be",
      stem: "(A) The committee suggested (B) that the proposal (C) is revised (D) before the vote.",
      options: [
        { key: "A", text: "The committee suggested" },
        { key: "B", text: "that the proposal" },
        { key: "C", text: "is revised" },
        { key: "D", text: "before the vote" }
      ],
      correctKey: "C",
      slot: "Error ID · passive subjunctive",
      teach: "Is revised is ordinary present passive. After suggested that, use be revised. Common trap: hunting before the vote."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The professor suggested that each student ____ a first draft.",
      options: [
        { key: "A", text: "submit" },
        { key: "B", text: "submits" },
        { key: "C", text: "submitted" },
        { key: "D", text: "submitting" }
      ],
      correctKey: "A",
      slot: "Suggest that + base",
      explain: "Suggested that takes the base form submit, not submits."
    },
    {
      id: "Q02",
      stem: "It is important that the samples ____ refrigerated overnight.",
      options: [
        { key: "A", text: "be" },
        { key: "B", text: "are" },
        { key: "C", text: "is" },
        { key: "D", text: "being" }
      ],
      correctKey: "A",
      slot: "Important that + be",
      explain: "It is important that takes subjunctive be, not are."
    },
    {
      id: "Q03",
      stem: "If the archive ____ open on Sundays, more historians would visit.",
      options: [
        { key: "A", text: "was" },
        { key: "B", text: "were" },
        { key: "C", text: "is" },
        { key: "D", text: "be" }
      ],
      correctKey: "B",
      slot: "Unreal if + were",
      explain: "This is contrary to fact (it is not open). TOEFL wants were, not was. Be would be the mandative form, which does not fit an if-clause here."
    },
    {
      id: "Q04",
      stem: "The chair insisted that the speaker ____ on time.",
      options: [
        { key: "A", text: "goes" },
        { key: "B", text: "go" },
        { key: "C", text: "going" },
        { key: "D", text: "to go" }
      ],
      correctKey: "B",
      slot: "Insist that + base",
      explain: "Insisted that takes the base form go, not goes."
    },
    {
      id: "Q05",
      stem: "The regulations demand that the inspection ____ before opening day.",
      options: [
        { key: "A", text: "is completed" },
        { key: "B", text: "was completed" },
        { key: "C", text: "be completed" },
        { key: "D", text: "completing" }
      ],
      correctKey: "C",
      slot: "Demand that + be + participle",
      explain: "Demand that + passive uses be completed, not is completed."
    },
    {
      id: "Q06",
      stem: "It is essential that the temperature ____ constant during the trial.",
      options: [
        { key: "A", text: "remains" },
        { key: "B", text: "remaining" },
        { key: "C", text: "remain" },
        { key: "D", text: "remained" }
      ],
      correctKey: "C",
      slot: "Essential that + base",
      explain: "It is essential that takes remain, not remains."
    },
    {
      id: "Q07",
      stem: "The physician recommended that the patient ____ caffeine for a week.",
      options: [
        { key: "A", text: "does not drink" },
        { key: "B", text: "not drinks" },
        { key: "C", text: "is not drinking" },
        { key: "D", text: "not drink" }
      ],
      correctKey: "D",
      slot: "That + not + base",
      explain: "The negative subjunctive is not drink, not does not drink."
    },
    {
      id: "Q08",
      stem: "University policy requires that every intern ____ a faculty supervisor.",
      options: [
        { key: "A", text: "has" },
        { key: "B", text: "having" },
        { key: "C", text: "to have" },
        { key: "D", text: "have" }
      ],
      correctKey: "D",
      slot: "Require that + base",
      explain: "Requires that takes the base form have, not has."
    },
    {
      id: "Q09",
      stem: "(A) The advisor recommended (B) that the student (C) submits (D) the form today.",
      options: [
        { key: "A", text: "The advisor recommended" },
        { key: "B", text: "that the student" },
        { key: "C", text: "submits" },
        { key: "D", text: "the form today" }
      ],
      correctKey: "C",
      slot: "Error ID · no -s",
      explain: "Submits is ordinary present. After recommended that, use submit."
    },
    {
      id: "Q10",
      stem: "The editor requested that the citations ____ in APA style.",
      options: [
        { key: "A", text: "are" },
        { key: "B", text: "be" },
        { key: "C", text: "were" },
        { key: "D", text: "being" }
      ],
      correctKey: "B",
      slot: "Request that + be",
      explain: "Requested that takes be, not are."
    },
    {
      id: "Q11",
      stem: "It is necessary that the excavation ____ at dawn.",
      options: [
        { key: "A", text: "start" },
        { key: "B", text: "starts" },
        { key: "C", text: "started" },
        { key: "D", text: "starting" }
      ],
      correctKey: "A",
      slot: "Necessary that + base",
      explain: "It is necessary that takes the base form start."
    },
    {
      id: "Q12",
      stem: "The botanist wishes the greenhouse ____ closer to campus.",
      options: [
        { key: "A", text: "was" },
        { key: "B", text: "is" },
        { key: "C", text: "be" },
        { key: "D", text: "were" }
      ],
      correctKey: "D",
      slot: "Wish + were",
      explain: "Wish about an unreal present uses were. Be is the mandative form and does not follow wish here."
    },
    {
      id: "Q13",
      stem: "The reviewers suggested that the authors ____ the discussion section.",
      options: [
        { key: "A", text: "rewrite" },
        { key: "B", text: "rewrites" },
        { key: "C", text: "rewriting" },
        { key: "D", text: "to rewrite" }
      ],
      correctKey: "A",
      slot: "Suggest that + base",
      explain: "Suggested that takes rewrite. Authors is plural, but the reason is the subjunctive, not ordinary agreement."
    },
    {
      id: "Q14",
      stem: "(A) If the director (B) was available, (C) the tour would begin (D) at nine.",
      options: [
        { key: "A", text: "If the director" },
        { key: "B", text: "was available" },
        { key: "C", text: "the tour would begin" },
        { key: "D", text: "at nine" }
      ],
      correctKey: "B",
      slot: "Error ID · unreal were",
      explain: "Was available is ordinary past. This if-clause is hypothetical (would begin), so use were available."
    },
    {
      id: "Q15",
      stem: "(A) It is important (B) that the lab (C) remains (D) locked overnight.",
      options: [
        { key: "A", text: "It is important" },
        { key: "B", text: "that the lab" },
        { key: "C", text: "remains" },
        { key: "D", text: "locked overnight" }
      ],
      correctKey: "C",
      slot: "Error ID · essential/important that",
      explain: "Remains is ordinary present. After it is important that, use remain."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Verb / adjective + that + base", ids: ["Q01", "Q04", "Q06", "Q08", "Q09", "Q11", "Q13", "Q15"] },
    { label: "Be / not + base (passive & negative)", ids: ["Q02", "Q05", "Q07", "Q10"] },
    { label: "Unreal were", ids: ["Q03", "Q12", "Q14"] }
  ];

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
