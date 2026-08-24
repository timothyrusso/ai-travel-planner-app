import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { ProgressBarColor } from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBar.logic';
import { CustomSteppedProgressBarMedium } from '@/features/core/design-system/components/basic/CustomSteppedProgressBar/CustomSteppedProgressBarMedium';
import { CustomSteppedProgressBarSmall } from '@/features/core/design-system/components/basic/CustomSteppedProgressBar/CustomSteppedProgressBarSmall';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

const MOCK_TOTAL_STEPS = 10;
const MOCK_STEP_STATES = [3, 6, 9] as const;
const MAX_STEP_CONTROL = 15;

const meta = {
  title: 'Design System/CustomSteppedProgressBar',
  component: CustomSteppedProgressBarMedium,
  tags: ['autodocs'],
  args: {
    totalSteps: MOCK_TOTAL_STEPS,
    currentStep: 3,
    color: ProgressBarColor.Purple,
  },
  argTypes: {
    color: { control: 'select', options: Object.values(ProgressBarColor) },
    totalSteps: { control: { type: 'number', min: 0, max: MAX_STEP_CONTROL, step: 1 } },
    currentStep: { control: { type: 'number', min: 0, max: MAX_STEP_CONTROL, step: 1 } },
  },
} satisfies Meta<typeof CustomSteppedProgressBarMedium>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Step `currentStep` to watch the emphasis grow into the next segment rather than snap to it. */
export const Playground: Story = {};

/** The two real size exports, not `CustomSteppedProgressBar` with a raw `size` prop. */
export const AllSizes: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomSteppedProgressBarMedium {...args} />
      <CustomSteppedProgressBarSmall {...args} />
    </View>
  ),
};

/** Each colour pairs its `500` completed segments with its `900` current one, over the shared grey. */
export const AllColors: Story = {
  render: args => (
    <View style={styles.stack}>
      {Object.values(ProgressBarColor).map(color => (
        <CustomSteppedProgressBarMedium {...args} key={color} color={color} />
      ))}
    </View>
  ),
};

/** Early, mid and late over the ten steps the design draws — the last bar is fully complete. */
export const StepStates: Story = {
  render: args => (
    <View style={styles.stack}>
      {MOCK_STEP_STATES.map(currentStep => (
        <CustomSteppedProgressBarMedium {...args} key={currentStep} currentStep={currentStep} />
      ))}
      <CustomSteppedProgressBarMedium {...args} currentStep={MOCK_TOTAL_STEPS} />
    </View>
  ),
};

/**
 * The degenerate inputs: a step before the first and past the last clamp to the two ends, and a
 * zero step count still draws one segment.
 */
export const ClampedSteps: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomSteppedProgressBarMedium {...args} currentStep={0} />
      <CustomSteppedProgressBarMedium {...args} currentStep={99} />
      <CustomSteppedProgressBarMedium {...args} totalSteps={0} />
    </View>
  ),
};

/** `style` is layout only: the offset moves the bar without narrowing it. */
export const WithLayoutStyle: Story = {
  render: args => (
    <View>
      <CustomSteppedProgressBarMedium {...args} />
      <CustomSteppedProgressBarMedium {...args} style={styles.offset} />
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
