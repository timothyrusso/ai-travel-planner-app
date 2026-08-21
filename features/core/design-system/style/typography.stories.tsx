import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/features/core/design-system/style/colors';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';

const meta = {
  title: 'Design System/Typography',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Neither the human-readable name nor the numeric weight can be read off `fontFamily.ts`, whose
 * values are only the runtime font-family strings. The lookup is deliberately partial: a family
 * added to the token object still gets a card, labelled by its token key alone.
 */
const WEIGHTS: Partial<Record<keyof typeof fontFamily, { name: string; weight: number }>> = {
  interRegular: { name: 'Regular', weight: 400 },
  interMedium: { name: 'Medium', weight: 500 },
  interBold: { name: 'Bold', weight: 700 },
  interExtraBold: { name: 'ExtraBold', weight: 800 },
};

type Face = { token: string; family: string; label: string };

const faces: Face[] = Object.entries(fontFamily).map(([token, family]) => {
  const display = WEIGHTS[token as keyof typeof fontFamily];

  return { token, family, label: display ? `${display.name} · ${display.weight} · ${token}` : token };
});

const GLYPH_SPECIMEN = 'Aa';

const CHARACTER_SPECIMEN = 'ABCDEFGHIJKLM abcdefghijklm 0123456789';

const PANGRAM = 'The quick brown fox';

/**
 * The label stays in `interRegular` whatever the card documents, so the reader compares the four
 * specimens against each other rather than against their own captions.
 *
 * Every string here is raw `Text`, never `CustomText`: `CustomText` pipes its content through `t()`
 * with no escape hatch, and token names, pixel values and specimen copy are identifiers, not
 * translatable strings.
 */
function WeightCard({ family, label }: Face) {
  return (
    <View style={styles.specimen}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.glyphs, { fontFamily: family }]}>{GLYPH_SPECIMEN}</Text>
      <Text style={[styles.characters, { fontFamily: family }]}>{CHARACTER_SPECIMEN}</Text>
    </View>
  );
}

export const Weights: Story = {
  render: () => (
    <ScrollView contentContainerStyle={styles.column}>
      {faces.map(face => (
        <WeightCard key={face.token} {...face} />
      ))}
    </ScrollView>
  ),
};

type Step = { token: string; value: number };

const steps: Step[] = Object.entries(fontSize).map(([token, value]) => ({ token, value }));

/**
 * Label above sample rather than beside it: the 40px step needs more width than the 360px phone
 * frame from `.storybook/preview.tsx` leaves next to a label column, and would wrap mid-phrase.
 *
 * Stacking alone is not enough — the pangram is ~384px wide at 40px, still wider than the frame, so
 * it wrapped to two lines and made the last step of the ramp twice as tall as its own type size.
 * `numberOfLines` pins every step to exactly one line, which is what makes the height progression
 * readable, and the horizontal scroller keeps the overflowing tail reachable instead of clipped.
 */
function SizeStep({ token, value }: Step) {
  return (
    <View style={styles.specimen}>
      <Text style={styles.label}>{`${token} · ${value}px`}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text numberOfLines={1} style={[styles.sample, { fontSize: value }]}>
          {PANGRAM}
        </Text>
      </ScrollView>
    </View>
  );
}

export const SizeRamp: Story = {
  render: () => (
    <ScrollView contentContainerStyle={styles.column}>
      {steps.map(step => (
        <SizeStep key={step.token} {...step} />
      ))}
    </ScrollView>
  ),
};

/** Not a `fontSize` token: a display size, big enough to read a weight off a single letter pair. */
const GLYPH_SIZE = 48;

const styles = StyleSheet.create({
  column: {
    gap: spacing.Fourfold,
  },
  specimen: {
    gap: spacing.Single,
  },
  label: {
    color: colors.primaryGrey,
    fontFamily: fontFamily.interRegular,
    fontSize: fontSize.SM,
  },
  glyphs: {
    color: colors.primaryBlack,
    fontSize: GLYPH_SIZE,
  },
  characters: {
    color: colors.primaryBlack,
    fontSize: fontSize.MD,
  },
  sample: {
    color: colors.primaryBlack,
    fontFamily: fontFamily.interRegular,
  },
});
