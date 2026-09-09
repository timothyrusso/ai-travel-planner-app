import { useEffect, useRef } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { colors } from '@/features/core/design-system/style/colors';
import { type CheckboxSizeName, checkboxSizes } from '@/features/core/design-system/style/dimensions/checkbox';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { icons } from '@/features/core/design-system/style/icons';
import { opacity } from '@/features/core/design-system/style/opacity';

export const CheckboxState = {
  checked: 'checked',
  unchecked: 'unchecked',
  empty: 'empty',
} as const;

export type CheckboxState = (typeof CheckboxState)[keyof typeof CheckboxState];

export const CheckboxColor = {
  purple500: 'purple500',
  lime500: 'lime500',
  red500: 'red500',
  cyan500: 'cyan500',
  primaryBlack: 'primaryBlack',
  primaryWhite: 'primaryWhite',
} as const;

export type CheckboxColor = (typeof CheckboxColor)[keyof typeof CheckboxColor];

export type CheckboxCheckedColors = {
  fill: string;
  checkmark: string;
};

// Exhaustive on purpose: a colour added to the union without a checkmark decision fails to compile
// here rather than rendering a checkmark nobody can see against its own fill.
const checkboxCheckedColors: Record<CheckboxColor, CheckboxCheckedColors> = {
  [CheckboxColor.purple500]: { fill: colors.purple500, checkmark: colors.primaryWhite },
  [CheckboxColor.lime500]: { fill: colors.lime500, checkmark: colors.primaryBlack },
  [CheckboxColor.red500]: { fill: colors.red500, checkmark: colors.primaryWhite },
  [CheckboxColor.cyan500]: { fill: colors.cyan500, checkmark: colors.primaryBlack },
  [CheckboxColor.primaryBlack]: { fill: colors.primaryBlack, checkmark: colors.primaryWhite },
  [CheckboxColor.primaryWhite]: { fill: colors.primaryWhite, checkmark: colors.primaryBlack },
};

type CheckboxBaseProps = {
  state: CheckboxState;
  size?: CheckboxSizeName;
  /** Takes effect on `checked` only: `unchecked` and `empty` are neutral whatever is passed. */
  color?: CheckboxColor;
  style?: StyleProp<ViewStyle>;
};

type CheckboxStaticProps = {
  onChange?: never;
  accessibilityLabel?: string;
};

type CheckboxInteractiveProps = {
  /** Passing a handler is what makes the checkbox interactive; omitting it renders the static one. */
  onChange: (next: boolean) => void;
  /** Required: the control carries no adjacent text for a screen reader to fall back on. */
  accessibilityLabel: string;
};

export type CustomCheckboxProps =
  | (CheckboxBaseProps & CheckboxStaticProps)
  | (CheckboxBaseProps & CheckboxInteractiveProps);

const DEFAULT_SIZE: CheckboxSizeName = 'medium';
const DEFAULT_COLOR: CheckboxColor = CheckboxColor.purple500;
const UNCHECKED = 0;
const CHECKED = 1;
const CHECKMARK_START_SCALE = 0.6;
const FULL_SCALE = 1;
const EMPTY_DASH_PATTERN = [spacing.MinimalDouble, spacing.MinimalDouble];
// Matches `CustomSegmentedControl`: settles in ~250-300ms with a slight overshoot.
const CHECK_SPRING = { damping: 22, stiffness: 220, mass: 1 };
// The medium box is 40, under Apple's 44pt and Android's 48dp minimum touch target; large is already 48.
const MEDIUM_HIT_SLOP = spacing.MinimalDouble;

export const checkboxHitSlop = (size: CheckboxSizeName) => (size === 'medium' ? MEDIUM_HIT_SLOP : undefined);

export const useCustomCheckboxLogic = (props: CustomCheckboxProps) => {
  const { state, size = DEFAULT_SIZE, color = DEFAULT_COLOR, onChange } = props;
  const { box, glyph, strokeWidth } = checkboxSizes[size];
  const prefersReducedMotion = useReducedMotion();

  const isChecked = state === CheckboxState.checked;
  const isEmpty = state === CheckboxState.empty;
  const isInteractive = onChange !== undefined;
  const checkedColors = checkboxCheckedColors[color];

  // Seeded with the state the checkbox is rendered in, so the mount pass springs to the value it
  // already holds and a checkbox mounted checked paints checked on the first frame.
  const checkProgress = useSharedValue(isChecked ? CHECKED : UNCHECKED);
  const previousState = useRef(state);

  useEffect(() => {
    // A `[4, 4]` dash has nothing to interpolate into a solid fill, and a dashed ring morphing into
    // one reads as a glitch, so every transition touching `empty` cuts instead.
    const skipsAnimation =
      prefersReducedMotion || state === CheckboxState.empty || previousState.current === CheckboxState.empty;
    previousState.current = state;

    const target = state === CheckboxState.checked ? CHECKED : UNCHECKED;
    checkProgress.value = skipsAnimation ? target : withSpring(target, CHECK_SPRING);
  }, [state, prefersReducedMotion, checkProgress]);

  // The ring's outer edge stays on the box while its stroke thickens to the radius, so it fills
  // inward into a solid disc; the colour crosses on the same value, so the two cannot drift apart.
  const ringAnimatedProps = useAnimatedProps(() => {
    const ringWidth = interpolate(checkProgress.value, [UNCHECKED, CHECKED], [strokeWidth, box / 2]);

    return {
      r: (box - ringWidth) / 2,
      strokeWidth: ringWidth,
      stroke: interpolateColor(checkProgress.value, [UNCHECKED, CHECKED], [colors.tertiaryGrey, checkedColors.fill]),
    };
  });

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(checkProgress.value, [UNCHECKED, CHECKED], [opacity.opacity0, opacity.opacity100]),
    transform: [{ scale: interpolate(checkProgress.value, [UNCHECKED, CHECKED], [CHECKMARK_START_SCALE, FULL_SCALE]) }],
  }));

  const onPress = () => onChange?.(!isChecked);

  return {
    derived: {
      box,
      glyph,
      strokeWidth,
      center: box / 2,
      radius: (box - strokeWidth) / 2,
      isEmpty,
      isInteractive,
      isChecked,
      neutralRingColor: colors.tertiaryGrey,
      // A white fill is invisible on a white surface, so that one variant keeps a neutral ring; the
      // dashed `empty` ring must not be overdrawn by it.
      hasNeutralOutline: color === CheckboxColor.primaryWhite && !isEmpty,
      dashArray: isEmpty ? EMPTY_DASH_PATTERN : undefined,
      glyphName: isEmpty ? icons.add : icons.checkmark,
      glyphColor: isEmpty ? colors.tertiaryGrey : checkedColors.checkmark,
      ringAnimatedProps,
      checkmarkAnimatedStyle,
      hitSlop: checkboxHitSlop(size),
      // Static announces as checked and dimmed rather than leaving the a11y tree: it is a value the
      // reader should still hear, just not one it can change.
      accessibilityState: { checked: isChecked, disabled: !isInteractive },
    },
    effects: {
      onPress,
    },
  };
};
