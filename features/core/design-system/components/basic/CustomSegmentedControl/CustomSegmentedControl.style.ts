import { StyleSheet } from 'react-native';

import type { SegmentedControlColors } from '@/features/core/design-system/components/basic/CustomSegmentedControl/CustomSegmentedControl.logic';
import { colors } from '@/features/core/design-system/style/colors';
import type { SegmentedControlSize } from '@/features/core/design-system/style/dimensions/segmentedControl';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';
import { opacity } from '@/features/core/design-system/style/opacity';
import { shadows } from '@/features/core/design-system/style/shadows';

const FULL_WIDTH_PERCENT = 100;

type CustomSegmentedControlStyleParams = {
  size: SegmentedControlSize;
  segmentCount: number;
  controlColors: SegmentedControlColors;
  isDisabled: boolean;
};

export const customSegmentedControlStyles = ({
  size,
  segmentCount,
  controlColors,
  isDisabled,
}: CustomSegmentedControlStyleParams) =>
  StyleSheet.create({
    // The whole control fades when disabled: a segment nobody can pick is not a state of one
    // segment, it is a state of the choice.
    track: {
      width: '100%',
      height: size.trackHeight,
      padding: size.inset,
      borderRadius: size.radius,
      backgroundColor: colors.secondaryGrey,
      opacity: isDisabled ? opacity.opacity40 : opacity.opacity100,
    },
    inner: {
      flex: 1,
      flexDirection: 'row',
    },
    // Sized as a fraction of the measured inner row rather than in points, so the thumb keeps
    // covering exactly one segment at any container width.
    thumb: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: size.thumbHeight,
      width: `${FULL_WIDTH_PERCENT / segmentCount}%`,
      borderRadius: size.radius,
      backgroundColor: controlColors.thumbColor,
      boxShadow: shadows.lightShadow,
    },
    segment: {
      flex: 1,
    },
    segmentContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Title case at 12/14 rather than the DS button's uppercase 16: a segment label is a selector,
    // not a CTA.
    label: {
      flexShrink: 1,
      fontSize: size.fontSize,
      fontFamily: fontFamily.interBold,
      textAlign: 'center',
    },
    icon: {
      marginRight: spacing.Single,
    },
  });
