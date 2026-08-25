import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { ProgressBarColor } from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBar.logic';
import { CustomProgressBarMedium } from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBarMedium';
import { CustomProgressBarSmall } from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBarSmall';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

const MOCK_PROGRESS_STATES = [0.25, 0.6, 0.9] as const;

const meta = {
  title: 'Design System/CustomProgressBar',
  component: CustomProgressBarMedium,
  tags: ['autodocs'],
  args: {
    progress: 0.6,
    color: ProgressBarColor.Purple,
  },
  argTypes: {
    color: { control: 'select', options: Object.values(ProgressBarColor) },
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
} satisfies Meta<typeof CustomProgressBarMedium>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Drag `progress` to watch the fill travel to the new fraction rather than jump to it. */
export const Playground: Story = {};

/** The two real size exports, not `CustomProgressBar` with a raw `size` prop: 8 and 12 tall. */
export const AllSizes: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomProgressBarMedium {...args} />
      <CustomProgressBarSmall {...args} />
    </View>
  ),
};

/** Five fills over the one neutral track they all share. */
export const AllColors: Story = {
  render: args => (
    <View style={styles.stack}>
      {Object.values(ProgressBarColor).map(color => (
        <CustomProgressBarMedium {...args} key={color} color={color} />
      ))}
    </View>
  ),
};

/** The three states the design annotates: early, mid and late. */
export const ProgressStates: Story = {
  render: args => (
    <View style={styles.stack}>
      {MOCK_PROGRESS_STATES.map(progress => (
        <CustomProgressBarMedium {...args} key={progress} progress={progress} />
      ))}
    </View>
  ),
};

/** Out-of-range values clamp instead of overflowing the track: these render as `0` and `1`. */
export const ClampedProgress: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomProgressBarMedium {...args} progress={-1} />
      <CustomProgressBarMedium {...args} progress={5} />
    </View>
  ),
};

/** `style` is layout only: the offset moves the bar without narrowing it. */
export const WithLayoutStyle: Story = {
  render: args => (
    <View>
      <CustomProgressBarMedium {...args} />
      <CustomProgressBarMedium {...args} style={styles.offset} />
    </View>
  ),
};

const styles = StyleSheet.create({
  stack: {
    gap: spacing.Double,
  },
  offset: {
    marginTop: spacing.Fourfold,
  },
});
