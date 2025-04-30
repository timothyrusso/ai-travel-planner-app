import { PlatformOS } from '@/ui/constants/PlatformOS';
import { colors } from '@/ui/constants/style/colors';
import { images } from '@/ui/constants/style/dimensions/images';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    marginVertical: spacing.Triple,
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interBold,
    paddingHorizontal: spacing.Fourfold,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
    paddingHorizontal: spacing.Fourfold,
    color: colors.primaryGrey,
    textAlign: 'center',
  },
  basicViewContainer: {
    padding: 0,
    position: 'relative',
  },
  dayPlans: {
    paddingBottom:
      Platform.OS === PlatformOS.ios ? spacing.FourfoldAndHalf : images.fullScreenImageHeight + spacing.FourfoldAndHalf,
  },
  separator: {
    height: spacing.Triple,
  },
  sectionTitle: {
    marginVertical: spacing.Triple,
    padding: spacing.Double,
    backgroundColor: colors.primaryPink,
    fontSize: spacing.Triple,
    fontFamily: fonts.interBold,
    borderRadius: spacing.Fourfold,
    width: spacing.separator80,
    textAlign: 'center',
    alignSelf: 'center',
  },
  sectionList: {
    paddingTop: images.fullScreenImageHeight,
    backgroundColor: colors.primaryWhite,
    zIndex: 2,
    borderRadius: spacing.Triple,
    marginTop: spacing.Fourfold,
    flex: 1,
  },
});
