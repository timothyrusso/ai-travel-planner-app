export const meta = {
  name: 'implement-issue-pipeline',
  description:
    'THE issue-implementation pipeline (single encoding): explore → build → wire PR → review ∥ device QA → finding vetting → bounded auto-fix → one consolidated run comment → visual summary. Gate-free — any clarify/grill conversation happens in the /implement-issue skill BEFORE this launches. Approval happens at PR review before merge.',
  whenToUse:
    'Launched by the /implement-issue skill after its interactive judgment, or invoked directly (headless/batch) on a crisp, pre-approved issue. For uncertain issues run /implement-issue instead — it grills first, then delegates here.',
  phases: [
    { title: 'Explore', detail: 'explorer maps the issue onto the architecture (default on)' },
    { title: 'Build', detail: 'feature-builder implements + opens PR' },
    { title: 'Wire PR', detail: 'assign PR + add to project + check agent-device/agent-browser available (best-effort)' },
    { title: 'Review', detail: 'code-reviewer checks the diff against the rules (parallel with QA)' },
    { title: 'QA', detail: 'qa-engineer drives the app on a device — only when the issue has a mobile surface' },
    { title: 'Web QA', detail: 'qa-web-engineer drives Chromium via agent-browser — only when the issue has a web surface' },
    { title: 'Vet', detail: 'one skeptic per blocking finding tries to refute it before it can trigger a fix' },
    { title: 'Fix', detail: 'feature-builder addresses confirmed findings (history-aware, stops early if stuck)' },
    { title: 'Report', detail: 'assemble and post the ONE consolidated run comment (best-effort, even on abort)' },
    {
      title: 'Visual summary',
      detail:
        'publish the QA screenshots on a per-PR evidence branch and post/update the marker comment — only when there is something visual to show (best-effort, after the report)',
    },
  ],
}

// ═════════════════════════════════════════════════════════════════════════════════════
// ARGS — parse, validate, and derive the run options (full contract: wiki AGENTIC_WORKFLOW)
// ═════════════════════════════════════════════════════════════════════════════════════

const DEFAULT_MAX_FIX_ROUNDS = 2

let rawArgs = args
if (typeof rawArgs === 'string') {
  try {
    rawArgs = JSON.parse(rawArgs)
  } catch {}
}

const opts = typeof rawArgs === 'object' && rawArgs !== null ? rawArgs : { issue: rawArgs }

const issue = opts.issue

if (!issue || !/^\d+$/.test(String(issue))) {
  throw new Error(`implement-issue-pipeline: \`issue\` must be a GitHub issue number, got: ${JSON.stringify(issue)}`)
}

const suppliedReport =
  typeof opts.explorerReport === 'string' && opts.explorerReport.trim() ? opts.explorerReport : null

const clarifications =
  typeof opts.clarifications === 'string' && opts.clarifications.trim() ? opts.clarifications : null

const doExplore = opts.explore !== false && !suppliedReport

const doReview = opts.review !== false

const doQa = opts.qa !== false

// QA surfaces. `null` => let the explorer decide (see resolveQaTargets); an explicit array
// pins the run (e.g. { qaTargets: ['web'] } to force web-only QA on a headless run).
const VALID_QA_TARGETS = ['mobile', 'web']
let qaTargetsOverride = null
if (opts.qaTargets !== undefined) {
  if (!Array.isArray(opts.qaTargets) || opts.qaTargets.some(t => !VALID_QA_TARGETS.includes(t))) {
    throw new Error(
      `implement-issue-pipeline: \`qaTargets\` must be an array of ${VALID_QA_TARGETS.join('|')}, got: ${JSON.stringify(opts.qaTargets)}`,
    )
  }
  qaTargetsOverride = [...new Set(opts.qaTargets)]
}

const worktree = opts.worktree === true

if (opts.maxFix !== undefined && (!Number.isInteger(opts.maxFix) || opts.maxFix < 0)) {
  throw new Error(`implement-issue-pipeline: \`maxFix\` must be a non-negative integer, got: ${JSON.stringify(opts.maxFix)}`)
}
const MAX_FIX = opts.maxFix === undefined ? DEFAULT_MAX_FIX_ROUNDS : opts.maxFix

const iso = worktree ? { isolation: 'worktree' } : {}

// ═════════════════════════════════════════════════════════════════════════════════════
// REPORTING — the ONE consolidated PR comment
// ═════════════════════════════════════════════════════════════════════════════════════

function clip(text, max) {
  const s = typeof text === 'string' ? text : ''
  return s.length > max ? `${s.slice(0, max)}\n\n_…truncated_` : s
}

function section(title, body) {
  return `<details>\n<summary>${title}</summary>\n\n${body && body.trim() ? body : '_not available_'}\n\n</details>`
}

function buildFinalComment() {
  const status = abortError
    ? `⛔ ABORTED at ${abortStage}`
    : outstanding.length === 0 && vetted.suspect.length === 0
      ? '✅ PASSED'
      : '❌ NOT PASSED'
  const reviewV = doReview ? (review ? review.verdict : 'n/a') : 'skipped'
  const ranMobile = doQa && qaTargets.includes('mobile')
  const ranWeb = doQa && qaTargets.includes('web')
  const qaV = ranMobile ? (qa ? qaVerdictFrom(qa) : 'n/a') : 'skipped'
  const qaWebV = ranWeb ? (qaWeb ? qaVerdictFrom(qaWeb) : 'n/a') : 'skipped'

  const attention = []
  if (abortError) attention.push(`- ⛔ aborted at ${abortStage}: ${abortError.message || abortError}`)
  for (const f of outstanding) attention.push(`- ❌ outstanding [${f.source}] ${clip(f.text, 300)}`)
  for (const f of vetted.suspect) attention.push(`- ⚠️ suspect, needs human verification [${f.source}] ${clip(f.text, 300)}`)
  if (stuck) attention.push('- 🔁 fix loop stopped early: no progress between rounds')
  if (vetted.refuted.length > 0) attention.push(`- 🚮 ${vetted.refuted.length} finding(s) refuted by vetting — spot-check in the Vetting section`)

  const vetLines = []
  for (const f of vetted.confirmed) vetLines.push(`- CONFIRMED [${f.source}] ${clip(f.text, 300)}\n  - ${clip(f.vetReason, 300)}`)
  for (const f of vetted.suspect) vetLines.push(`- SUSPECT [${f.source}] ${clip(f.text, 300)}\n  - ${clip(f.vetReason, 300)}`)
  for (const f of vetted.refuted) vetLines.push(`- REFUTED [${f.source}] ${clip(f.text, 300)}\n  - ${clip(f.vetReason, 300)}`)

  const buildBody =
    clip(build.report, 15000) +
    fixHistory.map(h => `\n\n---\n\n**Fix round ${h.round}** — ${h.summary}\n\n${clip(h.report, 8000)}`).join('')

  const parts = [
    `## 🤖 Pipeline run — issue #${issue} · ${status}`,
    '',
    `**review ${reviewV} · device QA ${qaV} · web QA ${qaWebV} · ${fixAttempts} fix round(s)**`,
    '',
    build.summary || '',
    attention.length > 0 ? `\n**Needs attention:**\n${attention.join('\n')}` : '',
    '',
    section('🔨 Build report', buildBody),
    section('🔍 Code review', doReview ? clip(review && review.report, 15000) : '_skipped_'),
    section('🧪 Device QA', ranMobile ? clip(qa && qa.report, 15000) : '_skipped — no mobile surface for this issue_'),
    section('🌐 Web QA', ranWeb ? clip(qaWeb && qaWeb.report, 15000) : '_skipped — no web surface for this issue_'),
  ]
  if (vetLines.length > 0) parts.push(section('🕵️ Finding vetting', vetLines.join('\n')))
  return clip(parts.join('\n'), 60000)
}

