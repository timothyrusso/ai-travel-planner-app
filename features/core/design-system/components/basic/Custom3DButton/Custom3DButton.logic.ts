import { useMemo } from 'react';
import type { AccessibilityActionEvent, AccessibilityActionInfo, AccessibilityActionName } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { match } from 'ts-pattern';

import { ButtonState } from '@/features/core/design-system/components/basic/CustomButton/CustomButton.logic';
import { colors } from '@/features/core/design-system/style/colors';
import { opacity } from '@/features/core/design-system/style/opacity';

/**
 * The raised button has its own variant set rather than reusing the flat pill's `ButtonType`: the
 * two barely overlap, and a `Ghost` raised button (no fill, no raise) is not a design that exists.
 */
export const Custom3DButtonType = {
  Main: 'main',
  Primary: 'primary',
  Secondary: 'secondary',
  Accent: 'accent',
  Danger: 'danger',
  Info: 'info',
} as const;

export type Custom3DButtonType = (typeof Custom3DButtonType)[keyof typeof Custom3DButtonType];

export type Custom3DButtonColors = {
  faceColor: string;
  raisedColor: string;
  borderColor: string;
  contentColor: string;
};

const PRESS_IN_TIMING = { duration: 200, easing: Easing.out(Easing.cubic) };
const RELEASE_SPRING = { stiffness: 100, damping: 7, mass: 1 };
const TAP_MAX_DURATION = 100000;
const AT_REST = 0;

/**
 * The action a screen reader's double tap maps to — VoiceOver reaches the button through
 * `onAccessibilityTap`, but TalkBack only ever sends `ACTION_CLICK`, which Android turns into a JS
 * event solely for the actions declared in `accessibilityActions`.
 */
const ACTIVATE_ACTION: AccessibilityActionName = 'activate';
const ACCESSIBILITY_ACTIONS: readonly AccessibilityActionInfo[] = [{ name: ACTIVATE_ACTION }];

type UseCustom3DButtonLogicParams = {
  onPress: () => void;
  buttonType: Custom3DButtonType;
  isDisabled: boolean;
  isLoading: boolean;
  raiseLevel: number;
};

