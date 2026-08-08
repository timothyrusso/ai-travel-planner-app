import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';

import { ButtonType } from '@/features/core/design-system/components/basic/CustomButton/CustomButton.logic';
import { CustomButtonLarge } from '@/features/core/design-system/components/basic/CustomButton/CustomButtonLarge';
import { CustomButtonMedium } from '@/features/core/design-system/components/basic/CustomButton/CustomButtonMedium';
import { CustomButtonSmall } from '@/features/core/design-system/components/basic/CustomButton/CustomButtonSmall';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

const meta = {
  title: 'Design System/CustomButton',
  component: CustomButtonLarge,
  tags: ['autodocs'],
  args: {
    title: 'GLOBAL.BUTTON.CONFIRM',
    onPress: fn(),
    buttonType: ButtonType.Primary,
    isDisabled: false,
    isLoading: false,
  },
  argTypes: {
    buttonType: { control: 'select', options: Object.values(ButtonType) },
  },
} satisfies Meta<typeof CustomButtonLarge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/**
 * Derived from `Object.values(ButtonType)` rather than a hand-written list, so a new `ButtonType`
 * shows up here automatically — the same exhaustiveness discipline `CustomButton.logic.ts` enforces
 * with ts-pattern's `.exhaustive()`.
 */
export const AllTypes: Story = {
  render: args => (
    <View style={styles.stack}>
      {Object.values(ButtonType).map(buttonType => (
        <CustomButtonLarge {...args} key={buttonType} buttonType={buttonType} />
      ))}
    </View>
  ),
};

/** The real size exports, not `BaseButton` with a raw `size` prop. */
export const AllSizes: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomButtonLarge {...args} />
      <CustomButtonMedium {...args} />
      <CustomButtonSmall {...args} />
    </View>
  ),
};

export const States: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomButtonLarge {...args} />
      <CustomButtonLarge {...args} isDisabled />
      <CustomButtonLarge {...args} isLoading />
    </View>
  ),
};

export const WithIcons: Story = {
  args: {
    leftIcon: 'airplane-outline',
    rightIcon: 'arrow-forward-outline',
  },
};

/** Exercises `BaseButton`'s `numberOfLines={1} ellipsizeMode="tail"` truncation. */
export const LongTitle: Story = {
  args: {
    title: 'ACTIVITY_DETAILS.PRICE_ALERT',
  },
};

const styles = StyleSheet.create({
  stack: {
    gap: spacing.Double,
  },
});