// ═════════════════════════════════════════════════════════════════════════════════════
// SCHEMAS — structured-output contracts, one per agent stage
// ═════════════════════════════════════════════════════════════════════════════════════

const EXPLORE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    report: { type: 'string' },
    qaTargets: {
      type: 'array',
      items: { enum: ['mobile', 'web'] },
    },
    qaTargetsReason: { type: 'string' },
    // Optional on purpose: an explorer that omits it must still deliver its report and QA
    // routing — an omitted visual proposal reads exactly like an empty one and only turns the
    // visual summary off (see exploredVisualSubjects), it never invalidates the exploration.
    visualSubjects: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          capture: { type: 'string' },
        },
        required: ['capture'],
      },
    },
  },
  required: ['report', 'qaTargets', 'qaTargetsReason'],
}

const BUILD_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    prUrl: { type: 'string' },
    summary: { type: 'string' },
    report: { type: 'string' },
  },
  required: ['prUrl', 'summary', 'report'],
}

const REVIEW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    verdict: { enum: ['PASS', 'CHANGES-REQUESTED'] },
    blockingFindings: { type: 'array', items: { type: 'string' } },
    report: { type: 'string' },
  },
  required: ['verdict', 'blockingFindings', 'report'],
}

const QA_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'string' },
          criterion: { type: 'string' },
          class: { enum: ['flow', 'edge', 'ux'] },
          verdict: { enum: ['PASS', 'FAIL', 'BLOCKED', 'NEEDS-REVIEW'] },
          note: { type: 'string' },
        },
        required: ['id', 'criterion', 'class', 'verdict', 'note'],
      },
    },
    baseline: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          check: { type: 'string' },
          pass: { type: 'boolean' },
        },
        required: ['check', 'pass'],
      },
    },
    blockingFindings: { type: 'array', items: { type: 'string' } },
    notPerformedReason: { type: 'string' },
    // The visual capture pass, in publication order. Optional on purpose: a QA lane that
    // captured nothing (or was never asked to) must still deliver its verdicts — the visual
    // summary is a bonus, never a reason to invalidate a QA result.
    manifest: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          path: { type: 'string' },
          caption: { type: 'string' },
          surface: { enum: ['iOS', 'Android'] },
          variant: { enum: ['single', 'before', 'after'] },
        },
        required: ['path', 'caption', 'surface'],
      },
    },
    report: { type: 'string' },
  },
  required: ['items', 'baseline', 'blockingFindings', 'report'],
}

const VET_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    verdict: { enum: ['confirmed', 'refuted', 'suspect'] },
    reason: { type: 'string' },
  },
  required: ['verdict', 'reason'],
}

const WIRE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    agentDeviceReady: { type: 'boolean' },
    agentBrowserReady: { type: 'boolean' },
    note: { type: 'string' },
  },
  required: ['agentDeviceReady', 'agentBrowserReady', 'note'],
}

const VISUAL_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    published: { type: 'number' },
    commentAction: { enum: ['created', 'updated', 'failed'] },
    note: { type: 'string' },
  },
  required: ['published', 'commentAction', 'note'],
}

// ═════════════════════════════════════════════════════════════════════════════════════
// PROMPTS — the static ones. Prompts that interpolate run state at declaration time
// (buildPrompt needs the exploration report, wirePrompt needs the PR URL) are declared
// inline in the STAGES flow instead.
// ═════════════════════════════════════════════════════════════════════════════════════

const clarificationsBlock = clarifications
  ? `\n\nClarifications from the pre-build conversation (authoritative additions to the issue's Description):\n${clarifications}`
  : ''

// The whole visual summary is capped at MAX_VISUAL_IMAGES published images, and a before/after
// pair costs two of them — so this is three comparisons at most.
const MAX_VISUAL_IMAGES = 6

// The hidden marker is how a re-run finds its own comment again and updates it in place
// instead of posting a second one. The images are linked from raw content on the per-PR
// evidence branch: GitHub's attachment upload endpoint is browser-session-only, so hosting
// the bytes ourselves is the only way to get pixels into a comment from automation.
const VISUAL_MARKER = '<!-- holidai:visual-summary -->'
const RAW_CONTENT_BASE = 'https://raw.githubusercontent.com/timothyrusso/HolidAI'

