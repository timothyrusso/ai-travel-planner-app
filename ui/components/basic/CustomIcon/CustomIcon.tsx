import type { ComponentType } from 'react';
import { type GestureResponderEvent, type OpaqueColorValue, type StyleProp, View, type ViewStyle } from 'react-native';
import { styles } from './CustomIcon.style';

export const DEFAULT_ICON_SIZE = 30;

type IconProps<T> = {
  name: T;
  size?: number;
  color?: string | OpaqueColorValue | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export type CustomIconProps<T extends string> = {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  size?: number | undefined;
  name: T;
  color?: string | OpaqueColorValue | undefined;
  style?: StyleProp<ViewStyle>;
  isDarkThemed?: boolean;
  isOutlined?: boolean;
  IconComponent: ComponentType<IconProps<T>>;
};

const CustomIcon = <T extends string>({
  disabled = false,
  onPress,
  name,
  IconComponent,
  size = DEFAULT_ICON_SIZE,
  color,
  style = {},
  isOutlined,
}: CustomIconProps<T>) => {
  return (
    <View style={[styles().icon, isOutlined && styles().iconOutline, style]}>
      <IconComponent
        name={name}
        size={size}
        color={color}
        onPress={onPress}
        disabled={disabled}
        style={[styles().icon, styles(size).iconSize] as StyleProp<ViewStyle>}
      />
    </View>
  );
};

export default CustomIcon;
