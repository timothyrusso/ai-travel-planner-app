import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

const SMALL_CURRENT_SEGMENT_HEIGHT = 18;
const MEDIUM_CURRENT_SEGMENT_HEIGHT = 22;
const SEGMENT_WIDTH_RATIO = 1;
const CURRENT_SEGMENT_WIDTH_RATIO = 1.25;
const HEIGHT_TO_RADIUS = 2;

const pillRadius = (height: number) => height / HEIGHT_TO_RADIUS;

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
