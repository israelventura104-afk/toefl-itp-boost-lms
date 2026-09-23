import re
from collections import Counter
from pathlib import Path

root = Path(__file__).resolve().parents[1]
for name in ["strategy-ca-03.js", "strategy-vt-04.js", "strategy-ps-05.js", "strategy-wf-06.js", "strategy-sj-07.js", "strategy-ac-08.js", "strategy-ei-09.js"]:
    text = (root / name).read_text(encoding="utf-8")
    practice = text.split("const practice = [", 1)[1].split("];", 1)[0]
    keys = re.findall(r'correctKey: "([ABCD])"', practice)
    ids = re.findall(r'id: "(Q\d+)"', practice)
    stems = re.findall(r'stem: "([^"]+)"', practice)
    print(name, "n", len(keys), dict(Counter(keys)), ids)
    print("  unique stems", len(set(stems)), "/", len(stems))
    if len(keys) != 15:
        raise SystemExit(f"{name}: expected 15 keys")
    if any(v < 3 for v in Counter(keys).values()):
        raise SystemExit(f"{name}: letter under-represented")
print("ok")
