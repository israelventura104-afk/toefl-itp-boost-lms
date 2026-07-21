# Listening assets (LMS)

Copied from `toefl-itp-boost/app/listening` for the canonical LMS.

## Layout

```
listening-assets/items/LIST-xxxx/
  item.json          # original question/transcript data
  audio.mp3          # only if audio existed (normalized name)
  audio-source.txt   # original filename (when audio present)
  script.docx        # production script if present
```

## Bank indexes

- `data/listening-bank.json` — **ready for practice** (has audio)
- `data/listening-pending.json` — JSON present, **audio missing**

## Notes

- Source files were **copied** (not deleted) from the Next.js warehouse folder.
- Some original audio names had typos/spaces/double dots; playback uses `audio.mp3`.
- When you finish more assets, drop them in and regenerate/add to the bank.

