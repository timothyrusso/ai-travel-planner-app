import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

/**
 * Component-scoped on purpose: these stroke widths are values only the spinner asks for, and adding
 * them to the shared `spacing` ladder would offer every other component a step it must never use.
 */
export const spinnerSizes = {
  small: {
    box: spacing.TripleAndHalf,
    strokeWidth: 2.5,
  },
  medium: {
    box: 36,
    strokeWidth: 3.5,
  },
  large: {
    box: spacing.Sextuple,
    strokeWidth: 4.5,
  },
} as const;

export type SpinnerSizeName = keyof typeof spinnerSizes;

export type SpinnerSize = (typeof spinnerSizes)[SpinnerSizeName];
