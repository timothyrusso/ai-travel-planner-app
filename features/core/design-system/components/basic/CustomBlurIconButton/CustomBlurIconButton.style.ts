import { StyleSheet } from 'react-native';

import { colors } from '@/features/core/design-system/style/colors';
import { components } from '@/features/core/design-system/style/dimensions/components';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

type BlurIconButtonStyleParams = {
  tintOpacity: number;
  size?: number;
};

export const styleBlurIconButton = ({
  tintOpacity,
  size = components.buttonLargeHeight,
}: BlurIconButtonStyleParams) => {
  return StyleSheet.create({
    button: {
      width: size,
      height: size,
      borderRadius: spacing.separator80,
      overflow: 'hidden',
    },
    surface: {
      flex: 1,
      width: '100%',
    },
    mask: {
      flex: 1,
      borderRadius: spacing.separator80,
      backgroundColor: colors.primaryBlack,
    },
    tint: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors.primaryBlack,
      opacity: tintOpacity,
    },
    innerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
