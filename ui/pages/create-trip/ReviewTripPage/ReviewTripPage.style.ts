import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  subtitle: {
    marginVertical: spacing.Fourfold,
    fontSize: spacing.Triple,
    fontFamily: fonts.interMedium,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.Fourfold,
  },
  container: {
    justifyContent: 'flex-start',
  },
  animation: {
    width: '100%',
    height: components.reviewPageAnimationHeight,
    marginTop: spacing.Quintuple,
  },
  summaryContainer: {
    width: '100%',
    paddingHorizontal: spacing.Fourfold,
  },
  contentScrollViewContainer: {
    flex: 1,
    width: '100%',
  },
});
