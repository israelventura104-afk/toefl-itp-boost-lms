#!/usr/bin/env python3
"""Rebalance correctKey letters by permuting option order only.

Preserves which option *text* is correct; only changes the letter and option order.
Remaps letter references in explanation / commonMistake / evidence when present.
"""
from __future__ import annotations

import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LETTERS = ("A", "B", "C", "D")


def targets_for(n: int) -> dict[str, int]:
    base, rem = divmod(n, 4)
    # Prefer A,B,C,D order for remainder so slight extras aren't all on one letter
    return {L: base + (1 if i < rem else 0) for i, L in enumerate(LETTERS)}


def plan_new_keys(current: list[str]) -> list[str]:
    """Assign new keys to approach even A/B/C/D; prefer keeping current when under quota."""
    n = len(current)
    targets = targets_for(n)
    by_key: dict[str, list[int]] = defaultdict(list)
    for i, k in enumerate(current):
        by_key[k].append(i)

    assigned = [None] * n
    counts = Counter()
    excess: list[int] = []

    for L in LETTERS:
        keep = by_key[L][: targets[L]]
        for i in keep:
            assigned[i] = L
            counts[L] += 1
        excess.extend(by_key[L][targets[L] :])

    # Prefer draining from letters that historically inflate majority (order excess by current key majority)
    majority_order = [L for L, _ in Counter(current).most_common()]
    excess.sort(key=lambda i: (majority_order.index(current[i]) if current[i] in majority_order else 99, i))

    for L in LETTERS:
        need = targets[L] - counts[L]
        for _ in range(need):
            if not excess:
                break
            i = excess.pop(0)
            assigned[i] = L
            counts[L] += 1

    if excess or any(a is None for a in assigned):
        raise RuntimeError(f"rebalance plan failed: leftover={len(excess)} none={assigned.count(None)}")
    return assigned  # type: ignore


def texts_by_letter(item: dict) -> dict[str, str]:
    if isinstance(item.get("choices"), list):
        return {
            str(c.get("id") or c.get("key") or "").strip().upper(): str(c.get("text") or "")
            for c in item["choices"]
        }
    opts = item.get("options")
    if isinstance(opts, list):
        return {
            str(o.get("key") or o.get("id") or "").strip().upper(): str(o.get("text") or "")
            for o in opts
        }
    if isinstance(opts, dict):
        return {str(k).strip().upper(): str(v) for k, v in opts.items()}
    return {}


def apply_options(item: dict, new_by: dict[str, str]) -> None:
    if isinstance(item.get("choices"), list):
        # Preserve extra fields on choice objects when possible
        old_by_text = {str(c.get("text") or ""): c for c in item["choices"]}
        new_choices = []
        for L in LETTERS:
            text = new_by[L]
            src = old_by_text.get(text) or {}
            choice = dict(src)
            choice["id"] = L
            choice["text"] = text
            choice.pop("key", None)
            new_choices.append(choice)
        item["choices"] = new_choices
        return
    opts = item.get("options")
    if isinstance(opts, list):
        old_by_text = {str(o.get("text") or ""): o for o in opts}
        new_opts = []
        for L in LETTERS:
            text = new_by[L]
            src = old_by_text.get(text) or {}
            row = dict(src)
            row["key"] = L
            row["text"] = text
            new_opts.append(row)
        item["options"] = new_opts
        return
    if isinstance(opts, dict):
        item["options"] = {L: new_by[L] for L in LETTERS}
        return
    raise ValueError("no options/choices to rewrite")


def permute_to_key(item: dict, old_key: str, new_key: str) -> dict[str, str]:
    """Move correct text to new_key; keep distractor relative order. Return old→new map."""
    by = texts_by_letter(item)
    if set(by) != set(LETTERS):
        raise ValueError(f"expected A-D options, got {sorted(by)}")
    if old_key not in by or new_key not in LETTERS:
        raise ValueError(f"bad keys {old_key}->{new_key}")
    if old_key == new_key:
        return {L: L for L in LETTERS}

    correct_text = by[old_key]
    distractors = [by[L] for L in LETTERS if L != old_key]
    new_by: dict[str, str] = {}
    di = 0
    for L in LETTERS:
        if L == new_key:
            new_by[L] = correct_text
        else:
            new_by[L] = distractors[di]
            di += 1

    # Map each old letter to where its text landed
    old_to_new: dict[str, str] = {}
    for old_L, text in by.items():
        matches = [nL for nL, t in new_by.items() if t == text]
        if len(matches) != 1:
            # duplicate texts — ambiguous; map first unused
            raise ValueError(f"ambiguous option text remap for {old_L}")
        old_to_new[old_L] = matches[0]

    apply_options(item, new_by)
    return old_to_new


_LETTER_REF_RE = re.compile(
    r"(?P<pre>Choosing\s+|option\s+|choice\s+|answer\s+is\s+|correct(?:\s+answer)?\s*(?:is|:)\s*)"
    r"(?P<a>[A-D])"
    r"(?P<mid>\s+or\s+)?"
    r"(?P<b>[A-D])?",
    re.I,
)


