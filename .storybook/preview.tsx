import type { Decorator, Preview } from '@storybook/react-native-web-vite';
import { createInstance } from 'i18next';
import { type PropsWithChildren, useEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import translationEn from '@/features/core/translations/libraries/locales/en.json';
import translationIt from '@/features/core/translations/libraries/locales/it.json';

const LOCALES = ['en', 'it'] as const;

type Locale = (typeof LOCALES)[number];

const DEFAULT_LOCALE: Locale = 'en';

const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

/**
 * Storybook-local i18next instance. The app's `initI18n` is deliberately not reused: it resolves
 * through `@/features/core/storage`, which instantiates MMKV (a Nitro native module with no
 * react-native-web support) at import time and would crash this runtime on import. Storybook only
 * needs the locale bundles, so it gets its own isolated instance built from the same JSON files.
 */
const storybookI18n = createInstance();

void storybookI18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    it: { translation: translationIt },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
});

type StoryFrameProps = PropsWithChildren<{ locale: Locale }>;

function StoryFrame({ locale, children }: StoryFrameProps) {
  useEffect(() => {
    void storybookI18n.changeLanguage(locale);
  }, [locale]);

  return (
    <I18nextProvider i18n={storybookI18n}>
      <View style={styles.container}>{children}</View>
    </I18nextProvider>
  );
}

const withI18n: Decorator = (Story, context) => (
  <StoryFrame locale={isLocale(context.globals.locale) ? context.globals.locale : DEFAULT_LOCALE}>
    <Story />
  </StoryFrame>
);

const styles = StyleSheet.create({
  container: {
    // Buttons are full-width by design; a phone-ish cap keeps them readable in a browser viewport.
    maxWidth: 360,
    padding: 16,
    width: '100%',
  },
});

const preview: Preview = {
  decorators: [withI18n],
  initialGlobals: { locale: DEFAULT_LOCALE },
  globalTypes: {
    locale: {
      description: 'Locale used by the Storybook-local i18next instance',
      toolbar: {
        icon: 'globe',
        items: LOCALES.map(locale => ({ value: locale, title: locale.toUpperCase() })),
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
