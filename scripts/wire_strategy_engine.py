import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
js_files = [
    "strategy-sva-01.js",
    "strategy-pi-02.js",
    "strategy-ca-03.js",
    "strategy-vt-04.js",
    "strategy-ps-05.js",
    "strategy-wf-06.js",
    "strategy-sj-07.js",
    "strategy-ac-08.js",
    "strategy-ei-09.js",
]
html_files = [
    "strategy-sva-01-subject-verb-agreement.html",
    "strategy-pi-02-prepositional-interruptions.html",
    "strategy-ca-03-correlative-agreement.html",
    "strategy-vt-04-verb-tenses.html",
    "strategy-ps-05-parallel-structure.html",
    "strategy-wf-06-word-forms.html",
    "strategy-sj-07-subjunctive.html",
    "strategy-ac-08-adjective-clauses.html",
    "strategy-ei-09-error-identification.html",
]

for name in js_files:
    path = root / name
    text = path.read_text(encoding="utf-8")
    start = re.search(r"\n(?:  )?function escapeHtml\b", text)
    call = re.search(r"\n  bootStrategyClass\(\{", text)
    if not start or not call:
        raise SystemExit(f"markers missing in {name}")
    new = text[: start.start()] + "\n  bootStrategyClass({" + text[call.end() :]
    path.write_text(new, encoding="utf-8", newline="\n")
    print("stripped", name, "bytes", len(text), "->", len(new))

engine_tag = '<script src="strategy-engine.js?v=20260923c"></script>\n'
for name in html_files:
    path = root / name
    text = path.read_text(encoding="utf-8")
    text = re.sub(r'strategy-eh\.css\?v=[^"]+', "strategy-eh.css?v=20260923ei-line", text)
    text = re.sub(
        r'<script src="(strategy-[^"]+\.js)\?v=[^"]+"></script>',
        engine_tag + r'<script src="\1?v=20260923c"></script>',
        text,
        count=1,
    )
    if "strategy-engine.js" not in text:
        raise SystemExit(f"engine tag missing in {name}")
    path.write_text(text, encoding="utf-8", newline="\n")
    print("wired", name)
print("ok")
