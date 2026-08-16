import { Fragment } from 'react';
import { ActivityIndicator, type StyleProp, View, type ViewStyle } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import {
  Custom3DButtonType,
  useCustom3DButtonLogic,
} from '@/features/core/design-system/components/basic/Custom3DButton/Custom3DButton.logic';
import { custom3DButtonStyles } from '@/features/core/design-system/components/basic/Custom3DButton/Custom3DButton.style';
import { CustomIcon, type IoniconsName } from '@/features/core/design-system/components/basic/CustomIcon/CustomIcon';
import { CustomText } from '@/features/core/design-system/components/basic/CustomText/CustomText';
import { type RaisedButtonSize, raisedButtonSizes } from '@/features/core/design-system/style/dimensions/components';

export type Custom3DButtonProps = {
  title: string;
  onPress: () => void;
  buttonType?: Custom3DButtonType;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: IoniconsName;
  rightIcon?: IoniconsName;
  iconSize?: number;
  /** Layout only — the button always fills the width of its container, as both Figma cards state. */
  style?: StyleProp<ViewStyle>;
  /**
   * The internal size knob, mirroring `CustomButtonProps['size']`: a whole geometry token rather
   * than a height, because the raise depth, radius, label and icon all move with the size. Call
   * sites use the `Custom3DButtonSmall`/`Medium`/`Large`/`ExtraLarge` exports instead.
   */
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

  // The button is drawn as plain views and driven by a tap gesture, so nothing about it is
  // accessible by default: the container has to name itself a button, expose its own label —
  // `accessible` collapses the faces below it into a single element — carry the disabled state, and
  // offer an activation path a screen reader can reach, since it consumes the touch events the
  // gesture would otherwise receive. That path is platform-split: VoiceOver activates through
  // `onAccessibilityTap`, TalkBack only through the declared `activate` action.
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
              <ActivityIndicator color={derived.buttonColors.contentColor} />
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
