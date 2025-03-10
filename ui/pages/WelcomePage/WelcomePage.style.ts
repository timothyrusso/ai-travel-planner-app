import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.separator80,
  },
  animation: {
    width: '100%',
    height: spacing.travelAnimationHeight,
  },
  logo: {
    width: spacing.mainLogoSize,
    height: spacing.mainLogoSize,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    width: spacing.customButtonWidth,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: spacing.separator40,
    rowGap: spacing.Fourfold,
  },
  title: {
    fontFamily: fonts.interMedium,
    fontSize: spacing.Triple,
    marginTop: spacing.Double,
    textAlign: 'center',
    paddingHorizontal: spacing.separator80,
  },
});
