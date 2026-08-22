import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

/**
 * Per-size geometry of the spinner, component-scoped on purpose: the 36px box and the 2.5/3.5/4.5
 * stroke widths are one-off values only this component asks for, and adding them to the shared
 * `spacing` ladder would offer every other component a step it must never use. The stroke sits fully
 * inside the box (Figma `strokeAlign: CENTER`), so the arc radius is `(box - strokeWidth) / 2`.
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
