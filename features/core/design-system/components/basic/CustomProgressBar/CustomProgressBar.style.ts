import { type DimensionValue, StyleSheet } from 'react-native';

import { colors } from '@/features/core/design-system/style/colors';
import type { ProgressBarSize } from '@/features/core/design-system/style/dimensions/progressBar';

const FILL_PARENT = '100%';

type CustomProgressBarStyleParams = {
  size: ProgressBarSize;
  fillColor: string;
  fillWidth: DimensionValue;
};

export const customProgressBarStyles = ({ size, fillColor, fillWidth }: CustomProgressBarStyleParams) =>
  StyleSheet.create({
    track: {
      width: FILL_PARENT,
      height: size.height,
      borderRadius: size.radius,
      backgroundColor: colors.secondaryGrey,
    },
    fill: {
      width: fillWidth,
      height: FILL_PARENT,
      borderRadius: size.radius,
      backgroundColor: fillColor,
    },
  });
