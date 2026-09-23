(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> a noun clause acts like a noun. After <em>know, explain, ask, show</em>, keep <em>statement</em> word order inside the clause.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Find the clause</strong><span>It often starts with <em>that, whether, what, where, why, how, when, who</em>.</span></article>
    <article><strong>2. Drop the question shape</strong><span>No <em>do / did / does</em> and no auxiliary before the subject.</span></article>
    <article><strong>3. Keep subject + verb</strong><span><em>why the ice melted</em>, not <em>why did the ice melt</em>.</span></article>
    <article><strong>4. Use whether for yes/no</strong><span>After <em>ask / not clear / wonder</em>, prefer <em>whether + subject + verb</em>.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Embedded WH-question</strong> → statement order.<br>
      ✓ <em>Researchers cannot explain <strong>why the glacier retreated</strong>.</em><br>
      ✗ <em>Researchers cannot explain why did the glacier retreat.</em></li>
    <li><strong>What-clause as subject</strong> → <em>what</em> + subject + verb.<br>
      ✓ <em><strong>What the sample contained</strong> surprised the chemists.</em><br>
      ✗ <em>What did the sample contain surprised the chemists.</em></li>
    <li><strong>Whether</strong> → yes/no meaning, still statement order.<br>
      ✓ <em>The dean asked <strong>whether the internship could start</strong> in June.</em><br>
      ✗ <em>The dean asked whether could the internship start in June.</em></li>
    <li><strong>That-clause</strong> → after <em>show, indicate, confirm</em>.<br>
      ✓ <em>The evidence indicates <strong>that the theory needs revision</strong>.</em><br>
      ✗ <em>The evidence indicates that does the theory need revision.</em></li>
    <li><strong>The fact that</strong> → <em>that</em>, not <em>what</em>.<br>
      ✓ <em>the fact <strong>that</strong> the method failed</em><br>
      ✗ <em>the fact what the method failed</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>If you could ask it as a question, you still cannot invert it after a verb like <em>know</em> or <em>explain</em>. Put the subject first.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "Researchers cannot explain ____ so quickly.",
      options: [
        { key: "A", text: "why did the glacier retreat" },
        { key: "B", text: "why the glacier retreated" },
        { key: "C", text: "why retreated the glacier" },
        { key: "D", text: "why does the glacier retreat" }
      ],
      correctKey: "B",
      slot: "Embedded why · statement order",
      teach: "After explain, use why + subject + verb: why the glacier retreated. Common trap: keeping question order with did."
    },
    {
      title: "Demo 2",
      stem: "____ surprised the chemists.",
      options: [
        { key: "A", text: "What did the sample contain" },
        { key: "B", text: "What the sample contained" },
        { key: "C", text: "What contained the sample" },
        { key: "D", text: "What does the sample contain" }
      ],
      correctKey: "B",
      slot: "What-clause as subject",
      teach: "A what-clause used as a subject still has statement order: What the sample contained. Common trap: What did the sample contain."
    },
    {
      title: "Demo 3",
      stem: "The committee asked ____ the guidelines.",
      options: [
        { key: "A", text: "whether did the proposal meet" },
        { key: "B", text: "whether the proposal met" },
        { key: "C", text: "whether met the proposal" },
        { key: "D", text: "whether does the proposal meet" }
      ],
      correctKey: "B",
      slot: "Whether · statement order",
      teach: "Whether takes subject + verb: whether the proposal met. Common trap: whether did the proposal meet."
    },
    {
      title: "Demo 4",
      stem: "The evidence indicates ____.",
      options: [
        { key: "A", text: "that the theory needs revision" },
        { key: "B", text: "that does the theory need revision" },
        { key: "C", text: "what does the theory need" },
        { key: "D", text: "why does the theory need revision" }
      ],
      correctKey: "A",
      slot: "That-clause",
      teach: "After indicate, a that-clause keeps statement order: that the theory needs revision. Common trap: inserting does."
    },
    {
      title: "Demo 5",
      stem: "(A) The report does not explain (B) where did (C) the samples originate (D) last winter.",
      options: [
        { key: "A", text: "The report does not explain" },
        { key: "B", text: "where did" },
        { key: "C", text: "the samples originate" },
        { key: "D", text: "last winter" }
      ],
      correctKey: "B",
      slot: "Error ID · no did",
      teach: "Where did keeps question order. After explain, use where the samples originated. Common trap: hunting last winter."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "No one knows ____.",
      options: [
        { key: "A", text: "where the archives were moved" },
        { key: "B", text: "where were the archives moved" },
        { key: "C", text: "where did the archives move" },
        { key: "D", text: "where are the archives moved" }
      ],
      correctKey: "A",
      slot: "Embedded where",
      explain: "After know, use where + subject + verb: where the archives were moved."
    },
    {
      id: "Q02",
      stem: "____ was unexpected.",
      options: [
        { key: "A", text: "What the survey found" },
        { key: "B", text: "What did the survey find" },
        { key: "C", text: "What found the survey" },
        { key: "D", text: "What does the survey find" }
      ],
      correctKey: "A",
      slot: "What-clause as subject",
      explain: "The subject is a noun clause with statement order: What the survey found."
    },
    {
      id: "Q03",
      stem: "The dean asked ____ in June.",
      options: [
        { key: "A", text: "whether could the internship start" },
        { key: "B", text: "whether the internship could start" },
        { key: "C", text: "whether did the internship start" },
        { key: "D", text: "whether starts the internship" }
      ],
      correctKey: "B",
      slot: "Whether",
      explain: "Whether takes statement order: whether the internship could start."
    },
    {
      id: "Q04",
      stem: "Geologists described ____.",
      options: [
        { key: "A", text: "how were the aqueducts built" },
        { key: "B", text: "how the aqueducts were built" },
        { key: "C", text: "how did they build the aqueducts" },
        { key: "D", text: "how built the aqueducts" }
      ],
      correctKey: "B",
      slot: "Embedded how",
      explain: "After described, use how + subject + verb: how the aqueducts were built."
    },
    {
      id: "Q05",
      stem: "The lecture explained ____ so rapidly.",
      options: [
        { key: "A", text: "why did bee populations decline" },
        { key: "B", text: "why declined bee populations" },
        { key: "C", text: "why bee populations declined" },
        { key: "D", text: "why do bee populations decline" }
      ],
      correctKey: "C",
      slot: "Embedded why",
      explain: "After explained, use why bee populations declined, not why did they decline."
    },
    {
      id: "Q06",
      stem: "Researchers recorded ____ during the storm.",
      options: [
        { key: "A", text: "what did the instruments measure" },
        { key: "B", text: "what measured the instruments" },
        { key: "C", text: "what the instruments measured" },
        { key: "D", text: "what do the instruments measure" }
      ],
      correctKey: "C",
      slot: "Embedded what",
      explain: "Use what + subject + verb: what the instruments measured."
    },
    {
      id: "Q07",
      stem: "It is not yet clear ____ the heat.",
      options: [
        { key: "A", text: "if did the samples survive" },
        { key: "B", text: "whether did the samples survive" },
        { key: "C", text: "if survived the samples" },
        { key: "D", text: "whether the samples survived" }
      ],
      correctKey: "D",
      slot: "Whether after it is clear",
      explain: "After it is not clear, use whether the samples survived."
    },
    {
      id: "Q08",
      stem: "The museum could not determine ____ the manuscript.",
      options: [
        { key: "A", text: "who did donate" },
        { key: "B", text: "who had he donated" },
        { key: "C", text: "whom did donate" },
        { key: "D", text: "who had donated" }
      ],
      correctKey: "D",
      slot: "Embedded who",
      explain: "Who is the subject of the clause, so use who had donated, not who did donate."
    },
    {
      id: "Q09",
      stem: "(A) Scientists cannot explain (B) why (C) did the ice melt (D) so quickly.",
      options: [
        { key: "A", text: "Scientists cannot explain" },
        { key: "B", text: "why" },
        { key: "C", text: "did the ice melt" },
        { key: "D", text: "so quickly" }
      ],
      correctKey: "C",
      slot: "Error ID · no did",
      explain: "Did the ice melt is question order. Use the ice melted."
    },
    {
      id: "Q10",
      stem: "I wonder ____ the results.",
      options: [
        { key: "A", text: "when will the committee announce" },
        { key: "B", text: "when the committee will announce" },
        { key: "C", text: "when does the committee announce" },
        { key: "D", text: "when announces the committee" }
      ],
      correctKey: "B",
      slot: "Embedded when",
      explain: "After wonder, keep will after the subject: when the committee will announce."
    },
    {
      id: "Q11",
      stem: "The notes do not say ____.",
      options: [
        { key: "A", text: "when the excavation began" },
        { key: "B", text: "when did the excavation begin" },
        { key: "C", text: "when began the excavation" },
        { key: "D", text: "when does the excavation begin" }
      ],
      correctKey: "A",
      slot: "Embedded when",
      explain: "Use when the excavation began, not when did the excavation begin."
    },
    {
      id: "Q12",
      stem: "(A) The report (B) does not state (C) how long (D) did the eruption last.",
      options: [
        { key: "A", text: "The report" },
        { key: "B", text: "does not state" },
        { key: "C", text: "how long" },
        { key: "D", text: "did the eruption last" }
      ],
      correctKey: "D",
      slot: "Error ID · how long",
      explain: "Did the eruption last is question order. Use the eruption lasted."
    },
    {
      id: "Q13",
      stem: "____ remains uncertain.",
      options: [
        { key: "A", text: "How the fire started" },
        { key: "B", text: "How did the fire start" },
        { key: "C", text: "How started the fire" },
        { key: "D", text: "How does the fire start" }
      ],
      correctKey: "A",
      slot: "How-clause as subject",
      explain: "The subject is a noun clause: How the fire started."
    },
    {
      id: "Q14",
      stem: "The appendix lists ____.",
      options: [
        { key: "A", text: "where was each sample collected" },
        { key: "B", text: "where each sample was collected" },
        { key: "C", text: "where did each sample collect" },
        { key: "D", text: "where collected each sample" }
      ],
      correctKey: "B",
      slot: "Embedded where + passive",
      explain: "Use where each sample was collected, not where was each sample collected."
    },
    {
      id: "Q15",
      stem: "(A) The committee wondered (B) whether (C) should the lab (D) stay closed.",
      options: [
        { key: "A", text: "The committee wondered" },
        { key: "B", text: "whether" },
        { key: "C", text: "should the lab" },
        { key: "D", text: "stay closed" }
      ],
      correctKey: "C",
      slot: "Error ID · whether + statement order",
      explain: "Should the lab inverts the subject. Use the lab should."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Embedded WH (statement order)", ids: ["Q01", "Q04", "Q05", "Q06", "Q08", "Q10", "Q11", "Q14"] },
    { label: "Clause as subject", ids: ["Q02", "Q13"] },
    { label: "Whether / that", ids: ["Q03", "Q07"] },
    { label: "Error ID · no inversion", ids: ["Q09", "Q12", "Q15"] }
  ];

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
