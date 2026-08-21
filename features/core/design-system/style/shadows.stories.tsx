import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/features/core/design-system/style/colors';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';
import { shadows } from '@/features/core/design-system/style/shadows';

/** Every token is a CSS shadow string, applied as-is through `boxShadow`. */
const meta = {
  title: 'Design System/Shadows',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Elevation is not derivable from the strings — offset, blur and alpha all move at once — so the
 * ramp order is spelled out. A token missing from this list still renders, after the listed ones.
 */
const ELEVATION_ORDER: readonly string[] = [
  'lightShadow',
  'smallShadow',
  'mediumShadow',
  'defaultShadow',
  'highShadow',
];

const rankOf = (token: string) => {
  const rank = ELEVATION_ORDER.indexOf(token);
  return rank === -1 ? ELEVATION_ORDER.length : rank;
};

type Sample = { token: string; shadow: string };

const samples: Sample[] = Object.entries(shadows)
  .map(([token, shadow]) => ({ token, shadow }))
  .sort((a, b) => rankOf(a.token) - rankOf(b.token));

/**
 * The labels sit outside the gutter that holds the surface: `highShadow` spreads ~28px past its
 * edges, which would otherwise be printed over the text it belongs to.
 */
function ShadowSample({ token, shadow }: Sample) {
  return (
    <View style={styles.sample}>
      <View style={styles.labels}>
        <Text style={styles.token}>{token}</Text>
        <Text style={styles.value}>{shadow}</Text>
      </View>
      <View style={styles.gutter}>
        <View style={[styles.surface, { boxShadow: shadow }]} />
      </View>
    </View>
  );
}

export const Elevations: Story = {
  render: () => (
    <ScrollView contentContainerStyle={styles.elevations}>
      {samples.map(sample => (
        <ShadowSample key={sample.token} {...sample} />
      ))}
    </ScrollView>
  ),
};

/** Wider than the heaviest token's reach, so no sample is clipped by its own container. */
const GUTTER = spacing.Quintuple;

const SURFACE_HEIGHT = 56;

const styles = StyleSheet.create({
  elevations: {
    gap: spacing.Triple,
  },
  sample: {
    gap: spacing.Single,
  },
  labels: {
    gap: spacing.HalfMinimal,
  },
  gutter: {
    backgroundColor: colors.secondaryGrey,
    borderRadius: spacing.SingleAndHalf,
    padding: GUTTER,
  },
  surface: {
    backgroundColor: colors.primaryWhite,
    borderRadius: spacing.Double,
    height: SURFACE_HEIGHT,
  },
  token: {
    color: colors.primaryBlack,
    fontFamily: fontFamily.interMedium,
    fontSize: fontSize.SM,
  },
  value: {
    color: colors.primaryGrey,
    fontFamily: fontFamily.interRegular,
    fontSize: fontSize.XXS,
  },
});
