import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';

import {
  type CustomSegmentedControlProps,
  SegmentedControlThumbFill,
} from '@/features/core/design-system/components/basic/CustomSegmentedControl/CustomSegmentedControl.logic';
import { CustomSegmentedControlMedium } from '@/features/core/design-system/components/basic/CustomSegmentedControl/CustomSegmentedControlMedium';
import { CustomSegmentedControlSmall } from '@/features/core/design-system/components/basic/CustomSegmentedControl/CustomSegmentedControlSmall';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

const THREE_SEGMENTS = [
  { label: 'MY_TRIP.TITLE' },
  { label: 'ACTIVITIES.TITLE' },
  { label: 'GLOBAL.VIEW_ALL' },
] as const;

const ICON_SEGMENTS = [
  { label: 'MY_TRIP.TITLE', icon: 'airplane-outline' },
  { label: 'ACTIVITIES.TITLE', icon: 'compass-outline' },
] as const;

/**
 * The control is controlled, so a story driven by static args cannot show the thumb travel: tapping
 * fires `onChange` and the parent-owned `selectedIndex` stays put. This wrapper owns the selection
 * the way a real screen would, and still forwards every press to the args action.
 */
const SelectableSegmentedControl = ({ selectedIndex, onChange, ...rest }: CustomSegmentedControlProps) => {
  const [index, setIndex] = useState(selectedIndex);

  return (
    <CustomSegmentedControlMedium
      {...rest}
      selectedIndex={index}
      onChange={nextIndex => {
        setIndex(nextIndex);
        onChange(nextIndex);
      }}
    />
  );
};

const meta = {
  title: 'Design System/CustomSegmentedControl',
  component: CustomSegmentedControlMedium,
  tags: ['autodocs'],
  args: {
    segments: [{ label: 'MY_TRIP.TITLE' }, { label: 'ACTIVITIES.TITLE' }],
    selectedIndex: 0,
    onChange: fn(),
    thumbFill: SegmentedControlThumbFill.White,
    isDisabled: false,
  },
  argTypes: {
    thumbFill: { control: 'select', options: Object.values(SegmentedControlThumbFill) },
    selectedIndex: { control: { type: 'number', min: 0, max: 2, step: 1 } },
  },
} satisfies Meta<typeof CustomSegmentedControlMedium>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Fully controlled: the thumb obeys the `selectedIndex` control, not the tap. */
export const Playground: Story = {};

/** The spring travel and the label crossfade, with the selection owned by a parent. */
export const Selectable: Story = {
  render: args => <SelectableSegmentedControl {...args} />,
};

/** The two real size exports, not `CustomSegmentedControl` with a raw `size` prop. */
export const AllSizes: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomSegmentedControlMedium {...args} />
      <CustomSegmentedControlSmall {...args} />
    </View>
  ),
};

/**
 * Two against three, with labels of deliberately different lengths: segments are always 1/N of the
 * inner width, never content-hugging.
 */
export const SegmentCounts: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomSegmentedControlMedium {...args} />
      <CustomSegmentedControlMedium {...args} segments={THREE_SEGMENTS} />
      <CustomSegmentedControlMedium {...args} segments={THREE_SEGMENTS} selectedIndex={2} />
    </View>
  ),
};

/** A leading icon takes its colour from its own label's state, on both sides of the thumb. */
export const WithIcons: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomSegmentedControlMedium {...args} segments={ICON_SEGMENTS} />
      <CustomSegmentedControlSmall {...args} selectedIndex={1} segments={ICON_SEGMENTS} />
    </View>
  ),
};

/**
 * The combination the icon crossfade is most visible in: over a black thumb the selected glyph is
 * white, so tapping across must fade the two copies rather than swap the colour at the tap.
 */
export const BlackFillWithIcons: Story = {
  render: args => (
    <View style={styles.stack}>
      <SelectableSegmentedControl {...args} thumbFill={SegmentedControlThumbFill.Black} segments={ICON_SEGMENTS} />
      <CustomSegmentedControlMedium
        {...args}
        thumbFill={SegmentedControlThumbFill.Black}
        segments={ICON_SEGMENTS}
        selectedIndex={1}
      />
      <CustomSegmentedControlSmall {...args} thumbFill={SegmentedControlThumbFill.Black} segments={ICON_SEGMENTS} />
    </View>
  ),
};

/** Both thumb fills, each with its inverted selected label colour. */
export const ThumbFills: Story = {
  render: args => (
    <View style={styles.stack}>
      {Object.values(SegmentedControlThumbFill).map(thumbFill => (
        <CustomSegmentedControlMedium {...args} key={thumbFill} thumbFill={thumbFill} />
      ))}
    </View>
  ),
};

/** The whole control fades and stops firing `onChange` — there is no per-segment disabled. */
export const Disabled: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomSegmentedControlMedium {...args} isDisabled />
      <CustomSegmentedControlSmall {...args} isDisabled />
      <CustomSegmentedControlMedium {...args} segments={THREE_SEGMENTS} selectedIndex={1} isDisabled />
    </View>
  ),
};

const styles = StyleSheet.create({
  stack: {
    gap: spacing.Double,
  },
});
