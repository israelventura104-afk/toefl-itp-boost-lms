#!/usr/bin/env python3
"""Audit Structure bank + intro for correctKey / correctAnswer / explanation alignment."""
import json, re, unicodedata, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def norm(s):
    s = unicodedata.normalize("NFKC", str(s or ""))
    for a, b in [("\u2019", "'"), ("\u2018", "'"), ("\u201c", '"'), ("\u201d", '"')]:
        s = s.replace(a, b)
    return re.sub(r"\s+", " ", s).strip()

def ncmp(s):
    return re.sub(r"[^a-z0-9]+", "", norm(s).lower())

def parse_error_segments(question_text):
    text = str(question_text or "")
    markers = list(re.finditer(r"\(([A-D])\)", text))
    if len(markers) != 4 or "".join(m.group(1) for m in markers) != "ABCD":
        return None
    segments, cursor = [], 0
    for m in markers:
        segments.append({"letter": m.group(1), "text": text[cursor : m.start()].strip()})
        cursor = m.end()
    return {"by": {s["letter"]: s["text"] for s in segments}}

def is_error_id(typ, q):
    t = str(typ or "").lower()
    if "error" in t or "written" in t:
        return True
    return bool(re.search(r"\(A\)[\s\S]*\(B\)[\s\S]*\(C\)[\s\S]*\(D\)", str(q or "")))

def extract_wrong_forms(expl):
    expl = norm(expl)
    forms = []
    for m in re.finditer(r"[\"']([^\"']{1,80})[\"']\s+should\s+be", expl, re.I):
        forms.append(norm(m.group(1)))
    for m in re.finditer(r"instead\s+of\s+[\"']([^\"']+)[\"']", expl, re.I):
        forms.append(norm(m.group(1)))
    for m in re.finditer(r"(?:uses?\s+[\"'][^\"']+[\"'][^.]*|,\s*)not\s+[\"']([^\"']+)[\"']", expl, re.I):
        forms.append(norm(m.group(1)))
    return forms

def locate_form(form, by):
    f = ncmp(form)
    if len(f) < 2:
        return []
    hits = []
    stop = {"the", "a", "an", "of", "to", "in", "on", "for", "and", "or", "is", "it", "its", "be"}
    for L, t in by.items():
        tl = ncmp(t)
        if f in tl or tl in f:
            hits.append(L)
            continue
        words = [w for w in re.findall(r"[a-zA-Z']+", form.lower()) if w not in stop and len(w) > 1]
        tw = set(w.lower() for w in re.findall(r"[a-zA-Z']+", t))
        if words and all(w in tw for w in words):
            hits.append(L)
        elif words and words[-1] in tw and len(words[-1]) >= 3:
            hits.append(L)
    return hits

def audit_item(item):
    flags = []
    typ, q = item.get("type", ""), item.get("question") or ""
    by_opt = {str(o.get("key", "")).strip().upper(): norm(o.get("text", "")) for o in (item.get("options") or [])}
    ck = str(item.get("correctKey") or "").strip().upper()
    ca = norm(item.get("correctAnswer") or "")
    cm = item.get("commonMistake")
    if ck not in "ABCD":
        return [("bad_correctKey", ck)]
    if ck not in by_opt:
        return [("key_not_in_options", ck)]
    if is_error_id(typ, q):
        parsed = parse_error_segments(q)
        if not parsed:
            return [("bad_markers", "")]
        by = parsed["by"]
        for L in "ABCD":
            if ncmp(by_opt.get(L, "")) != ncmp(by.get(L, "")):
                flags.append(("option_not_aligned", L))
        if ncmp(ca) != ncmp(by.get(ck, "")):
            flags.append(("correctAnswer_mismatch", f"{ca!r} vs {by.get(ck)!r}"))
        forms = extract_wrong_forms(item.get("explanation") or "")
        mapped = set()
        for f in forms:
            mapped.update(locate_form(f, by))
        if forms and mapped and ck not in mapped:
            ck_words = set(w.lower() for w in re.findall(r"[a-zA-Z']+", by.get(ck, "")))
            stop = {"the", "a", "an", "of", "to", "in", "on", "for", "and", "or", "is", "it", "its"}
            ok = False
            for f in forms:
                fw = [w.lower() for w in re.findall(r"[a-zA-Z']+", f) if w.lower() not in stop and len(w) > 1]
                if any(w in ck_words for w in fw):
                    ok = True
                    break
            if not ok:
                flags.append(("expl_vs_key", f"{forms}->{sorted(mapped)}"))
    else:
        if ncmp(ca) != ncmp(by_opt[ck]):
            flags.append(("correctAnswer_mismatch", f"{ca!r} vs {by_opt[ck]!r}"))
    if isinstance(cm, dict) and ck in {str(k).upper() for k in cm}:
        flags.append(("commonMistake_includes_correct", ck))
    return flags

def main():
    flags = []
    n = 0
    for fname in ("structure-bank.json", "structure-intro.json"):
        data = json.loads((ROOT / "data" / fname).read_text())
        for item in data["items"]:
            n += 1
            for code, msg in audit_item(item):
                flags.append((item.get("id"), code, msg))
                print(f"FLAG {item.get('id')} [{code}] {msg}")
    print(f"Scanned {n}; flags={len(flags)}")
    return 1 if flags else 0

if __name__ == "__main__":
    sys.exit(main())
