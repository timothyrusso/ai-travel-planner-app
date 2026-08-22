import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';

import { Custom3DButtonLarge } from '@/features/core/design-system/components/basic/Custom3DButton/Custom3DButtonLarge';
import { CustomBlurButtonLarge } from '@/features/core/design-system/components/basic/CustomBlurButton/CustomBlurButtonLarge';
import { CustomBlurIconButtonLarge } from '@/features/core/design-system/components/basic/CustomBlurIconButton/CustomBlurIconButtonLarge';
import { CustomButtonLarge } from '@/features/core/design-system/components/basic/CustomButton/CustomButtonLarge';
import { CustomIconButtonLarge } from '@/features/core/design-system/components/basic/CustomIconButton/CustomIconButtonLarge';
import { CustomImage } from '@/features/core/design-system/components/basic/CustomImage/CustomImage';
import { CustomSpinner } from '@/features/core/design-system/components/basic/CustomSpinner/CustomSpinner';
import { SpinnerColor } from '@/features/core/design-system/components/basic/CustomSpinner/CustomSpinner.logic';
import { colors } from '@/features/core/design-system/style/colors';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { spinnerSizes } from '@/features/core/design-system/style/dimensions/spinner';

const photo = require('@/features/core/design-system/assets/images/welcome_1.jpg');

const LIGHT_BACKGROUND_COLORS = [
  SpinnerColor.purple500,
  SpinnerColor.lime500,
  SpinnerColor.red500,
  SpinnerColor.cyan500,
  SpinnerColor.primaryBlack,
] as const;

const DETERMINATE_STEPS = [0, 0.25, 0.5, 0.75, 1] as const;

const meta = {
  title: 'Design System/CustomSpinner',
  component: CustomSpinner,
  tags: ['autodocs'],
  args: {
    size: 'medium',
    color: SpinnerColor.purple500,
  },
  argTypes: {
    size: { control: 'select', options: Object.keys(spinnerSizes) },
    color: { control: 'select', options: Object.values(SpinnerColor) },
    progress: { control: { type: 'number', min: 0, max: 1, step: 0.05 } },
  },
} satisfies Meta<typeof CustomSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Leave `progress` empty for the spinning 270° arc; set it to switch to a static ring. */
export const Playground: Story = {};

/** 20 / 36 / 48 px boxes, each with its own stroke width — the stroke never leaves the box. */
export const AllSizes: Story = {
  render: args => (
    <View style={styles.row}>
      <CustomSpinner {...args} size="small" />
      <CustomSpinner {...args} size="medium" />
      <CustomSpinner {...args} size="large" />
    </View>
  ),
};

/** The five arcs that pair with a grey track, then `primaryWhite` over the dark tile it is for. */
export const AllColors: Story = {
  render: args => (
    <View style={styles.row}>
      {LIGHT_BACKGROUND_COLORS.map(color => (
        <CustomSpinner {...args} key={color} color={color} />
      ))}
      <View style={styles.darkTile}>
        <CustomSpinner {...args} color={SpinnerColor.primaryWhite} />
      </View>
    </View>
  ),
};

/** Static, anchored at 12 o'clock: `0` is the bare track and `1` closes the ring. */
export const Determinate: Story = {
  render: args => (
    <View style={styles.row}>
      {DETERMINATE_STEPS.map(progress => (
        <CustomSpinner {...args} key={progress} progress={progress} />
      ))}
    </View>
  ),
};

/** Out-of-range values clamp instead of inverting the arc: these render as `0` and `1`. */
export const ClampedProgress: Story = {
  render: args => (
    <View style={styles.row}>
      <CustomSpinner {...args} progress={-0.5} />
      <CustomSpinner {...args} progress={2} />
    </View>
  ),
};

/**
 * Every button family in its loading state: the spinner colour resolves against the active button,
 * so a loading button keeps the contrast it has when idle, and now carries a track ring.
 */
export const ButtonFamilies: Story = {
  render: () => (
    <View style={styles.stack}>
      <CustomButtonLarge title="GLOBAL.BUTTON.CONFIRM" onPress={fn()} isLoading />
      <CustomIconButtonLarge iconName="airplane-outline" onPress={fn()} isLoading />
      <Custom3DButtonLarge title="GLOBAL.BUTTON.CONFIRM" onPress={fn()} isLoading />
      <View style={styles.backdrop}>
        <CustomImage source={photo} style={styles.photo} useBlur={false} contentFit="cover" />
        <View style={styles.stack}>
          <CustomBlurButtonLarge title="GLOBAL.BUTTON.CONFIRM" onPress={fn()} isLoading />
          <CustomBlurIconButtonLarge iconName="airplane-outline" onPress={fn()} isLoading />
        </View>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.Triple,
  },
  stack: {
    gap: spacing.Double,
  },
  darkTile: {
    padding: spacing.Double,
    borderRadius: spacing.SingleAndHalf,
    backgroundColor: colors.primaryBlack,
  },
  backdrop: {
    padding: spacing.Triple,
    borderRadius: spacing.SingleAndHalf,
    overflow: 'hidden',
  },
  photo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
