---
name: qa-baseline
description: The standing set of baseline QA checks to run for EVERY feature, regardless of what it does — regression/retrocompatibility safety net. Run these on the agent-device before any feature-specific acceptance-criteria tests. Use when doing manual QA on a feature branch.
---

# Baseline QA checks

These are the minimum checks that must pass for **every** feature, independent of the
feature itself. They guard against regressions and broken app health. Run them first,
then run the feature's own acceptance criteria.

## Environment

- Drive the app on the **agent-device** (callstack agent-device toolkit) — this is the
  required QA target for manual device tests. Do not use other device-control tooling.
- Assume the feature branch is checked out and the app is installed/buildable on the
  agent-device.

## Authenticated QA (Clerk test credentials)

Many screens sit behind the Clerk sign-in wall. The app runs on a Clerk **development**
instance (`pk_test`), which supports deterministic **test identifiers** — no real email/OTP
and no secret to store.

**If the app is signed out, sign in before running feature tests:**

1. From the Welcome screen, open the sign-in / sign-up screen (primary CTA).
2. Read the test email from the **`QA_TEST_EMAIL`** env var (in the gitignored `.env`; see
   `.env.sample`) — e.g. `grep '^QA_TEST_EMAIL=' .env | cut -d= -f2`. It is a Clerk
   `+clerk_test` address. Enter it and continue.
3. When asked for the email verification code, enter **`424242`** — Clerk's fixed test-mode
   OTP. It works ONLY for `+clerk_test` emails on a `pk_test` dev instance and sends no real
   email. (A plain email such as `qa-test@example.com` gets a real code and will reject
   `424242` — that is not a broken account, just the wrong identifier.)
4. Complete any first-run onboarding to reach the main screen.

**Restore state:** any test that signs the user OUT (e.g. verifying the auth/sign-in flow
itself) MUST sign back in with the credentials above before finishing, so it does not strand
the next QA run behind the sign-in wall.

Because the app uses Clerk `tokenCache`, the session persists across relaunches — once signed
in with the test user, subsequent runs normally start already authenticated.

## Checks

### 1. App startup (critical regression flow)
Cold-launch the app on the agent-device.
- **Pass when:** the app reaches its main screen without crashing, no red-screen / fatal
  error, and no fatal errors in the logs during launch.
- **Fail when:** crash on launch, red screen, stuck splash, or a fatal error.
- Capture a screenshot of the launched main screen as evidence.

## Reporting

Report the baseline result as a section with, for each check: the verdict (✅ pass /
❌ fail), a one-line note, and the captured screenshot. If any baseline check fails, the
feature fails QA regardless of its acceptance criteria — state this clearly.
