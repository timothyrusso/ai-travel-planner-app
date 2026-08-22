import type { StyleProp, ViewStyle } from 'react-native';

import { colors } from '@/features/core/design-system/style/colors';
import {
  type SpinnerSize,
  type SpinnerSizeName,
  spinnerSizes,
} from '@/features/core/design-system/style/dimensions/spinner';
import { opacity } from '@/features/core/design-system/style/opacity';

export const SpinnerColor = {
  purple500: 'purple500',
  lime500: 'lime500',
  red500: 'red500',
  cyan500: 'cyan500',
  primaryBlack: 'primaryBlack',
  primaryWhite: 'primaryWhite',
} as const;

export type SpinnerColor = (typeof SpinnerColor)[keyof typeof SpinnerColor];

// Callers pass the content colour resolved at their active state: the disabled content colours are
// outside the six spinner colours the design specifies, and disabled + loading is a combination
// every button already blocks.
export const spinnerColorForContent = (contentColor: string): SpinnerColor =>
  contentColor === colors.primaryWhite ? SpinnerColor.primaryWhite : SpinnerColor.primaryBlack;

export type SpinnerColors = {
  arc: string;
  track: string;
  trackOpacity: number;
};

export type CustomSpinnerProps = {
  size?: SpinnerSizeName;
  color?: SpinnerColor;
  /** Omitted spins an indeterminate 270° arc; provided renders a static arc, clamped to 0–1. */
  progress?: number;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

const NO_SWEEP = 0;
const FULL_SWEEP = 1;
const MIN_PERCENT = 0;
const MAX_PERCENT = 100;
const FULL_TURN_DEGREES = 360;
const INDETERMINATE_SWEEP_DEGREES = 270;
// An SVG circle starts its path at 3 o'clock, so the arc is rotated back a quarter turn to start at
// 12 o'clock and run clockwise from there.
const ARC_START_ANGLE = -90;

export const spinnerRadius = ({ box, strokeWidth }: SpinnerSize) => (box - strokeWidth) / 2;

export const spinnerCircumference = (radius: number) => 2 * Math.PI * radius;

export const spinnerDashLength = (radius: number, sweep: number) => spinnerCircumference(radius) * sweep;

// A NaN progress would survive Math.min/Math.max untouched and be announced as a NaN percentage,
// so it collapses to an empty sweep before any clamping.
export const clampProgress = (progress: number) =>
  Number.isNaN(progress) ? NO_SWEEP : Math.min(Math.max(progress, NO_SWEEP), FULL_SWEEP);

export const spinnerSweep = (progress?: number) =>
  progress === undefined ? INDETERMINATE_SWEEP_DEGREES / FULL_TURN_DEGREES : clampProgress(progress);

// React Native's native accessibility value is an integer triple (`std::optional<int>`), so a 0–1
// range truncates every intermediate value to 0 and a screen reader announces "0%": the announced
// range is expressed in whole percent instead.
export const spinnerPercent = (sweep: number) => Math.round(sweep * MAX_PERCENT);

type UseCustomSpinnerLogicParams = {
  size: SpinnerSizeName;
  color: SpinnerColor;
  progress?: number;
};

export const useCustomSpinnerLogic = ({ size, color, progress }: UseCustomSpinnerLogicParams) => {
  const { box, strokeWidth } = spinnerSizes[size];
  const center = box / 2;
  const radius = spinnerRadius(spinnerSizes[size]);
  const circumference = spinnerCircumference(radius);
  const sweep = spinnerSweep(progress);
  const isIndeterminate = progress === undefined;

  const isWhiteArc = color === SpinnerColor.primaryWhite;

  // The track colour is derived, never passed in: the design pairs each arc with one track, and a
  // white arc is the only variant whose track is a translucent copy of itself.
  const spinnerColors: SpinnerColors = {
    arc: colors[color],
    track: isWhiteArc ? colors.primaryWhite : colors.tertiaryGrey,
    trackOpacity: isWhiteArc ? opacity.opacity20 : opacity.opacity100,
  };

  return {
    derived: {
      box,
      strokeWidth,
      center,
      radius,
      spinnerColors,
      isIndeterminate,
      // A dash as long as the whole circle, pushed back by the part of it that must stay hidden: one
      // primitive draws the 270° indeterminate arc and any determinate percentage.
      dashArray: circumference,
      dashOffset: circumference - spinnerDashLength(radius, sweep),
      hasArc: sweep > NO_SWEEP,
      arcRotation: `rotate(${ARC_START_ANGLE} ${center} ${center})`,
      // `busy` is what makes a screen reader announce the spinner as loading; the value is omitted
      // alongside it so the same spinner is not also announced as 0%.
      accessibilityBusy: isIndeterminate ? true : undefined,
      accessibilityValue: isIndeterminate
        ? undefined
        : { min: MIN_PERCENT, max: MAX_PERCENT, now: spinnerPercent(sweep) },
    },
  };
};
