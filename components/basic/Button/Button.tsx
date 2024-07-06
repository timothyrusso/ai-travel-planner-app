import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { styles } from './Button.style';

type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};
const Button: FC<ButtonProps> = ({ title, onPress, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.main, style, pressed && styles.pressed]}
    >
      <Text>{title}</Text>
    </Pressable>
  );
};

export default Button;
