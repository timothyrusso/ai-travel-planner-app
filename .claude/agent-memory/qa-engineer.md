# qa-engineer memory — operational lessons

Read at the start of every QA run. Append only under the rules in
`.claude/agents/qa-engineer.md`. Humans curate at PR review — entries can be deleted.

## Known environment

- agent-device version last verified: 0.19.3 (2026-07-24)

## Lessons

- [2026-07-21] Layered-Animated / gesture-drawn controls can misreport as non-hittable in
  accessibility snapshots — verify via react-devtools or an actual interaction result
  before recording a FAIL for "element not tappable".
- [2026-07-24] Post-login screens: if the shared sim is signed out, sign in with the
  `QA_TEST_EMAIL` env var (`+clerk_test` address) + OTP `424242` (Clerk `pk_test` dev
  instance). A plain email gets a real code and rejects `424242` — wrong identifier, not a
  broken account. If the identifier field is pre-filled ("Last Used"), Clerk may default to
  a PASSWORD prompt — tap "Use another method" → "Email code to <address>" first. Any test
  that signs out must sign back in before finishing.
- [2026-07-24] The android real device "Pixel 9a" (booted=true) shows a black screenshot
  (locked/screen-off) — not usable for QA.
- [2026-07-24] After `--settle`, refs from the pre-action snapshot can resolve to the WRONG
  element on layout-shifting screens (Profile/Account). This app's custom circular
  back-buttons/list rows never show `hittable:true`. Mitigation: pull a FRESH
  `snapshot -i --raw` after any nav change, read the target's `rect`, tap the computed
  center point directly.
- [2026-07-24] `agent-device metro reload` can 500 even with Metro healthy/reachable —
  fall back to `open <app> --platform ios --device <name> --relaunch` (equally valid
  attach+reload for JS-only diffs).
- [2026-07-25] Long RN ScrollViews (e.g. TripDetailsPage): `scroll down/up <amount>` /
  `scroll top` are unreliable (huge variable overshoot, or silent no-op). Prefer manual
  `swipe <x> <y1> <x> <y2>` drags with modest deltas (~300-500px) + a `screenshot` after
  each, walking toward the target; `find "<text>" get attrs --json` gives the target's
  current `rect.y` (negative = above viewport, positive-large = below) to gauge direction/
  distance. Relaunch to reset to true top if lost.
- [2026-07-25] A global debug "gearshape.fill" tools-overlay icon sits top-right on every
  screen (~x:330-374, y:96-144) and intercepts taps meant for an in-app close/X button in
  that same corner — tap further left/down (e.g. y>140) or use a bottom-sheet dismiss swipe
  instead.
- [2026-07-25] If Home shows "no trip planned" but the account has trips, check Profile →
  the "Totale viaggi" stat cell → tap it → "Tutti i viaggi" lists them (Home may only show
  a filtered subset, e.g. when AI tokens are exhausted new-trip creation is blocked too).
- [2026-07-25] For accessibilityLabel checks on images inside a list row that iOS collapses
  into one composite Button (child labels hidden from AT): use
  `agent-device react-devtools find <Component>` to confirm the same component instance
  mounts there, then rely on an unmerged instance elsewhere (e.g. a details modal) as the
  on-device proof of the rendered (translated) label — `react-devtools get component`
  shows input props (e.g. the raw i18n key), not necessarily the final rendered label.
