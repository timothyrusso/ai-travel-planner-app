import { StyleSheet } from 'react-native';

import { colors } from '@/features/core/design-system/style/colors';
import { components } from '@/features/core/design-system/style/dimensions/components';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';

type BlurButtonStyleParams = {
  tintOpacity: number;
  contentColor: string;
  height?: number;
};

export const styleBlurButton = ({
  tintOpacity,
  contentColor,
  height = components.buttonLargeHeight,
}: BlurButtonStyleParams) => {
  return StyleSheet.create({
    button: {
      width: '100%',
      height,
      // The same radius the flat pill uses: at every button height it clamps to a full pill.
      borderRadius: spacing.FourfoldAndHalf,
      overflow: 'hidden',
    },
    surface: {
      flex: 1,
      width: '100%',
    },
    mask: {
      flex: 1,
      borderRadius: spacing.FourfoldAndHalf,
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      flexShrink: 1,
      color: contentColor,
      fontFamily: fontFamily.interBold,
      fontSize: fontSize.LG,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    leftIcon: {
      marginRight: spacing.Single,
    },
    rightIcon: {
      marginLeft: spacing.Single,
    },
  });
};