def remap_letter_refs(text: str, old_to_new: dict[str, str]) -> str:
    if not text or old_to_new == {L: L for L in LETTERS}:
        return text

    def repl(m: re.Match) -> str:
        a = m.group("a").upper()
        b = m.group("b")
        pre = m.group("pre")
        mid = m.group("mid") or ""
        new_a = old_to_new.get(a, a)
        # preserve original casing style (always uppercase letters in banks)
        if b:
            new_b = old_to_new.get(b.upper(), b.upper())
            return f"{pre}{new_a}{mid}{new_b}"
        return f"{pre}{new_a}"

    return _LETTER_REF_RE.sub(repl, text)


def set_correct_key(item: dict, new_key: str, correct_text: str) -> None:
    if "answer_key" in item:
        item["answer_key"] = new_key
    if "correctKey" in item:
        item["correctKey"] = new_key
    if "correct_answer" in item:
        # Part B/C use letter; if it was a letter, keep letter form
        prev = str(item.get("correct_answer") or "").strip()
        if prev.upper() in LETTERS and len(prev) == 1:
            item["correct_answer"] = new_key
        elif prev:
            # rare prose form
            item["correct_answer"] = correct_text
        else:
            item["correct_answer"] = new_key
    if "correctAnswer" in item:
        item["correctAnswer"] = correct_text
    # Ensure at least one key field exists
    if not any(k in item for k in ("answer_key", "correctKey", "correct_answer", "correctAnswer")):
        item["correctKey"] = new_key


def rekey_question(item: dict, new_key: str) -> bool:
    old_key = str(
        item.get("correctKey") or item.get("answer_key") or item.get("correct_answer") or ""
    ).strip().upper()
    if old_key not in LETTERS:
        raise ValueError(f"bad old key {old_key}")
    if old_key == new_key:
        return False
    by = texts_by_letter(item)
    correct_text = by[old_key]
    old_to_new = permute_to_key(item, old_key, new_key)
    set_correct_key(item, new_key, correct_text)
    for field in ("explanation", "evidence", "commonMistake", "distractor_rationale"):
        if field in item and item[field]:
            item[field] = remap_letter_refs(str(item[field]), old_to_new)
    return True


def rebalance_reading() -> tuple[Counter, Counter, int]:
    path = ROOT / "data" / "reading-bank.json"
    data = json.loads(path.read_text())
    items = []
    for passage in data["passages"]:
        for item in passage.get("items") or []:
            items.append(item)
    before = Counter(str(it["correctKey"]).upper() for it in items)
    new_keys = plan_new_keys([str(it["correctKey"]).upper() for it in items])
    changed = 0
    for item, nk in zip(items, new_keys):
        if rekey_question(item, nk):
            changed += 1
    after = Counter(str(it["correctKey"]).upper() for it in items)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    return before, after, changed


def rebalance_reading_intro() -> tuple[Counter, Counter, int]:
    path = ROOT / "data" / "reading-intro.json"
    data = json.loads(path.read_text())
    items = (data.get("passage") or data).get("items") or []
    before = Counter(str(it["correctKey"]).upper() for it in items)
    new_keys = plan_new_keys([str(it["correctKey"]).upper() for it in items])
    changed = 0
    for item, nk in zip(items, new_keys):
        if rekey_question(item, nk):
            changed += 1
    after = Counter(str(it["correctKey"]).upper() for it in items)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    return before, after, changed


def part_of(asset_type: str) -> str:
    t = (asset_type or "").lower()
    if "part b" in t:
        return "B"
    if "part c" in t:
        return "C"
    return "A"


def rebalance_listening() -> tuple[Counter, Counter, int]:
    """Rebalance within each Part (A/B/C) so overall and per-part stay near-even."""
    bank_path = ROOT / "data" / "listening-bank.json"
    bank = json.loads(bank_path.read_text())
    loaded: dict[str, dict] = {}
    by_part: dict[str, list[tuple[str, int, dict]]] = defaultdict(list)
    for entry in bank["items"]:
        rel = entry["data"]
        if rel not in loaded:
            loaded[rel] = json.loads((ROOT / rel).read_text())
        raw = loaded[rel]
        part = part_of(entry.get("asset_type") or "")
        for qi, q in enumerate(raw.get("questions") or []):
            by_part[part].append((rel, qi, q))

    before: Counter = Counter()
    after: Counter = Counter()
    changed = 0
    for part, refs in by_part.items():
        keys = [
            str(q.get("answer_key") or q.get("correctKey") or q.get("correct_answer") or "").upper()
            for _, _, q in refs
        ]
        before.update(keys)
        new_keys = plan_new_keys(keys)
        for (rel, qi, q), nk in zip(refs, new_keys):
            if rekey_question(q, nk):
                changed += 1
            loaded[rel]["questions"][qi] = q
            after[nk] += 1

    for rel, raw in loaded.items():
        (ROOT / rel).write_text(json.dumps(raw, indent=2, ensure_ascii=False) + "\n")
    return before, after, changed


def fmt(c: Counter) -> dict:
    return {L: int(c.get(L, 0)) for L in LETTERS}


def main() -> int:
    rb_b, rb_a, rb_n = rebalance_reading()
    print(f"reading-bank changed={rb_n} before={fmt(rb_b)} after={fmt(rb_a)}")
    ri_b, ri_a, ri_n = rebalance_reading_intro()
    print(f"reading-intro changed={ri_n} before={fmt(ri_b)} after={fmt(ri_a)}")
    lb_b, lb_a, lb_n = rebalance_listening()
    print(f"listening changed={lb_n} before={fmt(lb_b)} after={fmt(lb_a)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
