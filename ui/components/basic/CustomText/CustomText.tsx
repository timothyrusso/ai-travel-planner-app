import { View, Text, StyleProp, ViewStyle, TextProps } from 'react-native';
import React, { FC } from 'react';
import { styles } from './CustomText.style';

type CustomTextProps = TextProps & {
  text: string;
  style?: StyleProp<ViewStyle>;
};
const CustomText: FC<CustomTextProps> = ({ text, style, ...textProps }) => {
  return (
    <Text style={[styles.text, style]} {...textProps}>
      {text}
    </Text>
  );
};

export default CustomText;
