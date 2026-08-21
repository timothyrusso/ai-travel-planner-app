import type { StorybookConfig } from '@storybook/react-native-web-vite';
import type { PluginOption } from 'vite';

// `@react-native-vector-icons` declares its font as `require('....ttf')` at module scope even in
// its ESM build, a Metro-ism Vite emits verbatim: the browser then throws `require is not defined`
// while evaluating the module, so every story that reaches `CustomIcon` renders blank. Rewriting the
// call to a real asset import is what keeps the built Storybook working.
const nativeFontRequire: PluginOption = {
  name: 'holidai:native-font-require',
  enforce: 'pre',
  transform(code: string, id: string) {
    if (!id.includes('@react-native-vector-icons') || !/require\((['"])[^'"]+\.ttf\1\)/.test(code)) {
      return null;
    }

    const imports: string[] = [];
    const transformed = code.replace(/require\((['"])([^'"]+\.ttf)\1\)/g, (_match, _quote, request: string) => {
      const binding = `__holidaiFont${imports.length}`;
      imports.push(`import ${binding} from '${request}';`);
      return binding;
    });

    return { code: `${imports.join('\n')}\n${transformed}`, map: null };
  },
};

// Same glob as `.rnstorybook/main.ts`: one set of co-located story files feeds both runtimes.
// The framework bundles `vite-tsconfig-paths`, so the `@/*` alias resolves straight from
// `tsconfig.json` with no extra Vite configuration.
const main: StorybookConfig = {
  stories: ['../features/**/*.stories.?(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      // Ships untranspiled RN sources, so Vite has to run it through the RNW transform.
      modulesToTranspile: ['@react-native-vector-icons'],
      pluginReactOptions: {
        babel: {
          // `CustomPressable` (rendered by every button) calls `useAnimatedStyle`, which throws on
          // web unless Reanimated's Babel plugin has turned the callback into a worklet. Metro gets
          // it from `babel-preset-expo`; Vite has no Babel config of its own here (the framework
          // sets `babelrc: false` / `configFile: false`), so the plugin is wired up explicitly.
          // Reanimated 4 re-exports it from `react-native-worklets`, which owns it.
          plugins: ['react-native-worklets/plugin'],
        },
      },
    },
  },
  typescript: {
    // `CustomButtonProps` / `CustomIconButtonProps` are type aliases imported into the component
    // files; only the TypeScript-aware docgen resolves them into a props table.
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: config => {
    config.plugins = [nativeFontRequire, ...(config.plugins ?? [])];
    return config;
  },
};

export default main;
