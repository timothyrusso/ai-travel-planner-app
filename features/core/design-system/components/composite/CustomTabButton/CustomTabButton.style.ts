import { StyleSheet } from 'react-native';
import { colors } from '@/features/core/design-system/style/colors';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';
import { opacity } from '@/features/core/design-system/style/opacity';
import { shadows } from '@/features/core/design-system/style/shadows';

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
    fontSize: fontSize.SM,
    fontFamily: fontFamily.interMedium,
  },
  focusedIcon: {
    color: colors.primary,
  },
  pressed: {
    opacity: opacity.opacity60,
  },
});
