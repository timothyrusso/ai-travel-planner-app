# qa-web-engineer memory — operational lessons

Read at the start of every web QA run. Append only under the rules in
`.claude/agents/qa-web-engineer.md`. Humans curate at PR review — entries can be deleted.

## Known environment

- Node 22.20.0 is confirmed installed here: `source ~/.nvm/nvm.sh && nvm use 22.20.0` is the
  fix when the shell node is below `engines.node`.
- `npm run storybook` serves web Storybook on port 6006, built with Vite +
  react-native-web.

## Lessons

- [2026-08-08] Why driving Chrome with `agent-device --platform macos` fails (it was tried
  before this agent existed): Chrome loses frontmost focus between commands so presses land
  on the wrong window, and `snapshot -i` only ever sees the "Agent Device Runner" helper
  window, never page content.
- [2026-08-08] Web Storybook stories that use `react-native-reanimated` need the reanimated
  Babel plugin wired into the Vite config; without it stories throw "`useAnimatedStyle` was
  used without a dependency array or Babel plugin" and fail to render at all. If a story
  renders a hard error rather than the component, check the Storybook Vite Babel config
  before reporting a component bug.
- [2026-08-13] `agent-browser fill` on a range `<input type=range>` slider doesn't set the
  value reliably (it appended digits, e.g. 30+"60" -> 36). Use `focus @ref` then
  `press Home`/`press End`/arrow keys instead to hit min/max deterministically.
- [2026-08-13] React Native Web's `ScrollView` renders all children unvirtualized in the DOM
  on web, so `agent-browser eval "document.body.innerText"` on a story's iframe captures
  every off-screen cell's text in one call — faster than scrolling+screenshotting to verify
  full-list counts/ordering (used for the CustomIcon `AllIcons` catalogue, 44 cells).
- [2026-08-13] `agent-browser frame @eN` switches `snapshot`/`click` context into an iframe, but
  `eval --stdin` still runs against the top-level document regardless — use `snapshot` (not
  `eval`) to read text/DOM state inside a Storybook preview iframe.
