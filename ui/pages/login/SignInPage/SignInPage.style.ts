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
    paddingTop: spacing.Double,
  },
  passwordContainer: {
    paddingVertical: spacing.Double,
  },
  label: {
    marginBottom: spacing.Single,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: spacing.Fourfold,
    ...(Platform.OS === PlatformOS.ios && { paddingTop: spacing.Triple }),
  },
  buttonContainer: {
    paddingTop: spacing.separator40,
    rowGap: spacing.Triple,
    width: '100%',
    paddingHorizontal: spacing.Fourfold,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  resetPasswordButton: {
    fontFamily: fonts.interBold,
  },
});
