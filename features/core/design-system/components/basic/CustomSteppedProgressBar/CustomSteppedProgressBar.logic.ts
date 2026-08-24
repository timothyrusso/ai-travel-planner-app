import type { StyleProp, ViewStyle } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

import {
  type ProgressBarColor,
  progressBarPalette,
  progressBarTransition,
} from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBar.logic';
import { colors } from '@/features/core/design-system/style/colors';

export const SteppedProgressBarSegmentState = {
  Completed: 'completed',
  Current: 'current',
  Upcoming: 'upcoming',
} as const;

export type SteppedProgressBarSegmentState =
  (typeof SteppedProgressBarSegmentState)[keyof typeof SteppedProgressBarSegmentState];

export type SteppedProgressBarSegment = {
  step: number;
  state: SteppedProgressBarSegmentState;
};

export type SteppedProgressBarColors = Record<SteppedProgressBarSegmentState, string>;

export type CustomSteppedProgressBarProps = {
  /** How many segments the bar draws, clamped to a minimum of one. */
  totalSteps: number;
  /**
   * The emphasized segment, 1-based and clamped to `1…totalSteps`. Steps before it are completed and
   * steps after it are upcoming, so a fully complete bar is `currentStep === totalSteps`.
   */
  currentStep: number;
  color?: ProgressBarColor;
  /** Layout only — the bar always fills the width of its container. */
  style?: StyleProp<ViewStyle>;
};

const MIN_TOTAL_STEPS = 1;
const FIRST_STEP = 1;

// Whole numbers, and NaN-guarded: a fractional count would ask for a fraction of a segment, and NaN
// survives Math.min/Math.max untouched — as a length it renders no segments at all.
const clampTotalSteps = (totalSteps: number) =>
  Number.isNaN(totalSteps) ? MIN_TOTAL_STEPS : Math.max(Math.floor(totalSteps), MIN_TOTAL_STEPS);

const clampCurrentStep = (currentStep: number, totalSteps: number) =>
  Number.isNaN(currentStep) ? FIRST_STEP : Math.min(Math.max(Math.round(currentStep), FIRST_STEP), totalSteps);

const segmentState = (step: number, currentStep: number): SteppedProgressBarSegmentState => {
  if (step === currentStep) return SteppedProgressBarSegmentState.Current;
  return step < currentStep ? SteppedProgressBarSegmentState.Completed : SteppedProgressBarSegmentState.Upcoming;
};

type UseCustomSteppedProgressBarLogicParams = {
  totalSteps: number;
  currentStep: number;
  color: ProgressBarColor;
};

export const useCustomSteppedProgressBarLogic = ({
  totalSteps,
  currentStep,
  color,
}: UseCustomSteppedProgressBarLogicParams) => {
  const prefersReducedMotion = useReducedMotion();
  // Clamped before any per-segment work: the segment list is built from these two numbers, so an
  // out-of-range step has to be resolved here rather than filtered out of the rendered result.
  const stepCount = clampTotalSteps(totalSteps);
  const activeStep = clampCurrentStep(currentStep, stepCount);
  const palette = progressBarPalette(color);

  const segments: SteppedProgressBarSegment[] = Array.from({ length: stepCount }, (_, index) => {
    const step = index + FIRST_STEP;
    return { step, state: segmentState(step, activeStep) };
  });

  return {
    derived: {
      segments,
      // The upcoming grey is the same neutral for every colour, per the design note: it is what the
      // completed and current shades read against.
      segmentColors: {
        [SteppedProgressBarSegmentState.Completed]: palette.fill,
        [SteppedProgressBarSegmentState.Current]: palette.emphasis,
        [SteppedProgressBarSegmentState.Upcoming]: colors.secondaryGrey,
      } satisfies SteppedProgressBarColors,
      segmentTransition: progressBarTransition(
        ['flexGrow', 'height', 'borderRadius', 'backgroundColor'],
        prefersReducedMotion,
      ),
      accessibilityValue: { min: FIRST_STEP, max: stepCount, now: activeStep },
    },
  };
};
