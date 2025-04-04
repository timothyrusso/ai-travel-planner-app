import { colors } from '@/ui/constants/style/colors';
import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: components.activityImageHeight,
    borderTopStartRadius: spacing.Triple,
    borderTopEndRadius: spacing.Triple,
    borderRadius: spacing.Triple,
  },
  container: {
    backgroundColor: colors.primaryYellow,
    borderRadius: spacing.Triple,
  },
  content: {
    padding: spacing.Triple,
    rowGap: spacing.Double,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryWhite,
  },
  noImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryWhite,
  },
  time: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interRegular,
  },
  place: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interBold,
  },
  description: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interMedium,
  },
  price: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interBold,
  },
});
