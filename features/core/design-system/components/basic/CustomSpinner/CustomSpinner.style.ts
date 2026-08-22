import { StyleSheet } from 'react-native';

import { spin } from '@/features/core/design-system/style/animations';

const TURN_DURATION = 800;

/**
 * Deliberately not gated on `useReducedMotion()`, unlike `CustomSegmentedControl`: a continuous
 * rotation is this component's status feedback, not decoration, and freezing it reads as a hung app.
 */
export const spinnerRotation = {
  animationName: spin,
  animationDuration: TURN_DURATION,
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
} as const;

type CustomSpinnerStyleParams = {
  box: number;
};

export const customSpinnerStyles = ({ box }: CustomSpinnerStyleParams) =>
  StyleSheet.create({
    container: {
      width: box,
      height: box,
    },
  });
