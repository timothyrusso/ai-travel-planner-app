import { colors } from '@/constants/style/colors';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { styles } from './CustomButton.style';

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  outline?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  activityndicatorColor?: string;
  isDisabled?: boolean;
};
const CustomButton: FC<CustomButtonProps> = ({
  title,
  onPress,
  outline,
  style,
  textStyle,
  isLoading,
  activityndicatorColor,
  isDisabled,
}) => {
  const { t } = useTranslation();

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.main,
        style,
        pressed && styles.pressed,
        outline && styles.outline,
        isDisabled && styles.disabled,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          color={activityndicatorColor || colors.primaryWhite}
        />
      ) : (
        <Text style={[styles.text, outline && styles.textOutline, textStyle]}>
          {t(title)}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