// The proposal decides whether device QA captures at all: an empty proposal from a successful
// exploration switches the pass off; NO decision at all (explore skipped, failed, or returned
// nothing) leaves the judgement to the QA agent rather than silently dropping the summary.
function visualCaptureBlock() {
  if (exploredVisualSubjects === null) {
    return `\n\nVISUAL CAPTURE PASS: no explorer proposal is available for this run. Judge for yourself whether this change is visually relevant (a new screen or component, a restyle, a colour/spacing change, or a bug fix whose symptom was visual); if it is, run the dedicated capture pass from your instructions AFTER the acceptance-criteria items and return the shots as \`manifest\` — otherwise return an empty \`manifest\`.`
  }
  if (exploredVisualSubjects.length === 0) {
    return `\n\nVISUAL CAPTURE PASS: the explorer proposed no visual subject for this issue — skip the capture pass entirely and return an empty \`manifest\`.`
  }
  return `\n\nVISUAL CAPTURE PASS: AFTER the acceptance-criteria items, run the dedicated capture pass from your instructions (a fresh, deliberate shot per subject — never a reuse of an assertion screenshot) for the subjects the explorer proposed, and return them as \`manifest\` entries with a one-line \`caption\`, the \`surface\`, a \`variant\`, and an absolute \`path\` to a \`.png\` saved directly in \`coverage/qa/${issue}/\` — the pipeline publishes those bytes on a public branch, so it drops any entry pointing anywhere else:\n${exploredVisualSubjects
    .map((s, i) => `${i + 1}. ${s.capture}`)
    .join(
      '\n',
    )}\nDrop a subject you could not reach (say why in your report) and add one you discovered while testing that shows the change better. The summary has a hard budget of ${MAX_VISUAL_IMAGES} published images and a before/after pair costs two, so the pipeline trims anything over it, keeping your order. Every failure in this pass is non-blocking: skip the subject, note it, and let the QA verdict stand.`
}

const explorePrompt = `Run pre-implementation exploration for GitHub issue #${issue} per your process: map the issue onto the architecture (target feature and dependency tier, files/layers to touch, closest pattern to mirror, integration points, risks, suggested approach). Return the full structured exploration report as the \`report\` string.

ALSO decide which runtime surfaces this issue needs QA'd, and return them as \`qaTargets\` with a one-line \`qaTargetsReason\`:
- \`"mobile"\` — the change is observable in the iOS/Android app (a screen, navigation, native module, app-wide behaviour). Driven on a device by qa-engineer.
- \`"web"\` — the change is observable in a browser (web Storybook, \`expo start --web\`, anything served over HTTP). Driven in Chromium by qa-web-engineer.
- Both, when the issue genuinely has both surfaces.
- \`[]\` (EMPTY) — when NO acceptance criterion can be verified at runtime: pure build tooling, CI config, lint rules, docs, agent/workflow config, or type-only changes. An empty array SKIPS QA entirely; that is the correct answer for such issues, not a failure. Do not pad the list to look thorough — a QA run that can only report BLOCKED is worse than no QA run.
Judge from the acceptance criteria and the files the change will touch, not from the issue title.

ALSO propose what is worth SCREENSHOTTING IN THE MOBILE APP once the change is built, as \`visualSubjects\` — one entry per subject, each a single \`capture\` line naming the state the shot must show. Device QA shoots those subjects after its acceptance-criteria pass and the pipeline publishes them as a single visual summary comment on the PR, so the change can be judged from the PR alone. Propose subjects only when the change is visually relevant IN THE APP ITSELF (a new screen or component reachable in the app, a restyle, a colour/spacing change, or a bug fix whose symptom was visual) — a component that only exists as a story gets NO subject on any surface, since the PR already carries a link to its live web Storybook. Keep the list to the 3–4 subjects that best show the change; the whole summary is capped at ${MAX_VISUAL_IMAGES} images. Return \`[]\` for anything with no visible result (tooling, CI, docs, types, agent/workflow config, pure logic refactors) — an empty list correctly switches capture, push, and comment off for the whole run.${clarificationsBlock}`

const reviewPrompt = `Review the change on branch feature/${issue} (issue #${issue}) per your process. Do NOT post any PR comment. Return your overall verdict (PASS or CHANGES-REQUESTED), the list of blocking findings (empty if none), and your full review report markdown as \`report\`.`

const qaPrompt = deviceReady =>
  `Run device QA for issue #${issue} on branch feature/${issue} via agent-device per your process (baseline checks + acceptance criteria). Do NOT post any PR comment. Return the structured result mirroring your report: items[] (one entry per test item — id, the acceptance criterion it verifies verbatim, class, per-item verdict, one-line note with evidence path on FAIL), baseline[] ({check, pass} per baseline check), blockingFindings (empty if none), notPerformedReason ONLY if the app could not be run, and your full QA report markdown as \`report\`. Do NOT compute an overall verdict — the pipeline derives it from the items. Every acceptance criterion must appear in items; if one could not be exercised, report it as BLOCKED with the reason.${
    deviceReady
      ? ' The agent-device CLI has already been verified available in this run — skip your own version check entirely.'
      : ''
  } This run also has a separate web-QA agent covering browser surfaces: if an acceptance criterion is browser-only, mark it BLOCKED as out of scope for mobile QA rather than improvising a browser session.${visualCaptureBlock()}`

const qaWebPrompt = browserReady =>
  `Run web QA for issue #${issue} on branch feature/${issue} via agent-browser per your process (web baseline checks + acceptance criteria). Do NOT post any PR comment. Return the structured result mirroring your report: items[] (one entry per test item — id, the acceptance criterion it verifies verbatim, class, per-item verdict, one-line note with evidence path on FAIL), baseline[] ({check, pass} per baseline check), blockingFindings (empty if none), notPerformedReason ONLY if the web target could not be served, and your full QA report markdown as \`report\`. Do NOT compute an overall verdict — the pipeline derives it from the items. Every acceptance criterion must appear in items; if one could not be exercised, report it as BLOCKED with the reason.${
    browserReady
      ? ' The agent-browser CLI has already been verified available in this run — skip your own version check entirely.'
      : ''
  } This run also has a separate mobile-QA agent covering device surfaces: if an acceptance criterion is device-only, mark it BLOCKED as out of scope for web QA rather than driving a simulator.`

const fixPrompt = (findings, attempt, history, persistedKeys) =>
  `Fix mode for issue #${issue} (attempt ${attempt}/${MAX_FIX}). Branch feature/${issue} and its PR already exist — do NOT create a new branch or PR, and do NOT post any PR comment. Address these CONFIRMED blocking findings as new commits on the existing branch, then return the PR URL, a one-line summary of the fixes, and your fix report markdown as \`report\`:\n${findings
    .map((f, i) => `${i + 1}. [${f.source}]${persistedKeys.has(findingKey(f)) ? ' [PERSISTS — a previous fix attempt did NOT clear this]' : ''} ${f.text}`)
    .join('\n')}${
    history.length > 0
      ? `\n\nPrevious fix attempts in this run:\n${history
          .map(h => `- Attempt ${h.round}: "${h.summary}"`)
          .join('\n')}\nFindings marked [PERSISTS] survived those attempts — the tried approach is wrong for them. Do NOT repeat it: re-diagnose from scratch (read the code around your previous fix commits, check the adjacent layer, question the assumed root cause) and take a different angle.`
      : ''
  }`

