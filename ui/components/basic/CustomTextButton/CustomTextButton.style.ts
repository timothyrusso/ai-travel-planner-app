import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { opacity } from '@/ui/constants/style/opacity';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    paddingTop: spacing.Double,
  },
  pressed: {
    opacity: opacity.default,
  },
});
