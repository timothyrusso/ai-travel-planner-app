import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import {
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { match } from 'ts-pattern';

import type { IoniconsName } from '@/features/core/design-system/components/basic/CustomIcon/CustomIcon';
import { colors } from '@/features/core/design-system/style/colors';

export const SegmentedControlThumbFill = {
  White: 'white',
  Black: 'black',
} as const;

export type SegmentedControlThumbFill = (typeof SegmentedControlThumbFill)[keyof typeof SegmentedControlThumbFill];

export type Segment = {
  /** An i18n key: `t()` runs over it before it reaches either the screen or a screen reader. */
  label: string;
  icon?: IoniconsName;
};

export type CustomSegmentedControlProps = {
  /**
   * Two or three segments, capped at the type level. Past three, the segments stop being readable at
   * a phone width — a longer set of options belongs in day pills or filter chips.
   */
  segments: readonly [Segment, Segment] | readonly [Segment, Segment, Segment];
  selectedIndex: number;
  onChange: (index: number) => void;
  thumbFill?: SegmentedControlThumbFill;
  isDisabled?: boolean;
  /** Layout only — the control always fills the width of its container. */
  style?: StyleProp<ViewStyle>;
};

export type SegmentedControlColors = {
  thumbColor: string;
  selectedContentColor: string;
  unselectedContentColor: string;
};

// Settles in ~250-300ms with a slight overshoot. `CustomPressable`'s damping 500 / stiffness 1000 is
// a jump cut over the thumb's travel distance, and `animations.ts` stays keyframes-only, so the
// config is a local const — the precedent `Custom3DButton.logic.ts` set.
const THUMB_SPRING = { damping: 22, stiffness: 220, mass: 1 };
const NOT_MEASURED = 0;

/**
 * The colour a label holds at `progress`: its selected colour when the thumb is under it, its
 * unselected colour once the thumb has travelled a full segment away, interpolated in between.
 */
const labelColor = (progress: number, index: number, controlColors: SegmentedControlColors) => {
  'worklet';
  return interpolateColor(
    progress,
    [index - 1, index, index + 1],
    [controlColors.unselectedContentColor, controlColors.selectedContentColor, controlColors.unselectedContentColor],
  );
};

type UseCustomSegmentedControlLogicParams = {
  segmentCount: number;
  selectedIndex: number;
  onChange: (index: number) => void;
  thumbFill: SegmentedControlThumbFill;
  isDisabled: boolean;
};

export const useCustomSegmentedControlLogic = ({
  segmentCount,
  selectedIndex,
  onChange,
  thumbFill,
  isDisabled,
}: UseCustomSegmentedControlLogicParams) => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const selectionProgress = useSharedValue(selectedIndex);
  const innerWidth = useSharedValue(NOT_MEASURED);

  const controlColors: SegmentedControlColors = match(thumbFill)
    .with(SegmentedControlThumbFill.White, () => ({
      thumbColor: colors.primaryWhite,
      selectedContentColor: colors.primaryBlack,
      unselectedContentColor: colors.primaryGrey,
    }))
    .with(SegmentedControlThumbFill.Black, () => ({
      thumbColor: colors.primaryBlack,
      selectedContentColor: colors.primaryWhite,
      unselectedContentColor: colors.primaryGrey,
    }))
    .exhaustive();

  // The thumb follows the `selectedIndex` prop, never the tap: a parent that holds the prop fixed
  // must see `onChange` fire with the thumb standing still. The shared value is seeded with the
  // initial index, so the mount pass springs to the value it already holds and nothing animates in.
  useEffect(() => {
    selectionProgress.value = prefersReducedMotion ? selectedIndex : withSpring(selectedIndex, THUMB_SPRING);
  }, [selectedIndex, prefersReducedMotion, selectionProgress]);

  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: selectionProgress.value * (innerWidth.value / segmentCount) }],
  }));

  // One style per possible segment, all three called unconditionally: hooks cannot run inside the
  // view's `map`, and the tuple prop caps the count at three. Every label reads the same shared
  // value as the thumb, so the crossfade cannot desync from the travel.
  const firstLabelAnimatedStyle = useAnimatedStyle(() => ({
    color: labelColor(selectionProgress.value, 0, controlColors),
  }));
  const secondLabelAnimatedStyle = useAnimatedStyle(() => ({
    color: labelColor(selectionProgress.value, 1, controlColors),
  }));
  const thirdLabelAnimatedStyle = useAnimatedStyle(() => ({
    color: labelColor(selectionProgress.value, 2, controlColors),
  }));

  const onTrackLayout = (event: LayoutChangeEvent) => {
    innerWidth.value = event.nativeEvent.layout.width;
  };

  const onSegmentPress = (index: number) => {
    if (isDisabled) return;
    onChange(index);
  };

  return {
    // `CustomText` is not used for a label, because the crossfade needs an animatable `color`, so
    // the translation the reader and the screen share is done here instead.
    state: {
      t,
    },
    derived: {
      controlColors,
      thumbAnimatedStyle,
      labelAnimatedStyles: [firstLabelAnimatedStyle, secondLabelAnimatedStyle, thirdLabelAnimatedStyle],
      isSelected: (index: number) => index === selectedIndex,
      // Ionicons takes its colour as a prop rather than a style, so an icon switches colour at once
      // instead of riding the crossfade its label does.
      iconColorAt: (index: number) =>
        index === selectedIndex ? controlColors.selectedContentColor : controlColors.unselectedContentColor,
    },
    effects: {
      onTrackLayout,
      onSegmentPress,
    },
  };
};
