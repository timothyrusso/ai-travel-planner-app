# qa-engineer memory — operational lessons

Read at the start of every QA run. Append only under the rules in
`.claude/agents/qa-engineer.md`. Humans curate at PR review — entries can be deleted.

## Known environment

- agent-device version last verified: 0.20.8 (2026-08-13)
- Project requires Node >=22.13 (package.json engines); default `nvm` shell node can be older
  (e.g. 22.11.0) and silently breaks Metro/CLI tooling with errors that look like code bugs.
  Check `node --version` vs `engines.node` first; `nvm use 22.20.0` fixes it.

## Lessons

- [2026-07-21] Layered-Animated / gesture-drawn controls can misreport as non-hittable in
  accessibility snapshots — verify via react-devtools or an actual interaction result before
  recording a FAIL for "element not tappable".
- [2026-07-24] Post-login screens: sign in with `QA_TEST_EMAIL` (`+clerk_test`) + OTP `424242`
  (Clerk `pk_test` dev instance only). Pre-filled "Last Used" identifier may default to a
  PASSWORD prompt — tap "Use another method" → "Email code to <address>" first. Any test that
  signs out must sign back in before finishing.
- [2026-08-08] `agent-device devices --json` can list a physical iOS device as `booted:true`
  even when disconnected. Confirm reachability with a cheap `open <bundleId> --device "<Name>"`
  before committing to it.
- [2026-08-08] Do NOT QA web targets from this agent — driving Chrome via `--platform macos` is
  unreliable (loses focus, `snapshot -i` sees only the runner window). Web belongs to
  `qa-web-engineer` (`agent-browser`). Mark browser-only criteria BLOCKED and move on.
- [2026-07-24] `agent-device metro reload` can 500 even with Metro healthy — fall back to
  `open <app> --device <name> --relaunch`.
- [2026-07-25] Long RN ScrollViews: `scroll down/up/top` are unreliable. Prefer manual
  `swipe <x> <y1> <x> <y2>` drags (~300-500px) + `screenshot` after each.
- [2026-07-25] For accessibilityLabel checks collapsed into one composite AT button, use
  `react-devtools find <Component>` then check an unmerged instance elsewhere on-device.
- [2026-08-13] `expo run:android --device <x>` needs the adb `model:` string (`adb devices -l`,
  e.g. `Pixel_9a`), not the marketing name with a space nor the serial.
- [2026-08-13] Metro's transform cache can serve a stale inlined `EXPO_PUBLIC_*` value across
  unrelated prior runs even though the var is correctly exported now (symptom: wrong entry
  branch boots, e.g. normal app instead of Storybook). Restart Metro with `--clear` before the
  first launch on a device whenever such a flag gates the entry point.
- [2026-08-13] The on-device "Bundling NN%…" overlay can stay stuck on screen after Metro
  already logged the bundle complete — screenshots alone look hung. Verify with `snapshot -i`
  (reflects real content) before concluding the app is stuck.
