import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';

import { CardType } from '@/features/core/design-system/components/basic/CustomCard/CustomCard.logic';
import { CustomNumberButton } from '@/features/core/design-system/components/composite/CustomNumberButton/CustomNumberButton';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

const meta = {
  title: 'Design System/CustomNumberButton',
  component: CustomNumberButton,
  tags: ['autodocs'],
  args: {
    label: '2',
    onPress: fn(),
    selected: false,
    cardType: CardType.Default,
  },
  argTypes: {
    cardType: { control: 'select', options: Object.values(CardType) },
  },
} satisfies Meta<typeof CustomNumberButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** The square card the traveller counters are built from, in both card types and both states. */
export const AllStates: Story = {
  render: args => (
    <View style={styles.row}>
      <CustomNumberButton {...args} cardType={CardType.Default} />
      <CustomNumberButton {...args} cardType={CardType.Secondary} />
      <CustomNumberButton {...args} cardType={CardType.Default} selected />
      <CustomNumberButton {...args} cardType={CardType.Secondary} selected />
    </View>
  ),
};

/** The label is centred and clipped to two lines, so a wide value still fits the 30px square. */
export const LongLabel: Story = {
  args: {
    label: '10+',
  },
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.Double,
  },
});
