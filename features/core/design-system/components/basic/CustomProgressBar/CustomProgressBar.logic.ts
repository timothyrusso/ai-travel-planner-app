import type { DimensionValue, StyleProp, ViewStyle } from 'react-native';
import { type CSSTransitionProperties, type CSSTransitionProperty, useReducedMotion } from 'react-native-reanimated';

import { AccentHue, accentShades } from '@/features/core/design-system/style/paletteRoles';

export const ProgressBarColor = AccentHue;

export type ProgressBarColor = AccentHue;

export type CustomProgressBarProps = {
  progress: number;
  color?: ProgressBarColor;
  style?: StyleProp<ViewStyle>;
};

const EMPTY_PROGRESS = 0;
const FULL_PROGRESS = 1;
const FULL_WIDTH_PERCENT = 100;
const NO_TRANSITION = 0;
const TRANSITION_DURATION = 260;

export const progressBarTransition = (
  property: CSSTransitionProperty,
  prefersReducedMotion: boolean,
): CSSTransitionProperties => ({
  transitionProperty: property,
  transitionDuration: prefersReducedMotion ? NO_TRANSITION : TRANSITION_DURATION,
  transitionTimingFunction: 'ease-out',
});

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
      fillColor: accentShades(color).fill,
      fillWidth: `${clampedProgress * FULL_WIDTH_PERCENT}%` as DimensionValue,
      fillTransition: progressBarTransition('width', prefersReducedMotion),
      accessibilityValue: {
        min: EMPTY_PROGRESS,
        max: FULL_WIDTH_PERCENT,
        now: Math.round(clampedProgress * FULL_WIDTH_PERCENT),
      },
    },
  };
};
