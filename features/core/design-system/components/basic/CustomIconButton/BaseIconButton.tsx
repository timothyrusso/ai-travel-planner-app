import { ActivityIndicator, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';
import { match } from 'ts-pattern';

import {
  ButtonState,
  ButtonType,
  useCustomButtonLogic,
} from '@/features/core/design-system/components/basic/CustomButton/CustomButton.logic';
import { CustomIcon, type IoniconsName } from '@/features/core/design-system/components/basic/CustomIcon/CustomIcon';
import { styleButton } from '@/features/core/design-system/components/basic/CustomIconButton/CustomIconButton.style';
import { CustomPressable } from '@/features/core/design-system/components/basic/CustomPressable/CustomPressable';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

export type CustomIconButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
  buttonType?: ButtonType;
  size?: number;
  iconName: IoniconsName;
  iconSize?: number;
  iconStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  animatedIconStyle?: StyleProp<AnimatedStyle<ViewStyle>>;
  noPressedStyle?: boolean;
} & ViewProps;

export function BaseIconButton({
  style,
  onPress,
  isDisabled = false,
  buttonType = ButtonType.Primary,
  size,
  iconName,
  iconSize = spacing.TripleAndHalf,
  iconStyle,
  isLoading = false,
  animatedIconStyle,
  noPressedStyle = false,
  // Icon-only buttons have no text to name them, so the accessibility props inherited from ViewProps
  // have to be forwarded to the pressable by hand: this component takes no rest element on purpose.
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
}: CustomIconButtonProps) {
  const buttonState = match({ isDisabled, isLoading })
    .with({ isDisabled: true }, () => ButtonState.Disabled)
    .with({ isLoading: true }, () => ButtonState.Disabled)
    .otherwise(() => ButtonState.Active);

  const { derived } = useCustomButtonLogic();

  const styles = styleButton(buttonType, buttonState, derived.getButtonStyles, size);
  const iconColor = derived.styleIconColor(buttonType, buttonState);

  const icon = <CustomIcon name={iconName} size={iconSize} style={iconStyle} color={iconColor} />;

  return (
    <CustomPressable
      disabled={isDisabled || isLoading}
      style={[styles.button, style]}
      scaleValue={noPressedStyle ? 1 : 1.2}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
    >
      {isLoading ? (
        <ActivityIndicator color={iconColor} size={iconSize} />
      ) : animatedIconStyle !== undefined ? (
        <Animated.View style={animatedIconStyle}>{icon}</Animated.View>
      ) : (
        icon
      )}
    </CustomPressable>
  );
}
