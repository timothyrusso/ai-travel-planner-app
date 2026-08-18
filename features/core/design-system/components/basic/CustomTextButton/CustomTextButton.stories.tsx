import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';

import { CustomTextButton } from '@/features/core/design-system/components/basic/CustomTextButton/CustomTextButton';
import { colors } from '@/features/core/design-system/style/colors';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';

const meta = {
  title: 'Design System/CustomTextButton',
  component: CustomTextButton,
  tags: ['autodocs'],
  args: {
    title: 'GLOBAL.BUTTON.CONFIRM',
    onPress: fn(),
  },
} satisfies Meta<typeof CustomTextButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/**
 * The bare-label button: it draws no surface of its own, so its whole appearance comes from the
 * `textStyle` its caller passes. Both cells below are the same component.
 */
export const Styled: Story = {
  render: args => (
    <View style={styles.stack}>
      <CustomTextButton {...args} />
      <CustomTextButton {...args} textStyle={styles.emphasised} />
    </View>
  ),
};

const styles = StyleSheet.create({
  stack: {
    gap: spacing.Double,
  },
  emphasised: {
    color: colors.purple500,
    fontFamily: fontFamily.interBold,
    fontSize: fontSize.LG,
  },
});
