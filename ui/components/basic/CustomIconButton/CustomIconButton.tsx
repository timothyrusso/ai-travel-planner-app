import type { FC } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import { CustomIcon, type IoniconsName } from '../CustomIcon/CustomIcon';
import { styles } from './CustomIconButton.style';

type CustomIconButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  icon: IoniconsName;
  iconSize?: number;
  iconColor?: string;
};

export const CustomIconButton: FC<CustomIconButtonProps> = ({ onPress, style, icon, iconSize, iconColor }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.main, style, pressed && styles.pressed]}>
      <CustomIcon name={icon} size={iconSize} color={iconColor} />
    </Pressable>
  );
};
