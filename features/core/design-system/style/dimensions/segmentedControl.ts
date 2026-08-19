import { components } from '@/features/core/design-system/style/dimensions/components';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

const THUMB_INSET = spacing.MinimalDouble;

/**
 * Per-size geometry of the segmented control, component-scoped on purpose: the track heights are
 * derived from the rule `trackHeight = thumbHeight + 2 × inset`, and the resulting 38 is a one-off
 * only this control asks for — adding it to the shared `spacing` ladder would offer every other
 * component a step it must never use. The thumb reuses the DS button heights so a segment reads at
 * the same size as a button, and every other value comes from the shared scales.
 */
export const segmentedControlSizes = {
  small: {
    trackHeight: components.buttonSmallHeight + THUMB_INSET * 2,
    thumbHeight: components.buttonSmallHeight,
    inset: THUMB_INSET,
    radius: spacing.FourfoldAndHalf,
    fontSize: fontSize.SM,
    iconSize: spacing.Triple,
  },
  medium: {
    trackHeight: components.buttonMediumHeight + THUMB_INSET * 2,
    thumbHeight: components.buttonMediumHeight,
    inset: THUMB_INSET,
    radius: spacing.FourfoldAndHalf,
    fontSize: fontSize.MD,
    iconSize: spacing.TripleAndHalf,
  },
} as const;

export type SegmentedControlSize = (typeof segmentedControlSizes)[keyof typeof segmentedControlSizes];
