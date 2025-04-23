import { colors } from '@/ui/constants/style/colors';
import { components } from '@/ui/constants/style/dimensions/components';
import { labels } from '@/ui/constants/style/dimensions/labels';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.Fourfold,
    width: '100%',
    rowGap: spacing.Double,
    position: 'relative',
    borderWidth: spacing.SingleAndHalf,
    borderColor: colors.primaryBlue,
  },
  image: {
    width: '100%',
    height: components.tripImageHeight,
    borderRadius: spacing.Triple,
    objectFit: 'cover',
    zIndex: spacing.HalfMinimal,
  },
  location: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interMedium,
    width: labels.myTripPageLocations,
    position: 'absolute',
    bottom: spacing.Zero,
    zIndex: spacing.Minimal,
    backgroundColor: colors.primaryBlue,
    paddingVertical: spacing.Single,
    borderTopRightRadius: spacing.Triple,
    textAlign: 'center',
  },
  days: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
    backgroundColor: colors.primaryWhite,
    padding: spacing.SingleAndHalf,
    borderRadius: spacing.Triple,
  },
  budget: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
    backgroundColor: colors.primaryWhite,
    padding: spacing.SingleAndHalf,
    borderRadius: spacing.Triple,
  },
  travelers: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
    backgroundColor: colors.primaryWhite,
    padding: spacing.SingleAndHalf,
    borderRadius: spacing.Triple,
  },
  button: { opacity: 0.5 },
  contentContainer: {
    padding: spacing.Triple,
    borderRadius: spacing.Triple,
    rowGap: spacing.Triple,
    marginTop: -spacing.Fourfold,
    zIndex: spacing.Minimal,
    backgroundColor: colors.primaryBlue,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: spacing.Double,
    justifyContent: 'flex-end',
    position: 'absolute',
    top: spacing.Double,
    right: spacing.Triple,
    zIndex: spacing.Minimal,
  },
});
