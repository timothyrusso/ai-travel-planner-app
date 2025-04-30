import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { shadows } from '@/ui/constants/style/shadows';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    width: spacing.separator40 + spacing.Single,
    height: spacing.separator40 + spacing.Single,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.separator40 + spacing.Single,
    boxShadow: shadows.mediumShadow,
    backgroundColor: colors.primary,
  },
  focusedText: {
    color: colors.primary,
    fontSize: spacing.Double,
    fontFamily: fonts.interMedium,
  },
  focusedIcon: {
    color: colors.primary,
  },
  pressed: {
    opacity: 0.5,
  },
});
