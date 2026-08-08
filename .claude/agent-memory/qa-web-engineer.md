# qa-web-engineer memory — operational lessons

Read at the start of every web QA run. Append only under the rules in
`.claude/agents/qa-web-engineer.md`. Humans curate at PR review — entries can be deleted.

## Known environment

- Project requires Node >=22.13 (package.json engines); the default `nvm` shell node here is
  often older (22.11.0 seen) and silently breaks web tooling — `ERR_REQUIRE_ESM` loading
  `metro.config.js`, and `storybook build` / `storybook dev` refusing to start — with errors
  that look like code bugs but aren't. Always check `node --version` vs `engines.node` before
  blaming the PR; `source ~/.nvm/nvm.sh && nvm use 22.20.0` (confirmed installed) fixes it.
- Web targets in this repo: `npm run storybook` (web Storybook, Vite + react-native-web,
  port 6006) and `npm run web` (`expo start --web`). Read `package.json` scripts rather than
  assuming a port.

## Lessons

- [2026-08-08] Do NOT drive the browser with `agent-device --platform macos` (open Chrome →
  sleep → screenshot). It was used before this agent existed and is unreliable: Chrome loses
  frontmost focus between commands so presses land on the wrong window, and `snapshot -i`
  only sees the "Agent Device Runner" helper window, never page content. Use `agent-browser`,
  which reads the real accessibility tree and gives stable `@eN` refs.
- [2026-08-08] Web Storybook stories that use `react-native-reanimated` need the reanimated
  Babel plugin wired into the Vite config; without it stories throw "`useAnimatedStyle` was
  used without a dependency array or Babel plugin" and fail to render at all. If a story
  renders a hard error rather than the component, check the Storybook Vite Babel config
  before reporting a component bug.