const SOURCE_LABEL = { qa: 'device-QA', qaWeb: 'web-QA', review: 'code-review' }

const vetPrompt = f =>
  `Adversarially verify ONE ${SOURCE_LABEL[f.source] || 'code-review'} finding for issue #${issue} (branch feature/${issue}, PR ${build.prUrl}) per your process. The finding:\n\n"${f.text}"\n\nTry to refute it against the actual diff, code, and captured QA evidence. Return confirmed, refuted, or suspect with your reason.`

const visualPrompt = (prNumber, plan) => `Publish the VISUAL SUMMARY for the pull request ${build.prUrl} (issue #${issue}): the screenshots device QA captured, so the change can be judged from the PR alone. Everything here is best-effort — if a step fails, do as much as still makes sense, report what failed in \`note\`, and stop; never retry in a loop.

Hard boundaries: do NOT edit the PR body or title · do NOT edit or delete any comment other than the one carrying the marker below · do NOT commit anything to \`feature/${issue}\` and do NOT switch the current working tree to another branch · do NOT bypass git hooks (\`--no-verify\` is forbidden).

Capture plan — publish exactly these units, in this order. \`source\` is the PNG already on disk, \`name\` is the file name to publish it under (without extension):
\`\`\`json
${JSON.stringify(plan, null, 2)}
\`\`\`

1. CONVERT — in a scratch directory, for every image of the plan, FIRST prove the source really is a PNG that THIS repository's QA wrote for this issue. Define this function once and run it per source:
   \`\`\`bash
   check_source() {
     src=$1
     dir=$(cd "$(dirname "$src")" 2>/dev/null && pwd -P) || return 1
     top=$(git -C "$dir" rev-parse --show-toplevel 2>/dev/null) || return 1
     top=$(cd "$top" && pwd -P) || return 1
     [ "$dir" = "$top/coverage/qa/${issue}" ] || return 1
     git -C "$top" remote get-url origin 2>/dev/null | grep -Eq 'github\\.com[:/]timothyrusso/HolidAI(\\.git)?/?$' || return 1
     [ -f "$src" ] && [ ! -L "$src" ] || return 1
     [ "$(head -c 8 "$src" | od -An -tx1 | tr -d ' \\n')" = "89504e470d0a1a0a" ] || return 1
   }
   \`\`\`
   Line by line: the source's directory must resolve (symlinks included) to exactly \`<git top-level>/coverage/qa/${issue}\`; that top-level must be a checkout of this repository, which is how a lookalike \`/tmp/whatever/coverage/qa/${issue}\` is rejected even when someone ran \`git init\` in it; the file must be a regular file, not a symlink; and its first 8 bytes must be the PNG magic number \`\\211PNG\\r\\n\\032\\n\`. Do NOT hardcode a repository path instead of \`rev-parse\`: the QA agent may legitimately have run in a temporary worktree, so its \`coverage/qa/${issue}/\` lives under a path neither you nor the pipeline knows in advance.
   Drop — and note in \`note\` — every image that fails, and never make it fatal: the whole visual summary is best-effort and cannot change the run verdict. Be clear-eyed about what this buys: these bytes go to a PUBLIC branch and the pipeline's own path check is lexical (it has no filesystem), so this is the only place the real file is inspected — but it is a blast-radius reducer, not a sandbox. It stops malformed paths, links out of the evidence directory, hard links to plaintext secrets and bytes that do not even open with the PNG magic number — but a header is not an image, so it is the DECODE PROBE below, not this check, that decides whether the rest of the file is really a picture; it cannot stop a genuinely hostile agent, which runs as the same user and could encode any readable file into a valid PNG. Then handle what survived in TWO separate ffmpeg runs — a decode probe, then the conversion — and never merge them back into one:
   \`\`\`bash
   ffmpeg -v error -i "<source>" -f null -                                                                                   # a. PROBE  — decodes, writes nothing
   ffmpeg -y -i "<source>" -vf "scale='if(gt(iw,ih),min(1080,iw),-2)':'if(gt(iw,ih),-2,min(1080,ih))'" "<scratch>/<name>.webp"  # b. CONVERT — caps the long edge at 1080 px
   \`\`\`
   The probe answers exactly ONE question — do these bytes decode as an image? — and it is the probe's EXIT CODE you branch on first, never a single "it did not work" catch-all, because the three outcomes need opposite handling:
   - ffmpeg ABSENT — the probe exits 127, command not found. Nothing ever looked at the bytes, so a genuine screenshot must still reach the PR: skip the conversion and copy the source unchanged to \`<scratch>/<name>.png\`.
   - PROBE FAILED — ffmpeg ran and answered any other non-zero exit code (it answers 69 on data it cannot decode). ffmpeg is a decoder: its refusal is itself proof that the source is not a decodable image, whatever its first 8 bytes claim. DROP that image, \`rm -f\` anything it left behind, and record the drop in \`note\`. Never run the conversion and never copy the source: bytes ffmpeg just refused to decode are exactly the bytes that must not be published — a screenshot truncated by a crashed capture, or a file that is nothing but a PNG header glued in front of something else.
   - PROBE SUCCEEDED — exit code 0, so the source is a proven, decodable image. Now run the conversion, and branch on ITS result:
     - conversion succeeded (exit 0 and a NON-EMPTY \`.webp\`) — publish that \`.webp\`.
     - conversion failed, or exit 0 with a 0-byte \`.webp\` — \`rm -f "<scratch>/<name>.webp"\` UNCONDITIONALLY, whether it is 0-byte or a partial file a failed encode left behind, and only then copy the SOURCE unchanged to \`<scratch>/<name>.png\`, noting it in \`note\`. Removing only the empty case is not enough: step 2's \`find\` sweeps every \`.webp\` in the scratch directory onto the public branch, so a truncated one rides along beside the \`.png\` you actually linked.
   Why the copy is safe there and ONLY there: it is the successful PROBE that licenses it — not \`check_source\`, not the \`.png\` extension — because the probe already proved the bytes decode as an image. A failing conversion says nothing about the input; it is an ENVIRONMENT or ENCODER failure. The concrete case this exists for: an ffmpeg built WITHOUT libwebp decodes PNGs perfectly and fails every single WebP encode, and a write error or a full disk behave the same way. Collapse these branches back together and that machine silently drops every screenshot in the run, leaving an empty visual summary with no explanation.
   Remember each file's ACTUAL extension: the markdown must link the file you really produced (\`.webp\` or \`.png\`).
2. PUSH — publish those files on the per-PR evidence branch \`qa-evidence/pr-${prNumber}\`, branched FRESH off the PR head each time so it shares git objects with the feature branch and a re-run replaces the previous evidence instead of stacking on it:
   \`\`\`bash
   git fetch origin feature/${issue}
   git worktree add --detach "<scratch>/evidence" origin/feature/${issue}
   mkdir -p "<scratch>/evidence/qa"
   find "<scratch>" -maxdepth 1 -type f \\( -name '*.webp' -o -name '*.png' \\) -exec cp {} "<scratch>/evidence/qa/" \\;
   git -C "<scratch>/evidence" add qa
   git -C "<scratch>/evidence" commit -m "chore(${issue}): visual qa evidence for pull request ${prNumber}"
   git -C "<scratch>/evidence" push --force origin HEAD:refs/heads/qa-evidence/pr-${prNumber}
   git worktree remove --force "<scratch>/evidence"
   \`\`\`
   Use a detached worktree exactly like that — never \`git checkout\` in the main working tree — so the feature branch, its diff, and any work in progress stay untouched, and always remove the worktree at the end, including on failure. Collect the files with \`find\` exactly as written, NOT with a \`cp <scratch>/*.webp <scratch>/*.png\` glob: your shell is zsh, where a pattern that matches nothing aborts the whole command, and one of the two patterns normally matches nothing (no \`.png\` when every conversion succeeded, no \`.webp\` when ffmpeg is missing or cannot encode WebP) — the copy would silently move zero files. Then check that \`<scratch>/evidence/qa\` is non-empty before committing: if it is empty, skip the commit and the push, remove the worktree, and report it in \`note\` (there is nothing to publish, and the commit would fail anyway).
3. BUILD THE COMMENT — write EXACTLY this markdown to a file and nothing else: no intro, no footer, no per-image commentary, no notes about what failed (that goes in \`note\`, not in the comment).
   - First line: \`${VISUAL_MARKER}\` — the very first characters of the body, nothing (not even a blank line) before it: step 4 finds the comment by that PREFIX, so a marker anywhere else makes the comment unfindable and a re-run posts a duplicate.
   - Then: \`## 📸 Visual summary\`
   - Then, per plan unit IN PLAN ORDER: the caption line \`**<surface> — <caption>**\` with \`surface\` and \`caption\` verbatim from the plan, a blank line, then
     - \`"layout": "single"\` → \`![<surface> — <caption>](<url>)\`
     - \`"layout": "pair"\` → a two-column table, before on the left:
       \`| Before | After |\`
       \`| --- | --- |\`
       \`| ![<caption> before](<before url>) | ![<caption> after](<after url>) |\`
   - Every url is \`${RAW_CONTENT_BASE}/qa-evidence/pr-${prNumber}/qa/<file name with its real extension>\`.
   - Skip any unit whose images all failed to convert or push.
4. POST OR UPDATE — exactly ONE comment, found by its hidden marker so a re-run edits it in place instead of adding a second one:
   \`\`\`bash
   id=$(gh api "repos/timothyrusso/HolidAI/issues/${prNumber}/comments" --paginate --jq '[.[] | select(.user.login == "timothyrusso") | select(.body | startswith("${VISUAL_MARKER}"))] | .[0].id // empty' | head -n 1)
   if [ -n "$id" ]; then gh api -X PATCH "repos/timothyrusso/HolidAI/issues/comments/$id" -F body=@<comment file>; else gh pr comment ${build.prUrl} --body-file <comment file>; fi
   \`\`\`
   Match the marker with \`startswith\` exactly as written, NEVER with \`contains\`: the consolidated run report posted just before you routinely QUOTES this feature's own build and review reports — marker text included — so \`contains\` matches that older comment first and the PATCH silently overwrites the run report with the visual summary. Only a comment whose body STARTS with the marker (step 3) is yours. \`head -n 1\` is there because \`--paginate\` runs the filter once per page.
   Never use \`gh pr comment --edit-last\`: the run-report comment was just posted by the same author and would be overwritten.
5. VERIFY — \`curl -sI <one published url>\` and confirm it answers 200; say so in \`note\` if it does not.

Return \`published\` (how many images the posted comment actually links), \`commentAction\` (\`created\`, \`updated\`, or \`failed\`), and a one-line \`note\` covering anything dropped or failed.`

