import { colors } from '@/ui/constants/style/colors';
import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopEndRadius: spacing.Fourfold,
    borderTopStartRadius: spacing.Fourfold,
    backgroundColor: colors.primaryWhite,
    marginTop: -spacing.Fourfold,
  },
  title: {
    marginVertical: spacing.Triple,
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interBold,
    paddingHorizontal: spacing.Fourfold,
    paddingTop: spacing.separator80 + spacing.separator40,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
    paddingHorizontal: spacing.Fourfold,
    color: colors.primaryGrey,
  },
  image: {
    height: components.tripDetailImageHeight,
    borderBottomLeftRadius: spacing.Fourfold,
    borderBottomRightRadius: spacing.Fourfold,
  },
  basicViewContainer: {
    padding: 0,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    zIndex: spacing.Minimal,
    right: spacing.Quintuple,
    top: spacing.TripleAndHalf + spacing.separator40,
    backgroundColor: colors.primaryWhite,
    borderRadius: spacing.radius,
  },
  people: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
    color: colors.primaryGrey,
    marginLeft: spacing.Single,
    marginTop: spacing.Double,
  },
  dayPlans: {
    paddingTop: spacing.Triple,
    flex: 1,
  },
  separator: {
    height: spacing.Triple,
  },
});
