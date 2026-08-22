import { components } from '@/features/core/design-system/style/dimensions/components';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

/**
 * Per-size geometry of the chip, component-scoped on purpose: the letter-spacings 0.72/0.8/0.96 are
 * one-off values only this chip asks for, and adding them to a shared ladder would offer every other
 * component a step it must never use. The radius is derived from the rule `radius = height / 2`, so
 * a chip is a full pill by construction rather than by a literal that can drift from its height, and
 * every other value comes from the shared `components`/`spacing`/`fontSize` scales.
 */
export const chipSizes = {
  small: {
    height: components.chipSmallHeight,
    radius: components.chipSmallHeight / 2,
    paddingHorizontal: spacing.Double,
    iconSize: spacing.Double,
    gap: spacing.MinimalDouble,
    fontSize: fontSize.XXS,
    letterSpacing: 0.72,
  },
  medium: {
    height: components.chipMediumHeight,
    radius: components.chipMediumHeight / 2,
    paddingHorizontal: spacing.Triple,
    iconSize: spacing.Triple,
    gap: spacing.Single,
    fontSize: fontSize.XS,
    letterSpacing: 0.8,
  },
  large: {
    height: components.chipLargeHeight,
    radius: components.chipLargeHeight / 2,
    paddingHorizontal: spacing.Fourfold,
    iconSize: spacing.TripleAndHalf,
    gap: spacing.SingleAndHalf,
    fontSize: fontSize.SM,
    letterSpacing: 0.96,
  },
} as const;

export type ChipSizeName = keyof typeof chipSizes;

export type ChipSize = (typeof chipSizes)[ChipSizeName];
