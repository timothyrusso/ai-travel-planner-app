import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: spacing.Triple,
    borderWidth: spacing.MinimalDouble - spacing.HalfMinimal,
    borderColor: colors.primary,
    borderRadius: spacing.Double,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: spacing.separator80,
  },
  pressed: {
    opacity: 0.5,
  },
  language: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interMedium,
  },
  skeleton: {
    width: '100%',
    borderRadius: spacing.Double,
    height: spacing.separator80,
  },
});
