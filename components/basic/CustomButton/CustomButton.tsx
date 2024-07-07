import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { styles } from './CustomButton.style';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  outline?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
};
const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  outline,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.main,
        style,
        pressed && styles.pressed,
        outline && styles.outline,
      ]}
    >
      <Text style={[styles.text, outline && styles.textOutline, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
