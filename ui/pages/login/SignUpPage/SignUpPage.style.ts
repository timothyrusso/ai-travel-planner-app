import { PlatformOS } from '@/ui/constants/PlatformOS';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.interBold,
    fontSize: spacing.Fourfold,
  },
  emailContainer: {
    paddingTop: spacing.Triple,
  },
  passwordContainer: {
    paddingVertical: spacing.Triple,
    rowGap: spacing.Triple,
  },
  label: {
    marginBottom: spacing.Single,
  },
  inputContainer: {
    ...(Platform.OS === PlatformOS.ios && { paddingTop: spacing.Triple }),
    width: '100%',
    paddingHorizontal: spacing.Fourfold,
  },
  buttonContainer: {
    paddingTop: spacing.separator40,
    width: '100%',
    paddingHorizontal: spacing.Fourfold,
    paddingBottom: spacing.Fourfold,
  },
  subtitle: {
    fontFamily: fonts.interRegular,
    fontSize: spacing.Triple,
    paddingHorizontal: spacing.Fourfold,
    alignSelf: 'flex-start',
    ...(Platform.OS === PlatformOS.ios && { marginTop: spacing.Double }),
  },
  container: {
    width: '100%',
  },
});
