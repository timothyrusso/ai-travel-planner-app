import { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { styles } from './CustomIconButton.style';

type CustomIconButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
};
const CustomIconButton: FC<CustomIconButtonProps> = ({ onPress, style, icon, iconSize, iconColor }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.main, style, pressed && styles.pressed]}>
      <Ionicons name={icon} size={iconSize} color={iconColor} />
    </Pressable>
  );
};

export default CustomIconButton;