// ═════════════════════════════════════════════════════════════════════════════════════
// STAGE HELPERS — verify (review ∥ QA), verdict derivation, finding fingerprints, vetting
// ═════════════════════════════════════════════════════════════════════════════════════

async function verify() {
  // Starting an attempt invalidates the previous round's results immediately: the lanes are
  // only reassigned once every agent has come back (below), so an attempt that throws — a
  // rejecting lane, a busted device — would otherwise leave the pre-fix results in place and
  // let the visual summary publish pre-fix pixels off a post-fix head as if they were current.
  review = null
  qa = null
  qaWeb = null
  const wantMobile = doQa && qaTargets.includes('mobile')
  const wantWeb = doQa && qaTargets.includes('web')
  if (!doReview && !wantMobile && !wantWeb) return { review: null, qa: null, qaWeb: null }
  const kinds = []
  const thunks = []
  if (doReview) {
    kinds.push('review')
    thunks.push(() => agent(reviewPrompt, { agentType: 'code-reviewer', label: `review:${issue}`, phase: 'Review', schema: REVIEW_SCHEMA }))
  }
  if (wantMobile) {
    kinds.push('qa')
    thunks.push(() => agent(qaPrompt(agentDeviceReady), { agentType: 'qa-engineer', label: `qa:${issue}`, phase: 'QA', schema: QA_SCHEMA, ...iso }))
  }
  if (wantWeb) {
    kinds.push('qaWeb')
    thunks.push(() => agent(qaWebPrompt(agentBrowserReady), { agentType: 'qa-web-engineer', label: `qa-web:${issue}`, phase: 'Web QA', schema: QA_SCHEMA, ...iso }))
  }
  const results = await parallel(thunks)

  const byKind = {}
  kinds.forEach((k, i) => {
    byKind[k] = results[i]
  })

  if (doReview) review = byKind.review || null
  if (wantMobile) qa = byKind.qa || null
  if (wantWeb) qaWeb = byKind.qaWeb || null
  if (doReview && !byKind.review) throw new Error(`code-reviewer returned no result for issue #${issue}`)
  if (wantMobile && !byKind.qa) throw new Error(`qa-engineer returned no result for issue #${issue}`)
  if (wantWeb && !byKind.qaWeb) throw new Error(`qa-web-engineer returned no result for issue #${issue}`)

  return { review: byKind.review || null, qa: byKind.qa || null, qaWeb: byKind.qaWeb || null }
}

