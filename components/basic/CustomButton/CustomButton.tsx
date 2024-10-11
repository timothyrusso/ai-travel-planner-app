import { colors } from '@/constants/colors';
import React, { FC } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';
import { styles } from './CustomButton.style';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  outline?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  activityndicatorColor?: string;
};
const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  outline,
  style,
  textStyle,
  isLoading,
  activityndicatorColor,
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
      {isLoading ? (
        <ActivityIndicator
          color={activityndicatorColor || colors.primaryWhite}
        />
      ) : (
        <Text style={[styles.text, outline && styles.textOutline, textStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
