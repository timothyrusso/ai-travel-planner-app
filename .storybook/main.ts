import type { StorybookConfig } from '@storybook/react-native-web-vite';

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
    },
  },
  typescript: {
    // `CustomButtonProps` / `CustomIconButtonProps` are type aliases imported into the component
    // files; only the TypeScript-aware docgen resolves them into a props table.
    reactDocgen: 'react-docgen-typescript',
  },
};

export default main;