export const useCustom3DButtonLogic = ({
  onPress,
  buttonType,
  isDisabled,
  isLoading,
  raiseLevel,
}: UseCustom3DButtonLogicParams) => {
  const pressProgress = useSharedValue(AT_REST);
  const isInteractive = !(isDisabled || isLoading);

  const tapGesture = useMemo(
    () =>
      Gesture.Tap()
        .enabled(isInteractive)
        .maxDuration(TAP_MAX_DURATION)
        .onBegin(() => {
          'worklet';
          pressProgress.value = withTiming(1, PRESS_IN_TIMING);
        })
        .onEnd(() => {
          'worklet';
          scheduleOnRN(onPress);
        })
        .onFinalize(() => {
          'worklet';
          pressProgress.value = withSpring(AT_REST, RELEASE_SPRING);
        }),
    [isInteractive, onPress, pressProgress],
  );

  // A screen reader swallows the native touch events the tap gesture listens for, so the raised
  // button would be announced but not operable without its own activation path. It reuses the guard
  // the gesture is enabled with, so a disabled or loading button stays inert either way.
  const activate = () => {
    if (!isInteractive) return;
    onPress();
  };

  // The same activation, reached the Android way: `onAccessibilityTap` is iOS-only, so TalkBack
  // arrives here through the declared `activate` action instead.
  const onAccessibilityAction = (event: AccessibilityActionEvent) => {
    if (event.nativeEvent.actionName !== ACTIVATE_ACTION) return;
    activate();
  };

  // Only the press moves the face. A loading button keeps it at rest with the raise visible below:
  // pinning it down for the whole request would cost the button the raised silhouette that is its
  // entire identity, for seconds at a time.
  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: Math.max(AT_REST, pressProgress.value * raiseLevel) }],
  }));

  // The release spring overshoots past zero, so the overlay is clamped: a negative opacity is not a
  // lighter face, it is an invalid style value.
  const pressOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: Math.max(AT_REST, pressProgress.value * opacity.opacity20),
  }));

  const buttonState = isDisabled ? ButtonState.Disabled : ButtonState.Active;

  // Disabled swaps the face and the label/icon for palette tokens instead of fading the whole
  // button: an opacity multiplier renders a colour the palette does not contain, and flattens the
  // raise along with it. The raise and border keep their active values, so a disabled button is
  // still recognisably its own variant.
  const buttonColors: Custom3DButtonColors = match({ buttonType, buttonState })
    .with({ buttonType: Custom3DButtonType.Main, buttonState: ButtonState.Active }, () => ({
      faceColor: colors.purple500,
      raisedColor: colors.purple700,
      borderColor: colors.purple700,
      contentColor: colors.primaryWhite,
    }))
    .with({ buttonType: Custom3DButtonType.Main, buttonState: ButtonState.Disabled }, () => ({
      faceColor: colors.purple300,
      raisedColor: colors.purple700,
      borderColor: colors.purple700,
      contentColor: colors.primaryWhiteDisabled,
    }))
    .with({ buttonType: Custom3DButtonType.Primary, buttonState: ButtonState.Active }, () => ({
      faceColor: colors.primaryBlack,
      raisedColor: colors.cyan900,
      borderColor: colors.cyan700,
      contentColor: colors.primaryWhite,
    }))
    .with({ buttonType: Custom3DButtonType.Primary, buttonState: ButtonState.Disabled }, () => ({
      faceColor: colors.primaryGrey,
      raisedColor: colors.cyan900,
      borderColor: colors.cyan700,
      contentColor: colors.primaryWhiteDisabled,
    }))
    .with({ buttonType: Custom3DButtonType.Secondary, buttonState: ButtonState.Active }, () => ({
      faceColor: colors.primaryWhite,
      raisedColor: colors.secondaryGrey,
      borderColor: colors.secondaryGrey,
      contentColor: colors.primaryBlack,
    }))
    .with({ buttonType: Custom3DButtonType.Secondary, buttonState: ButtonState.Disabled }, () => ({
      faceColor: colors.primaryWhiteDisabled,
      raisedColor: colors.secondaryGrey,
      borderColor: colors.secondaryGrey,
      contentColor: colors.primaryGrey,
    }))
    .with({ buttonType: Custom3DButtonType.Accent, buttonState: ButtonState.Active }, () => ({
      faceColor: colors.lime500,
      raisedColor: colors.lime700,
      borderColor: colors.lime700,
      contentColor: colors.primaryBlack,
    }))
    .with({ buttonType: Custom3DButtonType.Accent, buttonState: ButtonState.Disabled }, () => ({
      faceColor: colors.lime300,
      raisedColor: colors.lime700,
      borderColor: colors.lime700,
      contentColor: colors.primaryGrey,
    }))
    .with({ buttonType: Custom3DButtonType.Danger, buttonState: ButtonState.Active }, () => ({
      faceColor: colors.red500,
      raisedColor: colors.red700,
      borderColor: colors.red700,
      contentColor: colors.primaryWhite,
    }))
    .with({ buttonType: Custom3DButtonType.Danger, buttonState: ButtonState.Disabled }, () => ({
      faceColor: colors.red300,
      raisedColor: colors.red700,
      borderColor: colors.red700,
      contentColor: colors.primaryWhiteDisabled,
    }))
    .with({ buttonType: Custom3DButtonType.Info, buttonState: ButtonState.Active }, () => ({
      faceColor: colors.cyan500,
      raisedColor: colors.cyan700,
      borderColor: colors.cyan700,
      contentColor: colors.primaryBlack,
    }))
    .with({ buttonType: Custom3DButtonType.Info, buttonState: ButtonState.Disabled }, () => ({
      faceColor: colors.cyan300,
      raisedColor: colors.cyan700,
      borderColor: colors.cyan700,
      contentColor: colors.primaryGrey,
    }))
    .exhaustive();

  return {
    derived: {
      tapGesture,
      contentAnimatedStyle,
      pressOverlayAnimatedStyle,
      buttonColors,
      isInteractive,
      accessibilityActions: ACCESSIBILITY_ACTIONS,
    },
    effects: {
      onAccessibilityTap: activate,
      onAccessibilityAction,
    },
  };
};
