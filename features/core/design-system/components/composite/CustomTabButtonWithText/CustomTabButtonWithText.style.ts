import { StyleSheet } from 'react-native';
import { colors } from '@/features/core/design-system/style/colors';
import { fontSize } from '@/features/core/design-system/style/dimensions/fontSize';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { fontFamily } from '@/features/core/design-system/style/fontFamily';

export const styles = StyleSheet.create({
  button: {
    width: spacing.separator40 + spacing.Triple,
    height: spacing.separator40 + spacing.Triple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.separator40 + spacing.Triple,
  },
  focusedText: {
    color: colors.primary,
    fontSize: fontSize.SM,
    fontFamily: fontFamily.interMedium,
  },
  focusedIcon: {
    color: colors.primary,
  },
  text: {
    color: colors.primaryGrey,
    fontSize: fontSize.SM,
    marginTop: spacing.Single,
    fontFamily: fontFamily.interRegular,
  },
});
