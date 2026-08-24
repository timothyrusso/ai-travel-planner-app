import { StyleSheet } from 'react-native';

import type { SteppedProgressBarColors } from '@/features/core/design-system/components/basic/CustomSteppedProgressBar/CustomSteppedProgressBar.logic';
import type { SteppedProgressBarSize } from '@/features/core/design-system/style/dimensions/progressBar';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

const FILL_PARENT = '100%';

type CustomSteppedProgressBarStyleParams = {
  size: SteppedProgressBarSize;
  segmentColors: SteppedProgressBarColors;
};

export const customSteppedProgressBarStyles = ({ size, segmentColors }: CustomSteppedProgressBarStyleParams) =>
  StyleSheet.create({
    // As tall as the emphasized segment and centred, so reaching a step grows that segment about the
    // bar's centre line instead of shifting the row.
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      width: FILL_PARENT,
      height: size.currentSegmentHeight,
      gap: size.gap,
    },
    // Flex ratios rather than measured widths: the segments divide whatever width the container gives
    // them in the 1 : 1.25 ratio the design draws, at any step count, without a layout pass.
    segment: {
      flexBasis: spacing.Zero,
      flexGrow: size.segmentWidthRatio,
      height: size.segmentHeight,
      borderRadius: size.segmentRadius,
    },
    completed: {
      backgroundColor: segmentColors.completed,
    },
    current: {
      flexGrow: size.currentSegmentWidthRatio,
      height: size.currentSegmentHeight,
      borderRadius: size.currentSegmentRadius,
      backgroundColor: segmentColors.current,
    },
    upcoming: {
      backgroundColor: segmentColors.upcoming,
    },
  });
