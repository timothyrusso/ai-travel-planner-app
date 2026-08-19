import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { match } from 'ts-pattern';

import type { IoniconsName } from '@/features/core/design-system/components/basic/CustomIcon/CustomIcon';
import { colors } from '@/features/core/design-system/style/colors';
import { opacity } from '@/features/core/design-system/style/opacity';

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
const UNSELECTED_CONTENT_OPACITY = opacity.opacity60;
const FIRST_SEGMENT_INDEX = 0;
const LAST_SEGMENT_OFFSET = 1;

/**
 * The index the thumb travels to. Clamped, because the track does not clip: an index past the last
 * segment would park a one-segment-wide thumb entirely outside the control.
 */
const clampToSegments = (index: number, segmentCount: number) =>
  Math.min(Math.max(index, FIRST_SEGMENT_INDEX), segmentCount - LAST_SEGMENT_OFFSET);

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

/**
 * The opacity a segment's content holds at `progress`: full under the thumb, muted once the thumb has
 * travelled a full segment away. Clamped, because the spring overshoots past the segment it lands on.
 */
const contentOpacity = (progress: number, index: number) => {
  'worklet';
  return interpolate(
    progress,
    [index - 1, index, index + 1],
    [UNSELECTED_CONTENT_OPACITY, opacity.opacity100, UNSELECTED_CONTENT_OPACITY],
    Extrapolation.CLAMP,
  );
};

/**
 * The opacity of the selected-colour copy of a segment's icon at `progress`. Composited over an opaque
 * copy of the same glyph in the unselected colour, it resolves to the exact blend `interpolateColor`
 * hands the label, so an icon and its label cross the thumb edge together.
 */
const selectedIconOpacity = (progress: number, index: number) => {
  'worklet';
  return interpolate(
    progress,
    [index - 1, index, index + 1],
    [opacity.opacity0, opacity.opacity100, opacity.opacity0],
    Extrapolation.CLAMP,
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
  const thumbIndex = clampToSegments(selectedIndex, segmentCount);
  const selectionProgress = useSharedValue(thumbIndex);
  const innerWidth = useSharedValue(NOT_MEASURED);

  // `primaryGrey` #8E8E8F on the `secondaryGrey` #F5F5F5 track is 3:1, under the WCAG AA 4.5:1 floor, and the
  // palette has no darker grey — so unselected is `primaryBlack` at `UNSELECTED_CONTENT_OPACITY`: ~#626262, 5.6:1.
  const controlColors: SegmentedControlColors = match(thumbFill)
    .with(SegmentedControlThumbFill.White, () => ({
      thumbColor: colors.primaryWhite,
      selectedContentColor: colors.primaryBlack,
      unselectedContentColor: colors.primaryBlack,
    }))
    .with(SegmentedControlThumbFill.Black, () => ({
      thumbColor: colors.primaryBlack,
      selectedContentColor: colors.primaryWhite,
      unselectedContentColor: colors.primaryBlack,
    }))
    .exhaustive();

  // The thumb follows the `selectedIndex` prop, never the tap: a parent that holds the prop fixed
  // must see `onChange` fire with the thumb standing still. The shared value is seeded with the
  // initial index, so the mount pass springs to the value it already holds and nothing animates in.
  useEffect(() => {
    selectionProgress.value = prefersReducedMotion ? thumbIndex : withSpring(thumbIndex, THUMB_SPRING);
  }, [thumbIndex, prefersReducedMotion, selectionProgress]);

  // Hidden until the layout pass measures the track: the translate resolves to 0 for every index
  // while the width is unknown, which would paint one frame of the thumb under the first segment.
  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    opacity: innerWidth.value === NOT_MEASURED ? opacity.opacity0 : opacity.opacity100,
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

  // The mute rides the same shared value, so the icon fades with its own label rather than snapping.
  const firstContentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity(selectionProgress.value, 0),
  }));
  const secondContentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity(selectionProgress.value, 1),
  }));
  const thirdContentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity(selectionProgress.value, 2),
  }));

  // Ionicons takes its colour as a prop, and neither a prop nor a glyph colour is animatable, so the
  // view stacks a selected-colour copy of the icon over an unselected-colour one and fades the top
  // copy in off this shared value. Reading `selectedIndex` here instead would blank both copies for
  // the whole travel under a black thumb: the incoming white glyph over the grey track and the
  // outgoing black glyph over the thumb it has not left yet.
  const firstIconOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: selectedIconOpacity(selectionProgress.value, 0),
  }));
  const secondIconOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: selectedIconOpacity(selectionProgress.value, 1),
  }));
  const thirdIconOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: selectedIconOpacity(selectionProgress.value, 2),
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
      contentAnimatedStyles: [firstContentAnimatedStyle, secondContentAnimatedStyle, thirdContentAnimatedStyle],
      iconOverlayAnimatedStyles: [
        firstIconOverlayAnimatedStyle,
        secondIconOverlayAnimatedStyle,
        thirdIconOverlayAnimatedStyle,
      ],
      isSelected: (index: number) => index === thumbIndex,
    },
    effects: {
      onTrackLayout,
      onSegmentPress,
    },
  };
};
