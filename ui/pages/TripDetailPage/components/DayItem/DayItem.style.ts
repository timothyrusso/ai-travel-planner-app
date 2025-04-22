import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  separator: {
    height: spacing.TripleAndHalf,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    paddingHorizontal: spacing.Fourfold,
  },
  list: {
    flex: 1,
    width: '100%',
  },
});
