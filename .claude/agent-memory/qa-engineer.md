# qa-engineer memory — operational lessons

Read at the start of every QA run. Append only under the rules in
`.claude/agents/qa-engineer.md`. Humans curate at PR review — entries can be deleted.

## Known environment

- agent-device version last verified: 0.19.3 (2026-07-24)

## Lessons

- [2026-07-21] Layered-Animated / gesture-drawn controls can misreport as non-hittable in
  accessibility snapshots — verify via react-devtools or an actual interaction result
  before recording a FAIL for "element not tappable".
- [2026-07-24] Post-login screens (Profile, Account, anything past the Clerk sign-in wall)
  are frequently BLOCKED for device QA: the shared iOS sim ends up signed-out (a prior QA
  run's "sign out" test), and the Clerk dev instance's OTP is NOT the usual `424242` for
  the `qa-test@example.com` account — it fails with "Incorrect code" even after Resend.
  No working test credential is known; don't burn time retrying the code. Report BLOCKED
  with this reason and verify such ViewModel-contract criteria via ESLint/tsc/source
  instead where the AC allows it.
- [2026-07-24] The android real device "Pixel 9a" (booted=true in `list-devices`) shows a
  black screenshot (locked/screen-off) — not usable for QA; don't spend time on it.
