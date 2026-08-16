---
name: write-issue
description: Author a complete, well-specified GitHub feature issue by interviewing the user until the Description and Acceptance criteria are unambiguous, then create it with the Feature-template structure. Use when starting a new feature from a rough idea — it front-loads clarification so /implement-issue and the implement-issue-pipeline workflow can trust the issue.
argument-hint: "[rough idea or title]"
---

# write-issue — author a complete, ready-to-implement feature issue

Your goal: turn a rough idea into a GitHub issue so clear and complete that an agent can
implement it with no further questions. This front-loads the clarification that would
otherwise happen at implementation time — so the downstream pipeline can trust the issue.

The rough idea (if any) is in `$ARGUMENTS`. If it's empty, ask the user what they want to build.

## Process

1. **Interview the user with the `grilling` skill.** Stress-test the idea until you can answer,
   without guessing: what exactly is being built, the expected behaviour, the edge/negative
   cases, which screens/features it touches, what is explicitly out of scope, and how you'd
   verify each outcome on a device. Keep going until the acceptance criteria are concrete and
   testable — not vague ("works well") but observable ("tapping X navigates to Y").

2. **Draft the issue** using the **exact** Feature-template headings (so `/implement-issue` and
   the workflow parse it identically). Use this structure:

   ```markdown
   ### Description
   <what the feature does, expected behaviour, constraints — specific and self-contained>

   ### Acceptance criteria
   - [ ] <observable, verifiable outcome — testable on the device>
   - [ ] ...

   ### Screens affected
   <e.g. SavedTrips, DestinationSearch — or omit if none>

   ### Out of scope
   - <anything explicitly excluded — or omit>

   ### Design link
   <URL — or omit>
   ```

3. **Review with the user.** Show the draft; iterate until they approve. Do not pad criteria
   or invent scope — reflect what the user actually confirmed.

4. **Create the issue only after explicit approval** (it's an outward action). Match the
   template's title prefix and label:
   ```bash
   gh issue create --title "[Feature]: <concise title>" --label enhancement --body-file <file>
   ```

5. **Add the issue to GitHub Project #1 and set its status to `Ready`** so it lands in a board
   column — an item added with no `Status` sits outside every column and is invisible to the
   user. Use the URL returned by step 4:
   ```bash
   itemId=$(gh project item-add 1 --owner timothyrusso --url <issueUrl> --format json --jq '.id')
   gh project item-edit --id "$itemId" --project-id PVT_kwHOBRsxCs4A5SSb \
     --field-id PVTSSF_lAHOBRsxCs4A5SSbzguG_oM --single-select-option-id 61e4505c
   ```
   Those are the verified IDs of this board: project `PVT_kwHOBRsxCs4A5SSb`, `Status` field
   `PVTSSF_lAHOBRsxCs4A5SSbzguG_oM`, `Ready` option `61e4505c`.

   Both calls need the `project` scope on the gh token. If either fails with a
   scope/authorization error, do NOT delete or reopen the issue — step 4 stands. Report the
   failure and the exact remediation (`gh auth refresh -s project`) so the user can finish it
   manually. A failed `item-add` also means there is no item to edit: skip the `item-edit`
   rather than guessing an id.

6. **Report** the created issue number and URL, whether it was added to the board and
   **whether its status was set to `Ready`** (say so explicitly either way, with the reason on
   failure), and suggest the next step: `/implement-issue <n>` (the front door — it judges the
   issue and delegates to the `implement-issue-pipeline` workflow), or invoke the workflow
   directly for headless/batch runs.

## Rules
- Acceptance criteria must be **testable** — each one is a QA test case later.
- Keep the Description self-contained: the implementer builds from it alone.
- Never create the issue without the user's explicit go-ahead.
- An issue that is not on Project #1 does not exist as far as the user is concerned — always
  run the `item-add`, and say so explicitly in the report (added, or failed and why).
- An item with no `Status` is in no column, so it is just as invisible — always follow the
  `item-add` with the `item-edit` that sets `Status = Ready`, and report that outcome too.
