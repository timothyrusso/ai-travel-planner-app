import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/features/core/design-system/style/colors';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';
import { opacity } from '@/features/core/design-system/style/opacity';

/** Multipliers for the `opacity` style prop, so a token reads as a percentage of what is behind it. */
const meta = {
  title: 'Design System/Opacity',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

type Sample = { token: string; value: number };

const samples: Sample[] = Object.entries(opacity).map(([token, value]) => ({ token, value }));

/**
 * Each chip spans a light half and a dark half of its track: a single backdrop cannot show the whole
 * ramp, because the low steps vanish into white and the high ones into black. The track keeps its
 * border so `opacity0` is still locatable rather than looking like a rendering failure.
 */
function OpacitySample({ token, value }: Sample) {
  return (
    <View style={styles.sample}>
      <View style={styles.track}>
        <View style={styles.trackLight} />
        <View style={styles.trackDark} />
        <View style={[styles.chip, { opacity: value }]} />
      </View>
      <View style={styles.labels}>
        <Text style={styles.token}>{token}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

export const Ramp: Story = {
  render: () => (
    <ScrollView contentContainerStyle={styles.ramp}>
      {samples.map(sample => (
        <OpacitySample key={sample.token} {...sample} />
      ))}
    </ScrollView>
  ),
};

const TRACK_HEIGHT = 56;

const CHIP_INSET = spacing.SingleAndHalf;

const styles = StyleSheet.create({
  ramp: {
    gap: spacing.Double,
  },
  sample: {
    gap: spacing.Single,
  },
  track: {
    borderColor: colors.primaryGrey,
    borderRadius: spacing.SingleAndHalf,
    borderWidth: 1,
    flexDirection: 'row',
    height: TRACK_HEIGHT,
    overflow: 'hidden',
  },
  trackLight: {
    backgroundColor: colors.primaryWhite,
    flex: 1,
  },
  trackDark: {
    backgroundColor: colors.primaryBlack,
    flex: 1,
  },
  chip: {
    backgroundColor: colors.purple500,
    borderRadius: spacing.Single,
    bottom: CHIP_INSET,
    left: CHIP_INSET,
    position: 'absolute',
    right: CHIP_INSET,
    top: CHIP_INSET,
  },
  labels: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: spacing.Single,
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
