import { PlatformOS } from '@/ui/constants/PlatformOS';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === PlatformOS.ios ? spacing.separator80 : 0,
    width: '100%',
  },
  animation: {
    width: '100%',
    height: spacing.travelAnimationHeight,
  },
  button: {
    alignSelf: 'center',
    width: spacing.customButtonWidth,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    rowGap: spacing.Fourfold,
    flex: 1,
  },
  title: {
    fontFamily: fonts.interMedium,
    fontSize: spacing.Triple,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: spacing.Triple,
  },
});
