import { StyleSheet } from 'react-native';
import { colors } from '@/features/core/design-system/style/colors';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';

export const style = (headerPaddingTop: number) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: headerPaddingTop,
      backgroundColor: colors.primaryWhite,
      paddingBottom: spacing.TripleAndHalf,
    },
    title: {
      fontSize: fontSize.XL2,
      fontFamily: fontFamily.interBold,
      textAlign: 'center',
      width: '100%',
    },
    icon: {
      position: 'absolute',
      left: spacing.Fourfold,
      top: headerPaddingTop,
      zIndex: 1,
    },
  });
