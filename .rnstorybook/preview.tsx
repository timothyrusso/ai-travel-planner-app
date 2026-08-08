import type { Decorator, Preview } from '@storybook/react-native';
import { useFonts } from 'expo-font';
import { createInstance } from 'i18next';
import { type PropsWithChildren, useEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGlobals } from 'storybook/preview-api';

import { fontsConfig } from '@/features/core/design-system/style/fontFamily';
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
 * react-native-web support) at import time. Storybook only needs the locale bundles, so it gets its
 * own isolated instance built from the same JSON files.
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

type StoryFrameProps = PropsWithChildren<{
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}>;

function StoryFrame({ locale, onLocaleChange, children }: StoryFrameProps) {
  // Storybook bypasses `expo-router/entry`, so `app/_layout.tsx` — where the app calls
  // `useFonts(fontsConfig)` — never runs. Without this the design-system's `inter-*` families
  // are unknown to the renderer and every label silently falls back to the system font, which
  // makes the catalogue lie about typography.
  const [fontsLoaded] = useFonts(fontsConfig);

  useEffect(() => {
    void storybookI18n.changeLanguage(locale);
  }, [locale]);

  // Render nothing until Inter is registered: a first paint in the fallback font would be a
  // misleading screenshot for any visual check.
  if (!fontsLoaded) return null;

  return (
    <I18nextProvider i18n={storybookI18n}>
      <View style={styles.container}>
        {/*
          The on-device UI has no toolbar chrome, so the locale switch is rendered in the canvas.
          It writes to the same `locale` global that the web runtime's toolbar drives, which keeps
          both runtimes on one source of truth.
        */}
        <View style={styles.localeBar}>
          {LOCALES.map(item => (
            <Pressable
              key={item}
              accessibilityRole="button"
              onPress={() => onLocaleChange(item)}
              style={[styles.localeButton, item === locale && styles.localeButtonSelected]}
            >
              <Text style={[styles.localeLabel, item === locale && styles.localeLabelSelected]}>
                {item.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>
        {children}
      </View>
    </I18nextProvider>
  );
}

const withI18n: Decorator = (Story, context) => {
  const [, updateGlobals] = useGlobals();
  const locale = isLocale(context.globals.locale) ? context.globals.locale : DEFAULT_LOCALE;

  return (
    <StoryFrame locale={locale} onLocaleChange={next => updateGlobals({ locale: next })}>
      <Story />
    </StoryFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
  },
  localeBar: {
    flexDirection: 'row',
    gap: 8,
  },
  localeButton: {
    borderColor: '#CCCCCC',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  localeButtonSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  localeLabel: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
  localeLabelSelected: {
    color: '#FFFFFF',
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
