import type { StyleProp, ViewStyle } from 'react-native';
import { useReducedMotion } from 'react-native-reanimated';

import {
  type ProgressBarColor,
  progressBarTransition,
} from '@/features/core/design-system/components/basic/CustomProgressBar/CustomProgressBar.logic';
import { colors } from '@/features/core/design-system/style/colors';
import { accentShades } from '@/features/core/design-system/style/paletteRoles';

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
  totalSteps: number;
  currentStep: number;
  color?: ProgressBarColor;
  style?: StyleProp<ViewStyle>;
};

const MIN_TOTAL_STEPS = 1;
const MAX_TOTAL_STEPS = 100;
const FIRST_STEP = 1;

const clampTotalSteps = (totalSteps: number) =>
  Number.isFinite(totalSteps)
    ? Math.min(Math.max(Math.floor(totalSteps), MIN_TOTAL_STEPS), MAX_TOTAL_STEPS)
    : MIN_TOTAL_STEPS;

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
  const stepCount = clampTotalSteps(totalSteps);
  const activeStep = clampCurrentStep(currentStep, stepCount);
  const palette = accentShades(color);

  const segments: SteppedProgressBarSegment[] = Array.from({ length: stepCount }, (_, index) => {
    const step = index + FIRST_STEP;
    return { step, state: segmentState(step, activeStep) };
  });

  return {
    derived: {
      segments,
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