function qaVerdictFrom(qa) {
  if (!qa) return null
  if (qa.notPerformedReason) return 'NOT_PERFORMED'
  if (qa.items.length === 0) return 'NOT_PERFORMED'
  const baselineFailed = qa.baseline.some(b => !b.pass)
  const itemFailed = qa.items.some(i => i.verdict === 'FAIL')
  return baselineFailed || itemFailed || qa.blockingFindings.length > 0 ? 'FAIL' : 'PASS'
}

function findingKey(f) {
  // Mobile QA items are T01…, web QA items are W01… — key on the item id when present so the
  // same failing item across fix rounds fingerprints identically (and so a T-id from mobile
  // never collides with a W-id from web).
  const isQa = f.source === 'qa' || f.source === 'qaWeb'
  const tid = isQa ? (f.text.match(/\b[TW]\d{2,}\b/) || [])[0] : null
  return tid ? `${f.source}:${tid}` : `${f.source}:${f.text.toLowerCase().replace(/\s+/g, ' ').trim()}`
}
function roundFingerprint(findings) {
  return findings.map(findingKey).sort().join('\n')
}

function qaBlockingFrom(result, source, out) {
  if (!result || qaVerdictFrom(result) !== 'FAIL') return
  if (result.blockingFindings.length > 0) {
    for (const f of result.blockingFindings) out.push({ text: f, source })
  } else {
    for (const i of result.items.filter(i => i.verdict === 'FAIL')) {
      out.push({ text: `${i.id} (${i.criterion}): ${i.note}`, source })
    }
  }
}

function blockingFrom(review, qa, qaWeb) {
  const out = []
  if (review && review.verdict === 'CHANGES-REQUESTED') {
    for (const f of review.blockingFindings) out.push({ text: f, source: 'review' })
  }
  qaBlockingFrom(qa, 'qa', out)
  qaBlockingFrom(qaWeb, 'qaWeb', out)
  return out
}

// ─── Visual summary — turn device QA's capture manifest into ONE ordered, budgeted plan ─────
// A before/after pair (two entries sharing surface + caption) travels as ONE indivisible unit,
// so the budget can never publish half a comparison.

function visualSlug(text) {
  const slug = String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/, '')
  return slug || 'shot'
}

// A manifest `path` is agent-supplied input and the publisher copies whatever it points at
// onto a PUBLIC evidence branch, so an out-of-band path (a mistake, or a prompt injection the
// QA agent swallowed) would leak a file that has nothing to do with QA — the CONVERT step
// even renames anything ffmpeg cannot read to `.png` and pushes it. Only a `.png` file whose
// PARENT DIRECTORY is exactly `coverage/qa/<issue>` may travel; everything else is dropped and
// logged. This is a cheap LEXICAL PRE-FILTER, nothing more: workflow scripts have no
// filesystem access, so it cannot tell `/tmp/attacker/coverage/qa/<issue>/x.png` from the real
// evidence directory, nor a hard link from an original file. Proving the path belongs to a
// checkout of THIS repository, and that the bytes are actually a PNG, happens in the
// publisher's shell (step 1 of visualPrompt). It is deliberately NOT a `pattern` on
// QA_SCHEMA.manifest either — a malformed screenshot path must never invalidate a whole QA
// result.
const VISUAL_EVIDENCE_TAIL = `coverage/qa/${issue}`

function visualSource(path) {
  const raw = typeof path === 'string' ? path.trim() : ''
  if (!raw.startsWith('/') || raw.includes('\0') || !/\.png$/i.test(raw)) return null
  const segments = raw.split('/')
  const file = segments.pop()
  // Empty segments (`//`, a trailing slash) and `.` / `..` would make the tail comparison below
  // say nothing about the directory the path actually resolves to.
  if (!file || segments.slice(1).some(segment => segment === '' || segment === '.' || segment === '..')) return null
  // A genuine directory match, not a substring hit: the file must sit DIRECTLY in a directory
  // named `coverage/qa/<issue>` that itself hangs off a checkout directory, never off the root.
  return segments.length > 4 && segments.slice(-3).join('/') === VISUAL_EVIDENCE_TAIL ? raw : null
}

function laneUnits(result) {
  if (!result || !Array.isArray(result.manifest)) return []
  const units = []
  const pairs = new Map()
  for (const entry of result.manifest) {
    if (!entry || !entry.caption || !entry.surface) continue
    const source = visualSource(entry.path)
    if (!source) {
      log(`Visual summary: dropped a manifest entry — not a .png sitting directly in a coverage/qa/${issue}/ directory: ${String(entry.path).slice(0, 120)}`)
      continue
    }
    const variant = entry.variant === 'before' || entry.variant === 'after' ? entry.variant : 'single'
    const image = { variant, source }
    if (variant === 'single') {
      units.push({ layout: 'single', surface: entry.surface, caption: entry.caption, images: [image] })
      continue
    }
    const key = `${entry.surface}::${entry.caption}`
    let unit = pairs.get(key)
    if (!unit) {
      unit = { layout: 'pair', surface: entry.surface, caption: entry.caption, images: [] }
      pairs.set(key, unit)
      units.push(unit)
    }
    if (!unit.images.some(i => i.variant === variant)) unit.images.push(image)
  }
  // A half pair (its counterpart failed to capture) degrades to a plain single shot.
  for (const unit of units) if (unit.layout === 'pair' && unit.images.length < 2) unit.layout = 'single'
  return units
}

function unitsCost(units) {
  return units.reduce((total, unit) => total + unit.images.length, 0)
}

function visualPlan(result) {
  const units = laneUnits(result)
  const kept = []
  if (unitsCost(units) <= MAX_VISUAL_IMAGES) {
    kept.push(...units)
  } else {
    let used = 0
    for (const unit of units) {
      // Keep scanning past a unit that no longer fits: a cheaper later unit may still make it.
      if (used + unit.images.length > MAX_VISUAL_IMAGES) continue
      kept.push(unit)
      used += unit.images.length
    }
  }
  let index = 0
  return kept.map(unit => ({
    surface: unit.surface,
    caption: unit.caption,
    layout: unit.layout,
    images: unit.images
      // "before" first so the table columns read Before | After whatever order QA returned.
      .slice()
      .sort((a, b) => (a.variant === b.variant ? 0 : a.variant === 'before' ? -1 : 1))
      .map(image => ({
        variant: image.variant,
        source: image.source,
        name: `${String(++index).padStart(2, '0')}-${visualSlug(`${unit.surface} ${unit.caption}`)}${image.variant === 'single' ? '' : `-${image.variant}`}`,
      })),
  }))
}

