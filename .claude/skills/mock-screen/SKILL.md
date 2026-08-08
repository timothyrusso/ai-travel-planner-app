---
name: mock-screen
description: Build a high-fidelity HTML mockup of any HolidAI screen from the local Figma (.fig) export — Figma-style full-height frames, states as columns, in the converged house style. Use when asked to mock, design, or visualize a screen of the new HolidAI UI from the Figma file.
argument-hint: "<screen/canvas name> [path to .fig] [explore N]"
---

# mock-screen — HolidAI screen mockups from the .fig export

Produce **one self-contained HTML page** of Figma-style frames for a HolidAI screen, decoded
straight from the local `.fig` export. This is **mockup space**: the output is a design artifact
of the FUTURE UI, never app code. The current codebase is the legacy UI — do not consult it for
visuals and do not implement anything in it from here.

**Read `reference/design-system.md` (in this skill folder) before doing anything.** It holds the
token ground truth, component inventory + specs, the house-style decisions, frame rules, and the
current `phase`. It is the §3/§4 of every screen; this file is only the process.

## Inputs (`$ARGUMENTS`)

- **screen name** (required) — fuzzy-match against the fig's canvas names (e.g. `Trip Detail
  Page`, `Profile Page`, `All Trips Page`, `Level Page`). Disambiguate at the checkpoint.
- **fig path** (optional) — default: the most recently modified `holidai*.fig` in `~/Downloads`.
  Always surface the resolved path + its `exported_at` at the checkpoint.
- **explore N** (optional) — instead of the converged house style, produce N competing visual
  directions (rows) × states (columns). Only for genuinely novel surfaces with no settled
  direction; the default is converged single-direction.

## Process

### 1. Decode the fig (offline — no Figma MCP, no quota)

```bash
TMP=<scratchpad>/fig && mkdir -p $TMP && cd $TMP
unzip -o -q "<fig path>"          # → canvas.fig, meta.json, thumbnail.png, images/<sha1>
cat meta.json                     # → exported_at
python3 - <<'EOF'                 # split fig-kiwi blocks: [12B header][u32 len][block]...
import struct
d=open('canvas.fig','rb').read(); off=12; i=0
while off+4<=len(d):
    (n,)=struct.unpack_from('<I',d,off); off+=4
    if i==1: open('data.zst','wb').write(d[off:off+n])   # block 1 = document (zstd)
    off+=n; i+=1
EOF
zstd -d -f data.zst -o data.bin -q
strings -n 3 data.bin > s.txt     # names, copy, annotations — in tree order
```

`s.txt` is in **document-tree order**: everything between one canvas title and the next belongs
to that canvas. Locate boundaries with `grep -n "<Canvas Name>" s.txt`. Design-system cards are
titled `HolidAI <Component>`. Photos are the original files in `images/<sha1>`. For geometry
beyond strings (exact sizes, fills), the full kiwi decoder technique is in auto-memory
`fig-file-local-decoding` (schema block 0 = raw deflate; beware the varfloat bit-rotation).

### 2. Refresh the reference if the fig is newer

Compare `exported_at` with the stamp at the top of `reference/design-system.md`. If the fig is
newer: re-extract the DS canvas (new `HolidAI <X>` cards, changed specs, new annotations), update
the reference file — token tables, component inventory, parity table, stamp — **as part of this
run**, and tell the user what changed. The reference must never silently go stale.

### 3. Extract the screen and checkpoint with the user

From the target canvas's string range, build a compact **content inventory** (§5-style):

- the **states/variants** the canvas shows (side-by-side frames, e.g. Home's Before trip / Live /
  Empty) — these become the columns
- the **section stack** per state, with **verbatim copy** (never paraphrase fig copy)
- **annotations** (notes like `3D map of the city`, references to other apps) — they are design
  intent, obey them
- **modals/sheets** the screen opens (each becomes an extra standalone-modal frame)
- **hero/imagery** requirements and any placeholder rules (e.g. Mapbox views → photo placeholder,
  never a 3D implementation)

⚠️ Cross-canvas bleed is the classic error: content adjacent in `s.txt` may belong to the next
canvas (on Home, "Booking confirmations" was Profile content). Check boundaries.

**Present the inventory + resolved fig path/`exported_at` and get one confirm/amend from the
user before building.** This is the single mandatory checkpoint.

### 4. Build

- Output: `design/mockups/holidai-<screen>.html` (folder is gitignored; `mkdir -p` if missing).
- One row of frames in the **house style**; columns = states, plus one standalone frame per
  modal/sheet. With `explore N`: N rows (directions) instead, each a defensible design.
- Follow **every rule in `reference/design-system.md`**: tokens only, component specs exactly,
  frame geometry, imagery degradation, icon policy, house decisions.
- Build one frame at a time to completion (states left→right, modals last) — a finished subset
  beats twelve half-drawn screens.
- Reuse the structure of a previous mock (e.g. `design/mockups/holidai-home*.html` or
  `~/Desktop/Projects/holidai-home-explorations.html`) for chrome, primitives, and the
  JS-stamping pattern (icons, tab bar, repeated lists) rather than reinventing them.

### 5. Verify — mandatory, before reporting anything as done

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --screenshot=shot.png --window-size=<canvas W>,<canvas H> --hide-scrollbars "file://<output>"
```

- Screenshot the **full canvas** (size the window to fit — no scroll), then **crop with PIL**
  to inspect: each new component's first use, dense text rows, anything with absolute
  positioning. Never judge from the full-res image alone; never skip because it "looks simple".
- Fix → re-render → re-crop until clean. Only then present.
- If Playwright MCP fights the user's running Chrome profile, use the headless CLI above.

### 6. Present

Report the output path, what each frame shows, and **every deviation** from the fig or the
reference (invented figures, substituted glyphs, judgment calls) — deviations are legitimate but
must be disclosed, not discovered.

## Phase discipline

The reference file carries `phase: figma-only | storybook-aligned`.

- **figma-only** (current): the fig is the sole truth; the codebase is legacy and off-limits for
  visuals. Mockups may use components that don't exist in code yet — that's the point.
- **storybook-aligned** (after the component migration): additionally cross-check the parity
  table; note per frame any component that is still design-only, and flag reference/Storybook
  discrepancies instead of silently picking a side.
