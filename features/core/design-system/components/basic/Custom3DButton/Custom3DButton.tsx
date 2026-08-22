import { Fragment } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {
  Custom3DButtonType,
  useCustom3DButtonLogic,
} from '@/features/core/design-system/components/basic/Custom3DButton/Custom3DButton.logic';
import { custom3DButtonStyles } from '@/features/core/design-system/components/basic/Custom3DButton/Custom3DButton.style';
import { CustomIcon, type IoniconsName } from '@/features/core/design-system/components/basic/CustomIcon/CustomIcon';
import { CustomSpinner } from '@/features/core/design-system/components/basic/CustomSpinner/CustomSpinner';
import { CustomText } from '@/features/core/design-system/components/basic/CustomText/CustomText';
import { type RaisedButtonSize, raisedButtonSizes } from '@/features/core/design-system/style/dimensions/raisedButton';

export type Custom3DButtonProps = {
  title: string;
  onPress: () => void;
  buttonType?: Custom3DButtonType;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: IoniconsName;
  rightIcon?: IoniconsName;
  iconSize?: number;
  /** Layout only — the button always fills the width of its container. */
  style?: StyleProp<ViewStyle>;
  size?: RaisedButtonSize;
};

export const Custom3DButton = ({
  title,
  onPress,
  buttonType = Custom3DButtonType.Primary,
  isDisabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  iconSize,
  style,
  size = raisedButtonSizes.large,
}: Custom3DButtonProps) => {
  const { state, derived, effects } = useCustom3DButtonLogic({
    onPress,
    buttonType,
    isDisabled,
    isLoading,
    raiseLevel: size.raiseLevel,
  });

  const styles = custom3DButtonStyles({ size, buttonColors: derived.buttonColors });

  const resolvedIconSize = iconSize ?? size.iconSize;

  return (
    <GestureDetector gesture={derived.tapGesture}>
      <View
        style={[styles.container, style]}
        accessible
        accessibilityRole="button"
        accessibilityLabel={state.t(title)}
        accessibilityState={{ disabled: !derived.isInteractive }}
        accessibilityActions={derived.accessibilityActions}
        onAccessibilityTap={effects.onAccessibilityTap}
        onAccessibilityAction={effects.onAccessibilityAction}
      >
        <View style={styles.bottomFace} />
        <Animated.View style={[styles.content, derived.contentAnimatedStyle]}>
          <View style={styles.topFace}>
            {isLoading ? (
              <CustomSpinner size="small" color={derived.spinnerColor} />
            ) : (
              <Fragment>
                {leftIcon && (
                  <CustomIcon
                    name={leftIcon}
                    size={resolvedIconSize}
                    color={derived.buttonColors.contentColor}
                    style={styles.leftIcon}
                  />
                )}
                <CustomText text={title} style={styles.text} numberOfLines={1} ellipsizeMode="tail" />
                {rightIcon && (
                  <CustomIcon
                    name={rightIcon}
                    size={resolvedIconSize}
                    color={derived.buttonColors.contentColor}
                    style={styles.rightIcon}
                  />
                )}
              </Fragment>
            )}
            <Animated.View pointerEvents="none" style={[styles.pressOverlay, derived.pressOverlayAnimatedStyle]} />
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};
