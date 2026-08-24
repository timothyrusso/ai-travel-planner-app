import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

const SMALL_CURRENT_SEGMENT_HEIGHT = 18;
const MEDIUM_CURRENT_SEGMENT_HEIGHT = 22;
const SEGMENT_WIDTH_RATIO = 1;
const CURRENT_SEGMENT_WIDTH_RATIO = 1.25;
const HEIGHT_TO_RADIUS = 2;

/** Every bar and every segment is a full pill: the design draws the radius as half the height. */
const pillRadius = (height: number) => height / HEIGHT_TO_RADIUS;

/**
 * Per-size geometry of the linear progress bar, component-scoped on purpose: the heights come from
 * the shared `spacing` ladder, and each radius is derived from its own height rather than tabulated
 * a second time — a radius that drifts from half its height would stop the bar reading as a pill.
 */
export const progressBarSizes = {
  small: {
    height: spacing.SingleAndHalf,
    radius: pillRadius(spacing.SingleAndHalf),
  },
  medium: {
    height: spacing.Double,
    radius: pillRadius(spacing.Double),
  },
} as const;

export type ProgressBarSize = (typeof progressBarSizes)[keyof typeof progressBarSizes];

/**
 * Per-size geometry of the stepped progress bar, component-scoped on purpose: the emphasized heights
 * 18/22 and the 1.25× emphasized width are one-off values only this bar asks for, and adding them to
 * the shared `spacing` ladder would offer every other component a step it must never use. The gap
 * scales with the segment height, which is what reproduces the width the design draws at each size.
 */
export const steppedProgressBarSizes = {
  small: {
    segmentHeight: spacing.Double,
    segmentRadius: pillRadius(spacing.Double),
    segmentWidthRatio: SEGMENT_WIDTH_RATIO,
    currentSegmentHeight: SMALL_CURRENT_SEGMENT_HEIGHT,
    currentSegmentRadius: pillRadius(SMALL_CURRENT_SEGMENT_HEIGHT),
    currentSegmentWidthRatio: CURRENT_SEGMENT_WIDTH_RATIO,
    gap: spacing.Single,
  },
  medium: {
    segmentHeight: spacing.Triple,
    segmentRadius: pillRadius(spacing.Triple),
    segmentWidthRatio: SEGMENT_WIDTH_RATIO,
    currentSegmentHeight: MEDIUM_CURRENT_SEGMENT_HEIGHT,
    currentSegmentRadius: pillRadius(MEDIUM_CURRENT_SEGMENT_HEIGHT),
    currentSegmentWidthRatio: CURRENT_SEGMENT_WIDTH_RATIO,
    gap: spacing.SingleAndHalf,
  },
} as const;

export type SteppedProgressBarSize = (typeof steppedProgressBarSizes)[keyof typeof steppedProgressBarSizes];
