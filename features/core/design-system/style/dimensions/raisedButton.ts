import { components } from '@/features/core/design-system/style/dimensions/components';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

/**
 * Per-size geometry of the raised 3D button, component-scoped on purpose: the raise depths 3/5/9,
 * the 7px radius and the 11/13 label sizes are one-off values only this button asks for, and adding
 * them to the shared `spacing`/`fontSize` ladders would offer every other component a step it must
 * never use. Every value the shared scales already carry is reused from them rather than repeated.
 */
export const raisedButtonSizes = {
  small: {
    height: components.buttonSmallHeight,
    raiseLevel: 3,
    radius: spacing.Single,
    fontSize: 11,
    iconSize: spacing.Double,
  },
  medium: {
    height: components.buttonMediumHeight,
    raiseLevel: 5,
    radius: 7,
    fontSize: 13,
    iconSize: spacing.Triple,
  },
  large: {
    height: components.buttonLargeHeight,
    raiseLevel: spacing.Single,
    radius: spacing.SingleAndHalf,
    fontSize: fontSize.MD,
    iconSize: spacing.Triple,
  },
  extraLarge: {
    height: components.buttonExtraLargeHeight,
    raiseLevel: 9,
    radius: spacing.SingleAndHalf,
    fontSize: fontSize.MD,
    iconSize: spacing.Triple,
  },
} as const;

export type RaisedButtonSize = (typeof raisedButtonSizes)[keyof typeof raisedButtonSizes];
