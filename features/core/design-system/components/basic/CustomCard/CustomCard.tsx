import type { PropsWithChildren } from 'react';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';

import {
  CardType,
  type CustomCardLogicProps,
  useCustomCardLogic,
} from '@/features/core/design-system/components/basic/CustomCard/CustomCard.logic';

export type CustomCardProps = PressableProps &
  CustomCardLogicProps & {
    style?: StyleProp<ViewStyle>;
    onPress?: () => void | Promise<void>;
  };

export const CustomCard = ({
  children,
  selected = false,
  cardType = CardType.Default,
  style,
  onPress,
  ...rest
}: PropsWithChildren<CustomCardProps>) => {
  const { derived } = useCustomCardLogic({ selected, cardType });

  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [derived.componentStyle.pressable, style, pressed && derived.componentStyle.pressed]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};
