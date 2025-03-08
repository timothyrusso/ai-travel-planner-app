import { colors } from '@/ui/constants/style/colors';
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
    fontSize: spacing.Triple,
    fontFamily: fonts.interMedium,
    paddingHorizontal: spacing.Fourfold,
  },
  subTitle: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
    paddingHorizontal: spacing.Fourfold,
    color: colors.primaryGrey,
  },
  image: {
    height: 300,
  },
  basicViewContainer: {
    padding: 0,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    zIndex: 2,
    right: 30,
    top: 60,
    backgroundColor: colors.secondaryGrey,
    borderRadius: spacing.radius,
  },
  iconAndText: {
    paddingHorizontal: spacing.Fourfold,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.Double,
  },
  people: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
    color: colors.primaryGrey,
    marginLeft: spacing.Single,
  },
});