async function vetFindings(findings) {
  if (findings.length === 0) return { confirmed: [], refuted: [], suspect: [] }
  const results = await parallel(
    findings.map((f, i) => () =>
      agent(vetPrompt(f), { agentType: 'finding-vetter', label: `vet:${issue}#${i + 1}`, phase: 'Vet', schema: VET_SCHEMA })),
  )

  const out = { confirmed: [], refuted: [], suspect: [] }
  findings.forEach((f, i) => {
    const v = results[i]
    const verdict = v && v.verdict ? v.verdict : 'confirmed'
    out[verdict].push({ ...f, vetReason: v && v.reason ? v.reason : 'vetter unavailable — kept (fail-safe)' })
  })
  if (out.refuted.length > 0) log(`Vet: refuted ${out.refuted.length} finding(s) — excluded from fix`)
  if (out.suspect.length > 0) log(`Vet: ${out.suspect.length} suspect device claim(s) — need human eyes, not auto-fixed`)
  return out
}

// ═════════════════════════════════════════════════════════════════════════════════════
// STAGES — the pipeline flow: explore → build → wire → (verify ∥) → vet → fix loop →
// consolidated report → return (abort in any post-build stage still posts the report)
// ═════════════════════════════════════════════════════════════════════════════════════

let explorerReport = suppliedReport
// null until resolved: an explicit override wins; otherwise the explorer decides; if the
// explorer never ran or failed, fall back to both surfaces (see resolution below) so a
// broken explorer can never silently switch QA off.
let exploredQaTargets = null
// null => no decision was made (explore skipped, threw, or returned nothing at all): device QA
// judges visual relevance itself. [] => the exploration ran and proposed nothing — either
// an explicit empty list or an omitted/malformed field, both of which mean "nothing is worth
// showing" — which turns capture, push, and comment off for the whole run.
let exploredVisualSubjects = null
if (doExplore) {
  phase('Explore')
  try {
    const ex = await agent(explorePrompt, { agentType: 'explorer', label: `explore:${issue}`, schema: EXPLORE_SCHEMA })
    explorerReport = ex && ex.report ? ex.report : null
    if (ex && Array.isArray(ex.qaTargets)) {
      exploredQaTargets = [...new Set(ex.qaTargets.filter(t => VALID_QA_TARGETS.includes(t)))]
      log(`Explorer chose QA targets: ${exploredQaTargets.length ? exploredQaTargets.join(' + ') : 'none'} — ${ex.qaTargetsReason || 'no reason given'}`)
    }
    if (ex) {
      // An exploration that ran but omitted `visualSubjects` (the field is optional) HAS
      // decided: it found nothing worth showing. Treating that as "no decision" would flip
      // device QA into self-directed capture, the opposite of what the schema promises.
      const proposed = Array.isArray(ex.visualSubjects) ? ex.visualSubjects : []
      exploredVisualSubjects = proposed.filter(s => s && s.capture)
      log(
        exploredVisualSubjects.length
          ? `Explorer proposed ${exploredVisualSubjects.length} visual subject(s): ${exploredVisualSubjects.map(s => s.capture).join(' · ')}`
          : `Explorer ${Array.isArray(ex.visualSubjects) ? 'proposed no visual subject' : 'returned no visual proposal'} — visual summary disabled for this run`,
      )
    }
    if (!explorerReport) log('Explorer returned no report — builder will map the codebase itself (non-blocking)')
  } catch (e) {
    log(`Explore phase failed (non-blocking): ${e && e.message ? e.message : e}`)
  }
}

// Resolution order: explicit override > explorer's judgement > both (fail-safe).
const qaTargets = qaTargetsOverride ?? exploredQaTargets ?? [...VALID_QA_TARGETS]
if (qaTargetsOverride) log(`QA targets pinned by caller: ${qaTargetsOverride.length ? qaTargetsOverride.join(' + ') : 'none'}`)
else if (exploredQaTargets === null) log('No QA target decision available (explore skipped or failed) — defaulting to mobile + web')
if (doQa && qaTargets.length === 0) log('QA skipped: no runtime surface to verify for this issue')
if (exploredVisualSubjects === null) log('No visual-subject decision available (explore skipped, failed, or returned nothing) — device QA judges visual relevance itself')

const explorerBlock = explorerReport
  ? `\n\nExploration report (use it as your codebase map; don't re-explore from scratch):\n${explorerReport}`
  : ''

const buildPrompt = `Implement GitHub issue #${issue} for HolidAI, following your full process: read the issue, obey the architecture rules, verify with tsc + arch (once, before the commit sequence), create branch feature/${issue}, commit in small layer-aligned commits, and open the PR with an empty body. Do NOT post any PR comment. Return the PR URL, a one-line summary, and your full structured report markdown as \`report\`.${clarificationsBlock}${explorerBlock}`

phase('Build')
const build = await agent(buildPrompt, { agentType: 'feature-builder', label: `build:${issue}`, schema: BUILD_SCHEMA, ...iso })
if (!build || !build.prUrl) throw new Error(`build stage returned no PR for issue #${issue}`)
log(`Built issue #${issue} → ${build.prUrl}`)

const wirePrompt = `PR wiring + environment pre-check for the pull request ${build.prUrl}. Change PR METADATA ONLY — never edit the PR body or title (those are owned by the setup-pr workflow), and do not add issue-linking. Do exactly three things:
1. Assign the PR to timothyrusso: \`gh pr edit ${build.prUrl} --add-assignee timothyrusso\`.
2. Add the PR to GitHub Project #1: \`gh project item-add 1 --owner timothyrusso --url ${build.prUrl}\`. This needs the \`project\` scope on the gh token. If step 2 fails with a scope/authorization error, do NOT abort and do NOT undo step 1 — note the exact remediation \`gh auth refresh -s project\` and treat the run as fine. Step 1 must still stand.
3. Check the QA CLIs this run actually needs are available (read-only — do NOT install, update, or add any package).${
  qaTargets.includes('mobile')
    ? ' Run `agent-device --version` and return `agentDeviceReady: true` if it reports a version, `false` if it is missing or errors.'
    : ' This run does NOT need mobile QA — skip the agent-device check and return `agentDeviceReady: false`.'
}${
  qaTargets.includes('web')
    ? ' Run `agent-browser --version` and return `agentBrowserReady: true` if it reports a version, `false` if it is missing or errors.'
    : ' This run does NOT need web QA — skip the agent-browser check and return `agentBrowserReady: false`.'
} Keeping the CLIs up to date is handled by environment provisioning outside this run, never by this stage.
Summarise the outcome of all three in \`note\`.`

