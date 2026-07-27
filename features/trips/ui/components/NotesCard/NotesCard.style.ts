import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/features/core/design-system';

export const styles = (isTitleInverted: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.secondaryGrey,
      borderRadius: spacing.Triple,
      padding: spacing.Double,
      marginHorizontal: spacing.Fourfold,
    },
    title: {
      fontFamily: fontFamily.interBold,
    },
    notes: {
      fontSize: fontSize.SM,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.SingleAndHalf,
      marginBottom: spacing.SingleAndHalf,
      justifyContent: isTitleInverted ? 'flex-end' : 'flex-start',
    },
  });
