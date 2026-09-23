(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> name the empty slot first, then pick the <em>word family</em> that fits: noun, verb, adjective, or adverb.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Name the slot</strong><span>Before a noun? After <em>be / seem / become</em>? Modifying a verb? After <em>the / a</em>?</span></article>
    <article><strong>2. Pick the family</strong><span>Noun names a thing. Adjective describes a noun. Adverb describes a verb or adjective. Verb shows the action.</span></article>
    <article><strong>3. Choose the suffix</strong><span><em>-tion / -ity / -ness</em> often nouns. <em>-ful / -al / -ous</em> adjectives. <em>-ly</em> adverbs.</span></article>
    <article><strong>4. Ignore “smart” cousins</strong><span>The longest or most academic-looking form is often the trap.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Before a noun</strong> → adjective, not adverb.<br>
      ✓ <em>a <strong>careful</strong> analysis</em><br>
      ✗ <em>a carefully analysis</em></li>
    <li><strong>Modifying a verb or adjective</strong> → adverb, not adjective.<br>
      ✓ <em>Temperatures rose <strong>sharply</strong>.</em><br>
      ✗ <em>Temperatures rose sharp.</em></li>
    <li><strong>After <em>the / a</em> as the head of the phrase</strong> → noun.<br>
      ✓ <em>The <strong>accuracy</strong> of the instrument was confirmed.</em><br>
      ✗ <em>The accurate of the instrument was confirmed.</em></li>
    <li><strong>After <em>be / seem / become</em></strong> → adjective.<br>
      ✓ <em>The climate became <strong>unstable</strong>.</em><br>
      ✗ <em>The climate became instability.</em></li>
    <li><strong><em>-ed</em> vs <em>-ing</em> adjectives</strong> → people often take <em>-ed</em>; things take <em>-ing</em>.<br>
      ✓ <em>The students were <strong>interested</strong>. The lecture was <strong>interesting</strong>.</em><br>
      ✗ <em>The students were interesting in the results.</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>Do not choose by meaning alone. <em>Accurate / accurately / accuracy</em> all “talk about being right,” but only one form fits the slot.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1 · Adjective before a noun",
      stem: "The researchers published a ____ summary of the field trial.",
      options: [
        { key: "A", text: "concise" },
        { key: "B", text: "concisely" },
        { key: "C", text: "conciseness" },
        { key: "D", text: "concising" }
      ],
      correctKey: "A",
      slot: "Adjective before noun",
      teach: "Summary is a noun, so the word in front must be an adjective: concise. Common trap: concisely, the adverb."
    },
    {
      title: "Demo 2 · Adverb modifying a verb",
      stem: "Average temperatures rose ____ during the last decade.",
      options: [
        { key: "A", text: "sharp" },
        { key: "B", text: "sharply" },
        { key: "C", text: "sharpness" },
        { key: "D", text: "sharpen" }
      ],
      correctKey: "B",
      slot: "Adverb modifying verb",
      teach: "Rose is a verb, so it needs an adverb: sharply. Common trap: sharp, the adjective."
    },
    {
      title: "Demo 3 · Noun after the",
      stem: "The ____ of the method was questioned by two reviewers.",
      options: [
        { key: "A", text: "accurate" },
        { key: "B", text: "accurately" },
        { key: "C", text: "accuracy" },
        { key: "D", text: "accurateness" }
      ],
      correctKey: "C",
      slot: "Noun after the",
      teach: "After the, the head of the phrase is a noun: accuracy. Common trap: accurate, which would need a noun after it (the accurate method)."
    },
    {
      title: "Demo 4 · -ed vs -ing",
      stem: "The visiting students were ____ in the archive’s oldest maps.",
      options: [
        { key: "A", text: "interesting" },
        { key: "B", text: "interest" },
        { key: "C", text: "interested" },
        { key: "D", text: "interestingly" }
      ],
      correctKey: "C",
      slot: "-ed adjective for people",
      teach: "People who feel something take -ed: interested. Interesting describes the thing that causes the feeling. Common trap: interesting because the maps are the topic."
    },
    {
      title: "Demo 5 · Error ID · adjective used as adverb",
      stem: "(A) The team completed (B) the restoration (C) successful (D) last month.",
      options: [
        { key: "A", text: "The team completed" },
        { key: "B", text: "the restoration" },
        { key: "C", text: "successful" },
        { key: "D", text: "last month" }
      ],
      correctKey: "C",
      slot: "Error ID · adverb slot",
      teach: "Successful is an adjective, but it is modifying the verb completed. Use successfully. Common trap: hunting last month, which is already a correct time phrase."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The committee requested a ____ review of the grant application.",
      options: [
        { key: "A", text: "thorough" },
        { key: "B", text: "thoroughly" },
        { key: "C", text: "thoroughness" },
        { key: "D", text: "thoroughing" }
      ],
      correctKey: "A",
      slot: "Adjective before noun",
      explain: "Review is a noun, so thorough (adjective) is required, not thoroughly."
    },
    {
      id: "Q02",
      stem: "The glacier retreated ____ after several warm summers.",
      options: [
        { key: "A", text: "rapidly" },
        { key: "B", text: "rapid" },
        { key: "C", text: "rapidity" },
        { key: "D", text: "rapidness" }
      ],
      correctKey: "A",
      slot: "Adverb modifying verb",
      explain: "Retreated is a verb, so the adverb rapidly is required."
    },
    {
      id: "Q03",
      stem: "The ____ of the sample surprised the chemists.",
      options: [
        { key: "A", text: "dense" },
        { key: "B", text: "density" },
        { key: "C", text: "densely" },
        { key: "D", text: "denser" }
      ],
      correctKey: "B",
      slot: "Noun after the",
      explain: "After the, the head of the phrase is a noun: density, not dense."
    },
    {
      id: "Q04",
      stem: "The new evidence seemed ____ to most of the panel.",
      options: [
        { key: "A", text: "reliability" },
        { key: "B", text: "reliable" },
        { key: "C", text: "reliably" },
        { key: "D", text: "rely" }
      ],
      correctKey: "B",
      slot: "Adjective after seem",
      explain: "After seem, use an adjective: reliable. Reliability is a noun."
    },
    {
      id: "Q05",
      stem: "The findings were ____ consistent across the three sites.",
      options: [
        { key: "A", text: "remark" },
        { key: "B", text: "remarkable" },
        { key: "C", text: "remarkably" },
        { key: "D", text: "remarking" }
      ],
      correctKey: "C",
      slot: "Adverb modifying adjective",
      explain: "Consistent is an adjective, so it is modified by the adverb remarkably."
    },
    {
      id: "Q06",
      stem: "The procedure is ____ for first-year laboratory students.",
      options: [
        { key: "A", text: "suitability" },
        { key: "B", text: "suitably" },
        { key: "C", text: "suitable" },
        { key: "D", text: "suit" }
      ],
      correctKey: "C",
      slot: "Adjective after be",
      explain: "After is, use an adjective: suitable, not suitability."
    },
    {
      id: "Q07",
      stem: "____ is essential before excavation can begin.",
      options: [
        { key: "A", text: "Document" },
        { key: "B", text: "Documentary" },
        { key: "C", text: "Documented" },
        { key: "D", text: "Documentation" }
      ],
      correctKey: "D",
      slot: "Noun as subject",
      explain: "The subject of is essential must be a noun: Documentation."
    },
    {
      id: "Q08",
      stem: "They proposed a ____ model of bird migration.",
      options: [
        { key: "A", text: "theory" },
        { key: "B", text: "theoretically" },
        { key: "C", text: "theorize" },
        { key: "D", text: "theoretical" }
      ],
      correctKey: "D",
      slot: "Adjective before noun",
      explain: "Model is a noun, so theoretical (adjective) is required."
    },
    {
      id: "Q09",
      stem: "(A) The committee reviewed (B) the proposal (C) careful (D) before voting.",
      options: [
        { key: "A", text: "The committee reviewed" },
        { key: "B", text: "the proposal" },
        { key: "C", text: "careful" },
        { key: "D", text: "before voting" }
      ],
      correctKey: "C",
      slot: "Error ID · adverb slot",
      explain: "Careful is an adjective modifying the verb reviewed. Use carefully."
    },
    {
      id: "Q10",
      stem: "Scientists debated the ____ of the new dating method.",
      options: [
        { key: "A", text: "valid" },
        { key: "B", text: "validity" },
        { key: "C", text: "validly" },
        { key: "D", text: "validate" }
      ],
      correctKey: "B",
      slot: "Noun after the",
      explain: "After the, use the noun validity. Valid would need a noun after it."
    },
    {
      id: "Q11",
      stem: "A ____ explanation appeared in the technical appendix.",
      options: [
        { key: "A", text: "plausible" },
        { key: "B", text: "plausibly" },
        { key: "C", text: "plausibility" },
        { key: "D", text: "plausibleness" }
      ],
      correctKey: "A",
      slot: "Adjective before noun",
      explain: "Explanation is a noun, so plausible is the matching adjective."
    },
    {
      id: "Q12",
      stem: "The river flooded ____ after the mountain storm.",
      options: [
        { key: "A", text: "extensive" },
        { key: "B", text: "extension" },
        { key: "C", text: "extend" },
        { key: "D", text: "extensively" }
      ],
      correctKey: "D",
      slot: "Adverb modifying verb",
      explain: "Flooded is a verb, so extensively (adverb) is required."
    },
    {
      id: "Q13",
      stem: "____ is required before the samples can be shipped.",
      options: [
        { key: "A", text: "Confirm" },
        { key: "B", text: "Confirmation" },
        { key: "C", text: "Confirmed" },
        { key: "D", text: "Confirms" }
      ],
      correctKey: "B",
      slot: "Noun as subject",
      explain: "The subject of is required must be a noun: Confirmation."
    },
    {
      id: "Q14",
      stem: "(A) The accurate (B) of the instrument (C) was confirmed (D) in two trials.",
      options: [
        { key: "A", text: "The accurate" },
        { key: "B", text: "of the instrument" },
        { key: "C", text: "was confirmed" },
        { key: "D", text: "in two trials" }
      ],
      correctKey: "A",
      slot: "Error ID · noun after the",
      explain: "The accurate is missing a noun head. Use The accuracy of the instrument."
    },
    {
      id: "Q15",
      stem: "(A) The students answered (B) the questions (C) complete (D) on the first attempt.",
      options: [
        { key: "A", text: "The students answered" },
        { key: "B", text: "the questions" },
        { key: "C", text: "complete" },
        { key: "D", text: "on the first attempt" }
      ],
      correctKey: "C",
      slot: "Error ID · adverb slot",
      explain: "Complete is an adjective, but it modifies answered. Use completely."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Adjective slots", ids: ["Q01", "Q04", "Q06", "Q08", "Q11"] },
    { label: "Adverb slots", ids: ["Q02", "Q05", "Q09", "Q12", "Q15"] },
    { label: "Noun slots", ids: ["Q03", "Q07", "Q10", "Q13", "Q14"] }
  ];

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
