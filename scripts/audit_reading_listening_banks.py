#!/usr/bin/env python3
"""Audit Reading + Listening banks for correctKey / correctAnswer / explanation alignment.

Flags (mismatch rules — must be zero):
  bad_correctKey, key_not_in_options, correctAnswer_mismatch,
  duplicate_option_texts, expl_letter_vs_key, expl_embeds_other_option

Also prints A–D distributions (Reading bank, Reading intro, Listening overall + Part A/B/C).

Usage:
  python3 scripts/audit_reading_listening_banks.py
  python3 scripts/audit_reading_listening_banks.py --json
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LETTERS = ("A", "B", "C", "D")


def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", str(s or ""))
    for a, b in (
        ("\u2019", "'"),
        ("\u2018", "'"),
        ("\u201c", '"'),
        ("\u201d", '"'),
        ("\u2014", "-"),
        ("\u2013", "-"),
    ):
        s = s.replace(a, b)
    return re.sub(r"\s+", " ", s).strip()


def ncmp(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", norm(s).lower())


def option_map(raw) -> dict[str, str]:
    """Return {A: text, ...} from list[{key/id,text}] or dict A–D."""
    if raw is None:
        return {}
    if isinstance(raw, list):
        out = {}
        for choice in raw:
            if isinstance(choice, str):
                continue
            key = str(choice.get("key") or choice.get("id") or "").strip().upper()
            text = norm(choice.get("text") or choice.get("label") or "")
            if key:
                out[key] = text
        return out
    if isinstance(raw, dict):
        return {str(k).strip().upper(): norm(v) for k, v in raw.items()}
    return {}


def correct_key_of(item: dict) -> str:
    return str(
        item.get("correctKey")
        or item.get("answer_key")
        or item.get("correct_answer")
        or ""
    ).strip().upper()


def correct_answer_text(item: dict) -> str:
    ca = item.get("correctAnswer")
    if ca is None:
        return ""
    # Listening Part B/C store the letter in correct_answer — not prose.
    if str(ca).strip().upper() in LETTERS and not item.get("correctAnswer"):
        return ""
    # If field is literally A–D and options exist, treat as key not text.
    if str(ca).strip().upper() in LETTERS and len(str(ca).strip()) == 1:
        return ""
    return norm(ca)


def is_except_question(prompt: str) -> bool:
    return bool(re.search(r"\bEXCEPT\b|\bNOT\b", prompt or "", re.I))


LETTER_CLAIM_RE = re.compile(
    r"(?:the\s+)?(?:correct\s+)?answer\s+is\s*\(?([A-D])\)?"
    r"|option\s*\(?([A-D])\)?\s+is\s+(?:the\s+)?correct"
    r"|choice\s*\(?([A-D])\)?\s+is\s+(?:the\s+)?correct"
    r"|correct(?:\s+answer)?\s*(?:is|:)\s*\(?([A-D])\)?",
    re.I,
)


def audit_question(qid: str, item: dict, *, options_field: str | None = None) -> list[tuple[str, str]]:
    flags: list[tuple[str, str]] = []
    opts_raw = None
    if options_field:
        opts_raw = item.get(options_field)
    if opts_raw is None:
        opts_raw = item.get("options") if item.get("options") is not None else item.get("choices")
    by = option_map(opts_raw)
    ck = correct_key_of(item)
    ca = correct_answer_text(item)
    prompt = item.get("question") or item.get("prompt") or item.get("narrator_text") or ""

    if ck not in LETTERS:
        return [("bad_correctKey", ck or "(empty)")]
    if ck not in by:
        return [("key_not_in_options", ck)]

    if ca and ncmp(ca) != ncmp(by[ck]):
        alt = [L for L, t in by.items() if ncmp(t) == ncmp(ca)]
        flags.append(
            (
                "correctAnswer_mismatch",
                f"ck={ck} ca matches {alt or 'none'} ca={ca[:80]!r} opt={by[ck][:80]!r}",
            )
        )

    texts = [t for t in by.values() if t]
    if texts and len(texts) != len({ncmp(t) for t in texts}):
        flags.append(("duplicate_option_texts", "two letters share the same text"))

    expl = norm(item.get("explanation") or "")
    for m in LETTER_CLAIM_RE.finditer(expl):
        claimed = next(g for g in m.groups() if g).upper()
        if claimed != ck:
            flags.append(("expl_letter_vs_key", f"explanation claims {claimed} but correctKey={ck}"))

    # If explanation embeds another option's full text (and not the correct one), flag —
    # skip EXCEPT/NOT stems where distractors are often listed as mentioned.
    if expl and not is_except_question(prompt):
        for L, t in by.items():
            if L == ck or len(ncmp(t)) < 28:
                continue
            if ncmp(t) in ncmp(expl) and ncmp(by[ck]) not in ncmp(expl):
                flags.append(("expl_embeds_other_option", f"embeds option {L} text, not {ck}"))

    return flags


def iter_reading_questions():
    bank = json.loads((ROOT / "data" / "reading-bank.json").read_text())
    for passage in bank.get("passages") or []:
        for item in passage.get("items") or []:
            yield "reading-bank", item.get("id") or "?", item, passage.get("id")

    intro = json.loads((ROOT / "data" / "reading-intro.json").read_text())
    passage = intro.get("passage") or intro
    for item in passage.get("items") or passage.get("questions") or []:
        yield "reading-intro", item.get("id") or "?", item, passage.get("id")


def part_label(asset_type: str) -> str:
    t = (asset_type or "").lower()
    if "part b" in t:
        return "B"
    if "part c" in t:
        return "C"
    return "A"


def iter_listening_questions():
    bank = json.loads((ROOT / "data" / "listening-bank.json").read_text())
    for entry in bank.get("items") or []:
        path = entry.get("data")
        if not path:
            yield "listening-bank", entry.get("id"), None, entry, "missing_data_path"
            continue
        full = ROOT / path
        if not full.exists():
            yield "listening-bank", entry.get("id"), None, entry, "missing_file"
            continue
        raw = json.loads(full.read_text())
        questions = raw.get("questions") or []
        if not questions:
            yield "listening-bank", entry.get("id"), None, entry, "no_questions"
            continue
        for qi, q in enumerate(questions):
            local = q.get("id") or q.get("number") or (qi + 1)
            qid = f"{entry.get('id')}-Q{local}"
            yield "listening-bank", qid, q, entry, None


def distribution(counter: Counter) -> dict:
    return {L: int(counter.get(L, 0)) for L in LETTERS}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", action="store_true", help="Emit machine-readable summary")
    args = ap.parse_args()

    flags: list[tuple[str, str, str, str]] = []
    dist = {
        "reading-bank": Counter(),
        "reading-intro": Counter(),
        "listening": Counter(),
        "listening-A": Counter(),
        "listening-B": Counter(),
        "listening-C": Counter(),
    }
    scanned = {"reading-bank": 0, "reading-intro": 0, "listening": 0}

    for source, qid, item, passage_id in iter_reading_questions():
        scanned[source] += 1
        for code, msg in audit_question(qid, item):
            flags.append((source, qid, code, msg))
            print(f"FLAG [{source}] {qid} [{code}] {msg}")
        ck = correct_key_of(item)
        if ck in LETTERS:
            dist[source][ck] += 1

    for source, qid, item, entry, err in iter_listening_questions():
        if err:
            flags.append((source, qid or entry.get("id"), err, entry.get("data") or ""))
            print(f"FLAG [{source}] {qid or entry.get('id')} [{err}] {entry.get('data')}")
            continue
        scanned["listening"] += 1
        for code, msg in audit_question(qid, item):
            flags.append((source, qid, code, msg))
            print(f"FLAG [{source}] {qid} [{code}] {msg}")
        ck = correct_key_of(item)
        if ck in LETTERS:
            dist["listening"][ck] += 1
            dist[f"listening-{part_label(entry.get('asset_type'))}"][ck] += 1

    # Intro listening ids are subset of bank — report separately if desired
    intro_path = ROOT / "data" / "listening-intro.json"
    if intro_path.exists():
        intro = json.loads(intro_path.read_text())
        print(f"listening-intro item_ids: {intro.get('item_ids')}")

    print("---")
    print(
        f"Scanned reading-bank={scanned['reading-bank']} "
        f"reading-intro={scanned['reading-intro']} "
        f"listening={scanned['listening']}; flags={len(flags)}"
    )
    for name in ("reading-bank", "reading-intro", "listening", "listening-A", "listening-B", "listening-C"):
        c = dist[name]
        total = sum(c.values())
        print(f"  {name} n={total}  {distribution(c)}")

    if args.json:
        print(
            json.dumps(
                {
                    "scanned": scanned,
                    "flags": [
                        {"source": s, "id": i, "code": c, "msg": m} for s, i, c, m in flags
                    ],
                    "distribution": {k: distribution(v) for k, v in dist.items()},
                },
                indent=2,
            )
        )

    return 1 if flags else 0


if __name__ == "__main__":
    sys.exit(main())
