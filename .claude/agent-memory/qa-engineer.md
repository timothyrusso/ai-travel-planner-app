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
  so use a TEST identifier: email `holidai-qa+clerk_test@example.com`, OTP `424242`. The
  fixed `424242` only works for `+clerk_test` emails; a plain email like `qa-test@example.com`
  gets a real code and rejects `424242` (that was the earlier "Incorrect code" failure — a
  wrong-identifier mistake, NOT a broken account, so do not report these screens BLOCKED for
  that reason). Full procedure in the qa-baseline skill ("Authenticated QA"). Any test that
  signs out must sign back in with these creds before finishing.
- [2026-07-24] The android real device "Pixel 9a" (booted=true in `list-devices`) shows a
  black screenshot (locked/screen-off) — not usable for QA; don't spend time on it.
