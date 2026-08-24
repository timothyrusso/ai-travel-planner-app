import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import { type CSSTransitionProperties, type CSSTransitionProperty, useReducedMotion } from 'react-native-reanimated';
import { match } from 'ts-pattern';

import { colors } from '@/features/core/design-system/style/colors';

export const ProgressBarColor = {
  Purple: 'purple',
  Lime: 'lime',
  Red: 'red',
  Cyan: 'cyan',
  Black: 'black',
} as const;

export type ProgressBarColor = (typeof ProgressBarColor)[keyof typeof ProgressBarColor];

/** The two shades a colour resolves to: `<hue>500` fills, `<hue>900` emphasizes the current step. */
export type ProgressBarPalette = {
  fill: string;
  emphasis: string;
};

export type CustomProgressBarProps = {
  /** Fraction of the track that is filled, `0`–`1` — `0.6` is 60%. Clamped to that range. */
  progress: number;
  color?: ProgressBarColor;
  /** Layout only — the bar always fills the width of its container. */
  style?: StyleProp<ViewStyle>;
};

const EMPTY_PROGRESS = 0;
const FULL_PROGRESS = 1;
const FULL_WIDTH_PERCENT = 100;
const NO_TRANSITION = 0;
// Settles in ~260ms, the travel the segmented control's spring takes: a fill growing and a step
// being reached are the same size of change to the eye.
const TRANSITION_DURATION = 260;

/**
 * The colours every progress bar draws with. Resolved from the five-member union rather than taken as
 * raw colours, so no caller can pair a fill with a shade the design never puts next to it. Shared
 * with `CustomSteppedProgressBar`, which is the component the `emphasis` shade exists for.
 */
export const progressBarPalette = (color: ProgressBarColor): ProgressBarPalette =>
  match(color)
    .with(ProgressBarColor.Purple, () => ({ fill: colors.purple500, emphasis: colors.purple900 }))
    .with(ProgressBarColor.Lime, () => ({ fill: colors.lime500, emphasis: colors.lime900 }))
    .with(ProgressBarColor.Red, () => ({ fill: colors.red500, emphasis: colors.red900 }))
    .with(ProgressBarColor.Cyan, () => ({ fill: colors.cyan500, emphasis: colors.cyan900 }))
    .with(ProgressBarColor.Black, () => ({ fill: colors.primaryBlack, emphasis: colors.primaryBlack }))
    .exhaustive();

/**
 * A CSS transition rather than a shared value: the stepped bar transitions a segment count it only
 * learns at runtime, and hooks cannot run per segment. Both bars resolve their transition here so the
 * pair cannot drift apart. A zero duration is how reduced motion lands on the new value with no travel.
 */
export const progressBarTransition = (
  property: CSSTransitionProperty,
  prefersReducedMotion: boolean,
): CSSTransitionProperties => ({
  transitionProperty: property,
  transitionDuration: prefersReducedMotion ? NO_TRANSITION : TRANSITION_DURATION,
  transitionTimingFunction: 'ease-out',
});

// A NaN progress survives Math.min/Math.max untouched and would reach the fill as a `NaN%` width, so
// it collapses to an empty fill before any clamping.
const clampProgress = (progress: number) =>
  Number.isNaN(progress) ? EMPTY_PROGRESS : Math.min(Math.max(progress, EMPTY_PROGRESS), FULL_PROGRESS);

type UseCustomProgressBarLogicParams = {
  progress: number;
  color: ProgressBarColor;
};

export const useCustomProgressBarLogic = ({ progress, color }: UseCustomProgressBarLogicParams) => {
  const prefersReducedMotion = useReducedMotion();
  const clampedProgress = clampProgress(progress);

  return {
    derived: {
      fillColor: progressBarPalette(color).fill,
      // A percentage, not the measured width: the bar fills its container, so the fill stays at the
      // right fraction of it without a layout pass.
      fillWidth: `${clampedProgress * FULL_WIDTH_PERCENT}%` as DimensionValue,
      fillTransition: progressBarTransition('width', prefersReducedMotion),
      // Announced in whole percent, not as the 0–1 fraction the prop takes: React Native's native
      // accessibility value is an integer triple, so a 0–1 range truncates every intermediate value
      // to 0 and a screen reader announces "0%" for every partial bar.
      accessibilityValue: {
        min: EMPTY_PROGRESS,
        max: FULL_WIDTH_PERCENT,
        now: Math.round(clampedProgress * FULL_WIDTH_PERCENT),
      },
    },
  };
};
