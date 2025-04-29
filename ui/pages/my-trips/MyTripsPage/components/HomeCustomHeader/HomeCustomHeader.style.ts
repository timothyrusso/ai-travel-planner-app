import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = (top: number) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      top: top,
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      zIndex: 2,
    },
    createTripContainer: {
      padding: spacing.Double,
      borderRadius: spacing.Fourfold,
      overflow: 'hidden',
      left: spacing.Fourfold,
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.Single,
    },
    showAllTripsContainer: {
      padding: spacing.Double,
      borderRadius: spacing.Fourfold,
      overflow: 'hidden',
      right: spacing.Fourfold,
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.Single,
    },
    createTripText: {
      color: colors.primaryWhite,
      fontFamily: fonts.interBold,
      fontSize: spacing.Double,
    },
    showAllTripsText: {
      color: colors.primaryWhite,
      fontFamily: fonts.interBold,
      fontSize: spacing.Double,
    },
    pressed: {
      opacity: 0.5,
    },
  });
