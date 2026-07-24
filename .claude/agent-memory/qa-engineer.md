# qa-engineer memory — operational lessons

Read at the start of every QA run. Append only under the rules in
`.claude/agents/qa-engineer.md`. Humans curate at PR review — entries can be deleted.

## Known environment

- agent-device version last verified: 0.19.3 (2026-07-24)

## Lessons

- [2026-07-21] Layered-Animated / gesture-drawn controls can misreport as non-hittable in
  accessibility snapshots — verify via react-devtools or an actual interaction result
  before recording a FAIL for "element not tappable".
- [2026-07-24] Post-login screens (Profile, Account, anything past the Clerk sign-in wall):
  if the shared sim is signed out, DO sign in — the app is a Clerk `pk_test` dev instance,
  so use a TEST identifier: email from the `QA_TEST_EMAIL` env var (gitignored `.env`; see
  `.env.sample`), OTP `424242`. The
  fixed `424242` only works for `+clerk_test` emails; a plain email like `qa-test@example.com`
  gets a real code and rejects `424242` (that was the earlier "Incorrect code" failure — a
  wrong-identifier mistake, NOT a broken account, so do not report these screens BLOCKED for
  that reason). Full procedure in the qa-baseline skill ("Authenticated QA"). Any test that
  signs out must sign back in with these creds before finishing.
- [2026-07-24] The android real device "Pixel 9a" (booted=true in `list-devices`) shows a
  black screenshot (locked/screen-off) — not usable for QA; don't spend time on it.
- [2026-07-24] Profile/Account screens: after `--settle`, refs from the pre-action snapshot can
  resolve to the WRONG element (stale coordinates from a layout that already shifted, e.g.
  clicking a "Cambia lingua"/back-button ref lands on a neighboring row instead) — this cost
  several misnavigations. Also, this app's custom circular back-buttons and profile list rows
  never show `hittable:true` in the iOS a11y tree (same family as the layered-control quirk
  above). Mitigation: after any nav change, pull a FRESH `snapshot -i --raw`, read the target's
  `rect`, and tap the computed center point directly rather than trusting a carried-over ref.
- [2026-07-24] `agent-device metro reload` can 500 even with Metro healthy and reachable
  (JS-only diff, correct project root) — fall back to `open <app> --platform ios --device
  <name> --relaunch`; it re-fetches the bundle from the same Metro (shows "Downloading
  100%…") and is an equally valid attach+reload for the JS-only path.
- [2026-07-24] Clerk sign-in: if the identifier field is pre-filled via "Last Used", Clerk
  may default to a PASSWORD prompt instead of emailing an OTP. Tap "Use another method" →
  "Email code to <address>" to get the `+clerk_test` OTP field, then enter `424242`.
