import { colors } from '@/ui/constants/style/colors';
import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: spacing.TripleAndHalf,
    width: '100%',
    rowGap: spacing.Double,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: components.tripImageHeight,
    borderTopRightRadius: spacing.Triple,
    borderTopLeftRadius: spacing.Triple,
    objectFit: 'cover',
    zIndex: 1,
  },
  location: {
    fontSize: spacing.TripleAndHalf,
    fontFamily: fonts.interRegular,
    width: '100%',
  },
  days: {
    fontSize: spacing.Double,
    fontFamily: fonts.interBold,
    backgroundColor: colors.primaryWhite,
    padding: spacing.SingleAndHalf,
    borderRadius: spacing.Triple,
  },
  budget: {
    fontSize: spacing.Double,
    fontFamily: fonts.interBold,
    backgroundColor: colors.primaryWhite,
    padding: spacing.SingleAndHalf,
    borderRadius: spacing.Triple,
  },
  travelers: {
    fontSize: spacing.Double,
    fontFamily: fonts.interBold,
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
    zIndex: 2,
    backgroundColor: colors.primaryBlue,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: spacing.Double,
    justifyContent: 'flex-end',
  },
});
