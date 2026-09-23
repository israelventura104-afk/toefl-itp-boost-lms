(() => {
  const teachHtml = `
<div class="prose">
  <p><strong>Goal today:</strong> find the correlative pair, then let the noun <em>closest to the verb</em> control agreement.</p>
  <h3>How to decide</h3>
  <div class="slot-grid">
    <article><strong>1. Find the pair</strong><span><em>Either…or</em>, <em>neither…nor</em>, or <em>both…and</em>.</span></article>
    <article><strong>2. Find the nearer noun</strong><span>The noun sitting just before the verb decides singular or plural.</span></article>
    <article><strong>3. Match the verb</strong><span>Singular nearer noun → singular verb. Plural nearer noun → plural verb.</span></article>
    <article><strong>4. Do not mix pairs</strong><span><em>As well as</em> is not correlative. It does not join two subjects.</span></article>
  </div>

  <h3>High-yield patterns (with examples)</h3>
  <ul>
    <li><strong>Either…or</strong> → agree with the nearer subject.<br>
      ✓ <em>Either the instructor or the students <strong>are</strong> responsible.</em><br>
      ✗ <em>Either the instructor or the students is responsible.</em></li>
    <li><strong>Neither…nor</strong> → agree with the nearer subject.<br>
      ✓ <em>Neither the students nor the instructor <strong>is</strong> available.</em><br>
      ✗ <em>Neither the students nor the instructor are available.</em></li>
    <li><strong>Flip the order, flip the verb</strong> → the first noun is often a trap.<br>
      ✓ <em>Neither the instructor nor the students <strong>are</strong> available.</em><br>
      ✗ <em>Neither the instructor nor the students is available.</em></li>
    <li><strong>Both…and</strong> → always plural.<br>
      ✓ <em>Both the lecture and the workshop <strong>are</strong> required.</em><br>
      ✗ <em>Both the lecture and the workshop is required.</em></li>
    <li><strong>As well as is not a pair</strong> → the first noun stays the subject.<br>
      ✓ <em>The instructor, as well as the students, <strong>is</strong> ready.</em><br>
      ✗ <em>The instructor, as well as the students, are ready.</em></li>
  </ul>

  <div class="callout">
    <strong>Remember</strong>
    <p>The first subject may be a trap. Look immediately before the verb, then lock singular or plural.</p>
  </div>
</div>
`;

  const demos = [
    {
      title: "Demo 1 · Either…or (nearer plural)",
      stem: "Either the assistant or the professors ____ the report each Friday.",
      options: [
        { key: "A", text: "reviews" },
        { key: "B", text: "reviewing" },
        { key: "C", text: "has reviewed" },
        { key: "D", text: "review" }
      ],
      correctKey: "D",
      slot: "Either…or · nearer plural",
      teach: "The nearer subject is professors (plural), so review is required. Common trap: agreeing with assistant because it comes first."
    },
    {
      title: "Demo 2 · Neither…nor (nearer singular)",
      stem: "Neither the tutors nor the coordinator ____ available this afternoon.",
      options: [
        { key: "A", text: "were" },
        { key: "B", text: "has been" },
        { key: "C", text: "are" },
        { key: "D", text: "is" }
      ],
      correctKey: "D",
      slot: "Neither…nor · nearer singular",
      teach: "The nearer subject is coordinator (singular), so is is required. Common trap: choosing are because tutors is plural."
    },
    {
      title: "Demo 3 · Both…and",
      stem: "Both the lecture and the workshop ____ required for first-year students.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "are" },
        { key: "C", text: "was" },
        { key: "D", text: "has been" }
      ],
      correctKey: "B",
      slot: "Both…and · always plural",
      teach: "Both…and joins two subjects and takes a plural verb. Common trap: treating the nearer noun as if this were either…or."
    },
    {
      title: "Demo 4 · Either…or (nearer singular)",
      stem: "Either the professors or the assistant ____ the report each Friday.",
      options: [
        { key: "A", text: "reviews" },
        { key: "B", text: "review" },
        { key: "C", text: "have reviewed" },
        { key: "D", text: "are reviewing" }
      ],
      correctKey: "A",
      slot: "Either…or · nearer singular",
      teach: "Same pair as Demo 1, flipped. The nearer subject is assistant (singular) → reviews. Common trap: keeping the plural verb from the first noun."
    },
    {
      title: "Demo 5 · Error ID · Neither…nor",
      stem: "(A) Neither the interns nor the supervisor (B) were present (C) at the briefing (D) this morning.",
      options: [
        { key: "A", text: "Neither the interns nor the supervisor" },
        { key: "B", text: "were present" },
        { key: "C", text: "at the briefing" },
        { key: "D", text: "this morning" }
      ],
      correctKey: "B",
      slot: "Error ID · nearer singular",
      teach: "The underlined verb were present is incorrect. The nearer subject is supervisor (singular), so use was present. Common trap: agreeing with interns."
    }
  ];

  const practice = [
    {
      id: "Q01",
      stem: "Either the field notes or the atlas ____ missing from the shelf.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "are" },
        { key: "C", text: "have been" },
        { key: "D", text: "were" }
      ],
      correctKey: "A",
      slot: "Either…or · nearer singular",
      explain: "The nearer subject is atlas (singular), so is is required. Field notes is a trap because it comes first."
    },
    {
      id: "Q02",
      stem: "Neither the botanists nor the curator ____ the specimens each morning.",
      options: [
        { key: "A", text: "catalogs" },
        { key: "B", text: "catalog" },
        { key: "C", text: "have cataloged" },
        { key: "D", text: "are cataloging" }
      ],
      correctKey: "A",
      slot: "Neither…nor · nearer singular",
      explain: "The nearer subject is curator (singular), so catalogs is required."
    },
    {
      id: "Q03",
      stem: "Neither the curator nor the botanists ____ the specimens each morning.",
      options: [
        { key: "A", text: "catalog" },
        { key: "B", text: "catalogs" },
        { key: "C", text: "has cataloged" },
        { key: "D", text: "is cataloging" }
      ],
      correctKey: "A",
      slot: "Neither…nor · nearer plural",
      explain: "Same pair as Q02, flipped. The nearer subject is botanists (plural), so catalog is required."
    },
    {
      id: "Q04",
      stem: "Either the library or the archives ____ closed this week.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "are" },
        { key: "C", text: "has been" },
        { key: "D", text: "was" }
      ],
      correctKey: "B",
      slot: "Either…or · nearer plural",
      explain: "The nearer subject is archives (plural), so are is required."
    },
    {
      id: "Q05",
      stem: "Both the lecture and the seminar ____ required for the course.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "was" },
        { key: "C", text: "are" },
        { key: "D", text: "has been" }
      ],
      correctKey: "C",
      slot: "Both…and · always plural",
      explain: "Both…and always takes a plural verb. Are is required."
    },
    {
      id: "Q06",
      stem: "Either the dean or the advisers ____ the petition on Friday.",
      options: [
        { key: "A", text: "signs" },
        { key: "B", text: "has signed" },
        { key: "C", text: "sign" },
        { key: "D", text: "is signing" }
      ],
      correctKey: "C",
      slot: "Either…or · nearer plural",
      explain: "The nearer subject is advisers (plural), so sign is required."
    },
    {
      id: "Q07",
      stem: "Neither the advisers nor the dean ____ the petition on Friday.",
      options: [
        { key: "A", text: "sign" },
        { key: "B", text: "have signed" },
        { key: "C", text: "are signing" },
        { key: "D", text: "signs" }
      ],
      correctKey: "D",
      slot: "Neither…nor · nearer singular",
      explain: "The nearer subject is dean (singular), so signs is required."
    },
    {
      id: "Q08",
      stem: "Both the abstract and the appendix ____ missing from the file.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "was" },
        { key: "C", text: "has been" },
        { key: "D", text: "are" }
      ],
      correctKey: "D",
      slot: "Both…and · always plural",
      explain: "Both…and is plural. Are is required, not is."
    },
    {
      id: "Q09",
      stem: "(A) Neither the staff nor the director (B) were notified (C) of the change (D) yesterday.",
      options: [
        { key: "A", text: "Neither the staff nor the director" },
        { key: "B", text: "were notified" },
        { key: "C", text: "of the change" },
        { key: "D", text: "yesterday" }
      ],
      correctKey: "B",
      slot: "Error ID · neither…nor",
      explain: "Were notified is incorrect. The nearer subject is director (singular), so use was notified."
    },
    {
      id: "Q10",
      stem: "Either the classrooms or the laboratory ____ available at noon.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "are" },
        { key: "C", text: "have been" },
        { key: "D", text: "were" }
      ],
      correctKey: "A",
      slot: "Either…or · nearer singular",
      explain: "The nearer subject is laboratory (singular), so is is required."
    },
    {
      id: "Q11",
      stem: "(A) Both the dean and the advisers (B) for the ceremony (C) has arrived (D) this morning.",
      options: [
        { key: "A", text: "Both the dean and the advisers" },
        { key: "B", text: "for the ceremony" },
        { key: "C", text: "has arrived" },
        { key: "D", text: "this morning" }
      ],
      correctKey: "C",
      slot: "Error ID · both…and",
      explain: "Has arrived is incorrect. Both…and takes a plural verb. Use have arrived."
    },
    {
      id: "Q12",
      stem: "Neither the laboratory nor the classrooms ____ available after lunch.",
      options: [
        { key: "A", text: "is" },
        { key: "B", text: "was" },
        { key: "C", text: "has been" },
        { key: "D", text: "are" }
      ],
      correctKey: "D",
      slot: "Neither…nor · nearer plural",
      explain: "The nearer subject is classrooms (plural), so are is required."
    },
    {
      id: "Q13",
      stem: "(A) Either the laboratory or the classrooms (B) is available (C) after lunch (D) today.",
      options: [
        { key: "A", text: "Either the laboratory or the classrooms" },
        { key: "B", text: "is available" },
        { key: "C", text: "after lunch" },
        { key: "D", text: "today" }
      ],
      correctKey: "B",
      slot: "Error ID · either…or",
      explain: "Is available is incorrect. The nearer subject is classrooms (plural), so use are available."
    },
    {
      id: "Q14",
      stem: "Either the coordinator or the tutors ____ the review session.",
      options: [
        { key: "A", text: "leads" },
        { key: "B", text: "lead" },
        { key: "C", text: "has led" },
        { key: "D", text: "is leading" }
      ],
      correctKey: "B",
      slot: "Either…or · nearer plural",
      explain: "The nearer subject is tutors (plural), so lead is required."
    },
    {
      id: "Q15",
      stem: "(A) Neither the tutors nor the coordinator (B) of the workshop (C) were ready (D) at eight.",
      options: [
        { key: "A", text: "Neither the tutors nor the coordinator" },
        { key: "B", text: "of the workshop" },
        { key: "C", text: "were ready" },
        { key: "D", text: "at eight" }
      ],
      correctKey: "C",
      slot: "Error ID · neither…nor",
      explain: "Were ready is incorrect. The nearer subject is coordinator (singular), so use was ready. Of the workshop is a prepositional phrase, not the subject."
    }
  ];

  const slotLabel = "Pattern";
  const patternGroups = [
    { label: "Either…or", ids: ["Q01", "Q04", "Q06", "Q10", "Q13", "Q14"] },
    { label: "Neither…nor", ids: ["Q02", "Q03", "Q07", "Q09", "Q12", "Q15"] },
    { label: "Both…and", ids: ["Q05", "Q08", "Q11"] }
  ];

  bootStrategyClass({ teachHtml, demos, practice, slotLabel, patternGroups });
})();
