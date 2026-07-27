import { StyleSheet } from 'react-native';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';
import { opacity } from '@/features/core/design-system/style/opacity';

export const styles = StyleSheet.create({
  main: {
    paddingTop: spacing.Double,
  },
  pressed: {
    opacity: opacity.opacity60,
  },
});
