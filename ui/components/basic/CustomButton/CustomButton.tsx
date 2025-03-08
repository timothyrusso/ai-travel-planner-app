import { colors } from '@/ui/constants/style/colors';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, type StyleProp, Text, type TextStyle, type ViewStyle } from 'react-native';
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
        <ActivityIndicator color={activityndicatorColor || colors.primaryWhite} />
      ) : (
        <Text style={[styles.text, outline && styles.textOutline, textStyle]}>{t(title)}</Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
