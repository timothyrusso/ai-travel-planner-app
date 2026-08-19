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
- [2026-08-14] To test a specific Storybook arg combo (e.g. a disabled variant of a non-default
  control value) without clicking through the Controls panel, open
  `http://localhost:6006/iframe.html?id=<story-id>&viewMode=story&args=key:value;key2:value2`
  directly — isolates the component (no sidebar/addons chrome) and sets args via the URL.
- [2026-08-16] React Native Web's `textTransform: uppercase` is CSS-only — searching
  `innerHTML` for the visible uppercase string never matches; the text node stays
  title-case. Assert on title-case text; read colours/geometry (bg, border, translateY,
  opacity, backdrop-filter) via `getComputedStyle` on the RNW divs instead of screenshots.
- [2026-08-19] Storybook's `.storybook/preview.tsx` wraps every story in a fixed-`maxWidth`
  phone-frame div (no inline style, a CSS class) — resizing the browser viewport does nothing
  to a `width: '100%'` DS component. To test container-width responsiveness, `eval` the
  component's `parentElement` and `style.setProperty('max-width', 'NNNpx', 'important')` (plain
  assignment loses to the class) directly, not the browser viewport.
- [2026-08-19] `agent-browser set media reduced-motion` (reset with `no-preference`) emulates
  `prefers-reduced-motion` — the way to test Reanimated `useReducedMotion()` on web without an
  OS toggle. Also: `agent-browser screenshot "<selector>"` crops to one element; tag a shared
  ancestor with a throwaway `data-qa-*` attribute via `eval` first to scope a multi-element shot.
