import { View, Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { styles } from './CustomIconButton.style';
import { Ionicons } from '@expo/vector-icons';

type CustomIconButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
};
const CustomIconButton: FC<CustomIconButtonProps> = ({
  onPress,
  style,
  icon,
  iconSize,
  iconColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.main, style, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={iconSize} color={iconColor} />
    </Pressable>
  );
};

export default CustomIconButton;
