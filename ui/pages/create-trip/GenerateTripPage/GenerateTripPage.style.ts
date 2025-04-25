import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  animation: {
    flex: 1,
    width: '100%',
    height: spacing.tripAnimationHeight,
    paddingHorizontal: spacing.Fourfold,
  },
  subtitle: {
    marginVertical: spacing.Fourfold,
    fontSize: spacing.Triple,
    fontFamily: fonts.interMedium,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.Fourfold,
  },
  title: {
    fontSize: spacing.Quintuple,
    fontFamily: fonts.interBold,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.Fourfold,
  },
});
