import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.MinimalDouble,
  },
  pressed: {
    opacity: 0.5,
  },
});
