import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.Fourfold,
    paddingTop: spacing.Fourfold,
    backgroundColor: colors.secondaryGrey,
    marginBottom: spacing.Double,
    paddingBottom: spacing.Triple,
    rowGap: spacing.Triple,
  },
  location: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interBold,
    color: colors.primaryBlack,
  },
  ratingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.Single,
    backgroundColor: colors.primary,
    paddingVertical: spacing.MinimalDouble,
    paddingHorizontal: spacing.Single,
    borderRadius: spacing.Double,
  },
  ratingText: {
    fontSize: spacing.Triple,
    color: colors.primaryWhite,
  },
  ratingContainer: {
    alignItems: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingIcon: {
    marginBottom: spacing.Minimal,
  },
  bestTimeToVisitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.Single,
  },
  bestTimeToVisitTitle: {
    fontSize: spacing.Double + spacing.Minimal,
    fontFamily: fonts.interBold,
  },
  bestTimeToVisitValue: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
  },
  ticketPricingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.Single,
  },
  ticketPricingValue: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
  },
  ticketPricingTitle: {
    fontSize: spacing.Double + spacing.Minimal,
    fontFamily: fonts.interBold,
  },
  priceAlert: {
    fontSize: spacing.SingleAndHalf + spacing.Minimal,
    fontFamily: fonts.interRegular,
  },
  priceAlertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.Minimal,
    paddingRight: spacing.Fourfold,
  },
});