let agentDeviceReady = false
let agentBrowserReady = false

try {
  phase('Wire PR')
  const wire = await agent(wirePrompt, { agentType: 'general-purpose', label: `wire:${issue}`, effort: 'low', schema: WIRE_SCHEMA })
  agentDeviceReady = Boolean(wire && wire.agentDeviceReady === true)
  agentBrowserReady = Boolean(wire && wire.agentBrowserReady === true)
} catch (e) {
  log(`PR wiring step failed (non-blocking): ${e && e.message ? e.message : e}`)
}

let review = null
let qa = null
let qaWeb = null
let vetted = { confirmed: [], refuted: [], suspect: [] }
let fixAttempts = 0
let stuck = false
let abortError = null
let abortStage = null
const seenRounds = new Set()
const fixHistory = []
let prevKeys = new Set()

try {
  abortStage = 'verify'
  ;({ review, qa, qaWeb } = await verify())
  abortStage = 'vet'
  vetted = await vetFindings(blockingFrom(review, qa, qaWeb))

  while (vetted.confirmed.length > 0 && fixAttempts < MAX_FIX) {
    const fp = roundFingerprint(vetted.confirmed)
    if (seenRounds.has(fp)) {
      stuck = true
      log(`Convergence: findings identical to a previous round — stopping early (stuck) instead of spending fix round ${fixAttempts + 1}/${MAX_FIX}`)
      break
    }
    seenRounds.add(fp)

    fixAttempts++
    log(`Fix attempt ${fixAttempts}/${MAX_FIX} — ${vetted.confirmed.length} confirmed blocking finding(s)`)
    abortStage = `fix round ${fixAttempts}`
    phase('Fix')
    const fix = await agent(fixPrompt(vetted.confirmed, fixAttempts, fixHistory, prevKeys), { agentType: 'feature-builder', label: `fix:${issue}#${fixAttempts}`, schema: BUILD_SCHEMA, ...iso })
    fixHistory.push({ round: fixAttempts, summary: fix && fix.summary ? fix.summary : 'n/a', report: fix && fix.report ? fix.report : '' })
    prevKeys = new Set(vetted.confirmed.map(findingKey))
    abortStage = 'verify'
    ;({ review, qa, qaWeb } = await verify())
    abortStage = 'vet'
    vetted = await vetFindings(blockingFrom(review, qa, qaWeb))
  }
} catch (e) {
  abortError = e
  log(`Run aborted at ${abortStage}: ${e && e.message ? e.message : e} — posting the run report anyway`)
}

const outstanding = vetted.confirmed

try {
  phase('Report')
  const finalComment = buildFinalComment()
  const reportPrompt = `Post the pipeline run report below as a NEW comment on the pull request ${build.prUrl}. Do NOT edit the PR body, the PR title, or any existing comment — this must be an additional, standalone comment. Write everything between the <<<REPORT and REPORT>>> markers (excluding the markers themselves) VERBATIM — no edits, no summarising, no extra text — to a temp file, then run \`gh pr comment ${build.prUrl} --body-file <that-file>\`.

<<<REPORT
${finalComment}
REPORT>>>`
  await agent(reportPrompt, { agentType: 'general-purpose', label: `report:${issue}`, effort: 'low' })
} catch (e) {
  log(`Run-report step failed (non-blocking): ${e && e.message ? e.message : e}`)
}

// Visual summary — strictly AFTER the run report, so the pixels sit below the verdict. The
// pixels cannot be attached through the API (GitHub's user-attachments upload endpoint is
// browser-session-only), so they are pushed to a per-PR evidence branch and linked from raw
// content. Entirely best-effort: capture, conversion, push, or posting may all fail without
// changing the run's verdict.
// An empty proposal is an OFF switch for the whole stage, enforced here and not only in the
// capture prompts — the same hardening philosophy as the QA-target fallback above: a QA lane
// that returns a manifest anyway (a non-compliant agent, a stale prompt) must still not get an
// evidence branch pushed and a comment posted. The guarantee belongs to the pipeline.
const visualsOff = exploredVisualSubjects !== null && exploredVisualSubjects.length === 0
const visualUnits = visualsOff ? [] : visualPlan(qa)
const prNumber = (String(build.prUrl).match(/\/pull\/(\d+)/) || [])[1] || null

if (visualsOff) {
  log('Visual summary skipped: the explorer proposed no visual subject — nothing is published for this run')
} else if (visualUnits.length === 0) {
  log('Visual summary skipped: no screenshots were captured for this run')
} else if (!prNumber) {
  log(`Visual summary skipped: no PR number in ${build.prUrl}`)
} else {
  try {
    phase('Visual summary')
    const visual = await agent(visualPrompt(prNumber, visualUnits), {
      agentType: 'general-purpose',
      label: `visual:${issue}`,
      effort: 'low',
      schema: VISUAL_SCHEMA,
    })
    if (visual) log(`Visual summary ${visual.commentAction}: ${visual.published} image(s) — ${visual.note}`)
  } catch (e) {
    log(`Visual-summary step failed (non-blocking): ${e && e.message ? e.message : e}`)
  }
}

if (abortError) throw abortError

// Each QA lane reports for itself: a lane that was never selected returns 'skipped' (not
// null), so a caller can tell "no mobile surface to verify" apart from "mobile QA ran and
// could not be performed".
const ranMobileQa = doQa && qaTargets.includes('mobile')
const ranWebQa = doQa && qaTargets.includes('web')

return {
  prUrl: build.prUrl,
  explored: Boolean(explorerReport),
  reviewVerdict: doReview ? review.verdict : 'skipped',
  qaVerdict: ranMobileQa ? qaVerdictFrom(qa) : 'skipped',
  qaItems: ranMobileQa && qa ? qa.items : [],
  qaWebVerdict: ranWebQa ? qaVerdictFrom(qaWeb) : 'skipped',
  qaWebItems: ranWebQa && qaWeb ? qaWeb.items : [],
  fixAttempts,
  stuck,
  passed: outstanding.length === 0 && vetted.suspect.length === 0,
  outstanding,
  suspects: vetted.suspect,
  refuted: vetted.refuted,
}
