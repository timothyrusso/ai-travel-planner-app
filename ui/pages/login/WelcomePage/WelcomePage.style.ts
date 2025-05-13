import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    rowGap: spacing.Quintuple,
  },
  animation: {
    width: '100%',
    height: spacing.travelAnimationHeight,
  },
  button: {
    alignSelf: 'center',
    width: spacing.customButtonWidth,
  },
  title: {
    fontFamily: fonts.interMedium,
    fontSize: spacing.Triple,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: spacing.Quintuple,
  },
});
