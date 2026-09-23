(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> look immediately left of the blank. A preposition takes a gerund. Many verbs take <em>to</em> + base verb. Do not mix them.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Look left</strong><span>Is there a preposition (<em>in, of, by, without, for</em>) or a verb (<em>hope, enjoy, require</em>)?</span></article>
    <article><strong>2. Preposition → gerund</strong><span><em>interested in mapping, by recycling, without signing</em>.</span></article>
    <article><strong>3. Verb pattern</strong><span>Some verbs take <em>-ing</em> (enjoy, avoid, consider, suggest). Some take <em>to</em> + verb (hope, decide, plan, need, fail).</span></article>
    <article><strong>4. Verb + object</strong><span>Usually <em>to</em> + verb: <em>allow the team to conduct, require students to complete</em>.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>After a preposition</strong> → gerund, never <em>to</em> + verb.<br>
      ✓ <em>The team succeeded in <strong>collecting</strong> the samples.</em><br>
      ✗ <em>The team succeeded in to collect the samples.</em></li>
    <li><strong>Gerund verbs</strong> → enjoy, avoid, finish, consider, suggest, mind, keep, delay, practice, risk.<br>
      ✓ <em>Historians avoided <strong>damaging</strong> the original map.</em><br>
      ✗ <em>Historians avoided to damage the original map.</em></li>
    <li><strong>Infinitive verbs</strong> → hope, decide, plan, agree, refuse, seem, tend, fail, expect, need, want.<br>
      ✓ <em>The committee hopes <strong>to announce</strong> the results on Friday.</em><br>
      ✗ <em>The committee hopes announcing the results on Friday.</em></li>
    <li><strong>Verb + object + infinitive</strong> → allow, require, permit, force, enable, ask, tell.<br>
      ✓ <em>The policy requires students <strong>to complete</strong> a notebook.</em><br>
      ✗ <em>The policy requires students completing a notebook.</em></li>
    <li><strong>Be used to</strong> → gerund. <strong>Used to</strong> (past habit) → base verb.<br>
      ✓ <em>The botanist is used to <strong>working</strong> before dawn.</em><br>
      ✗ <em>The botanist is used to work before dawn.</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>If you see <em>in / of / by / without / for</em>, lock <em>-ing</em>. If you see <em>hope / decide / plan / need</em>, lock <em>to</em> + verb.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1",
      stem: "The team succeeded in ____ the samples before nightfall.",
      options: [
        { key: "A", text: "to collect" },
        { key: "B", text: "collecting" },
        { key: "C", text: "collect" },
        { key: "D", text: "collected" }
      ],
      correctKey: "B",
      slot: "After a preposition",
      teach: "In is a preposition, so collecting is required. Common trap: to collect after in."
    },
    {
      title: "Demo 2",
      stem: "Historians avoided ____ the original map.",
      options: [
        { key: "A", text: "to damage" },
        { key: "B", text: "damage" },
        { key: "C", text: "damaging" },
        { key: "D", text: "damaged" }
      ],
      correctKey: "C",
      slot: "Verb + gerund",
      teach: "Avoid takes a gerund: damaging. Common trap: to damage."
    },
    {
      title: "Demo 3",
      stem: "The committee hopes ____ the results on Friday.",
      options: [
        { key: "A", text: "to announce" },
        { key: "B", text: "announcing" },
        { key: "C", text: "announce" },
        { key: "D", text: "announced" }
      ],
      correctKey: "A",
      slot: "Verb + infinitive",
      teach: "Hope takes to + verb: to announce. Common trap: announcing."
    },
    {
      title: "Demo 4",
      stem: "The policy requires students ____ a field notebook.",
      options: [
        { key: "A", text: "completing" },
        { key: "B", text: "complete" },
        { key: "C", text: "completed" },
        { key: "D", text: "to complete" }
      ],
      correctKey: "D",
      slot: "Verb + object + infinitive",
      teach: "Require + object takes to + verb: requires students to complete. Common trap: completing."
    },
    {
      title: "Demo 5",
      stem: "(A) The botanist is interested (B) in (C) to restore (D) the wetland maps.",
      options: [
        { key: "A", text: "The botanist is interested" },
        { key: "B", text: "in" },
        { key: "C", text: "to restore" },
        { key: "D", text: "the wetland maps" }
      ],
      correctKey: "C",
      slot: "Error ID · preposition + gerund",
      teach: "After in, use restoring, not to restore. Common trap: hunting the wetland maps."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "The botanist is interested in ____ the wetland.",
      options: [
        { key: "A", text: "mapping" },
        { key: "B", text: "to map" },
        { key: "C", text: "map" },
        { key: "D", text: "mapped" }
      ],
      correctKey: "A",
      slot: "After a preposition",
      explain: "After in, use a gerund: mapping."
    },
    {
      id: "Q02",
      stem: "Researchers hope ____ the results next month.",
      options: [
        { key: "A", text: "to publish" },
        { key: "B", text: "publishing" },
        { key: "C", text: "publish" },
        { key: "D", text: "published" }
      ],
      correctKey: "A",
      slot: "Verb + infinitive",
      explain: "Hope takes to + verb: to publish."
    },
    {
      id: "Q03",
      stem: "The lab reduced waste by ____ the solvent.",
      options: [
        { key: "A", text: "to recycle" },
        { key: "B", text: "recycling" },
        { key: "C", text: "recycle" },
        { key: "D", text: "recycled" }
      ],
      correctKey: "B",
      slot: "After a preposition",
      explain: "After by, use a gerund: recycling."
    },
    {
      id: "Q04",
      stem: "The dean decided ____ the archive on Sundays.",
      options: [
        { key: "A", text: "opening" },
        { key: "B", text: "to open" },
        { key: "C", text: "open" },
        { key: "D", text: "opened" }
      ],
      correctKey: "B",
      slot: "Verb + infinitive",
      explain: "Decide takes to + verb: to open."
    },
    {
      id: "Q05",
      stem: "The panel considered ____ the method.",
      options: [
        { key: "A", text: "to revise" },
        { key: "B", text: "revise" },
        { key: "C", text: "revising" },
        { key: "D", text: "revised" }
      ],
      correctKey: "C",
      slot: "Verb + gerund",
      explain: "Consider takes a gerund: revising."
    },
    {
      id: "Q06",
      stem: "The excavation needs ____ at dawn.",
      options: [
        { key: "A", text: "starting" },
        { key: "B", text: "start" },
        { key: "C", text: "to start" },
        { key: "D", text: "started" }
      ],
      correctKey: "C",
      slot: "Verb + infinitive",
      explain: "Need takes to + verb: to start."
    },
    {
      id: "Q07",
      stem: "No one left the site without ____ the log.",
      options: [
        { key: "A", text: "to sign" },
        { key: "B", text: "sign" },
        { key: "C", text: "signed" },
        { key: "D", text: "signing" }
      ],
      correctKey: "D",
      slot: "After a preposition",
      explain: "After without, use a gerund: signing."
    },
    {
      id: "Q08",
      stem: "The grant will allow the team ____ a second season.",
      options: [
        { key: "A", text: "conducting" },
        { key: "B", text: "conduct" },
        { key: "C", text: "conducted" },
        { key: "D", text: "to conduct" }
      ],
      correctKey: "D",
      slot: "Verb + object + infinitive",
      explain: "Allow + object takes to + verb: allow the team to conduct."
    },
    {
      id: "Q09",
      stem: "(A) The team succeeded (B) in (C) to collect (D) the samples.",
      options: [
        { key: "A", text: "The team succeeded" },
        { key: "B", text: "in" },
        { key: "C", text: "to collect" },
        { key: "D", text: "the samples" }
      ],
      correctKey: "C",
      slot: "Error ID · preposition + gerund",
      explain: "After in, use collecting, not to collect."
    },
    {
      id: "Q10",
      stem: "The advisor suggested ____ the advanced seminar.",
      options: [
        { key: "A", text: "to take" },
        { key: "B", text: "taking" },
        { key: "C", text: "take" },
        { key: "D", text: "taken" }
      ],
      correctKey: "B",
      slot: "Verb + gerund",
      explain: "Suggest takes a gerund: taking. (That + subjunctive is a different pattern.)"
    },
    {
      id: "Q11",
      stem: "The museum plans ____ the collection next year.",
      options: [
        { key: "A", text: "to catalog" },
        { key: "B", text: "cataloging" },
        { key: "C", text: "catalog" },
        { key: "D", text: "cataloged" }
      ],
      correctKey: "A",
      slot: "Verb + infinitive",
      explain: "Plan takes to + verb: to catalog."
    },
    {
      id: "Q12",
      stem: "(A) In the lab (B) historians (C) enjoy (D) to restore damaged maps.",
      options: [
        { key: "A", text: "In the lab" },
        { key: "B", text: "historians" },
        { key: "C", text: "enjoy" },
        { key: "D", text: "to restore damaged maps" }
      ],
      correctKey: "D",
      slot: "Error ID · enjoy + gerund",
      explain: "Enjoy takes a gerund. Use restoring damaged maps."
    },
    {
      id: "Q13",
      stem: "The botanist is used to ____ before dawn.",
      options: [
        { key: "A", text: "working" },
        { key: "B", text: "work" },
        { key: "C", text: "worked" },
        { key: "D", text: "to work" }
      ],
      correctKey: "A",
      slot: "Be used to + gerund",
      explain: "Be used to takes a gerund: working. Used to + base verb is a different pattern (past habit)."
    },
    {
      id: "Q14",
      stem: "The software failed ____ the files overnight.",
      options: [
        { key: "A", text: "storing" },
        { key: "B", text: "to store" },
        { key: "C", text: "store" },
        { key: "D", text: "stored" }
      ],
      correctKey: "B",
      slot: "Verb + infinitive",
      explain: "Fail takes to + verb: to store."
    },
    {
      id: "Q15",
      stem: "(A) The chamber is used (B) for (C) to seal (D) the reaction.",
      options: [
        { key: "A", text: "The chamber is used" },
        { key: "B", text: "for" },
        { key: "C", text: "to seal" },
        { key: "D", text: "the reaction" }
      ],
      correctKey: "C",
      slot: "Error ID · for + gerund",
      explain: "After for, use sealing, not to seal."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Preposition + gerund", ids: ["Q01", "Q03", "Q07", "Q09", "Q15"] },
    { label: "Verb + gerund", ids: ["Q05", "Q10", "Q12", "Q13"] },
    { label: "Verb + infinitive", ids: ["Q02", "Q04", "Q06", "Q11", "Q14"] },
    { label: "Verb + object + infinitive", ids: ["Q08"] }
  ];

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
