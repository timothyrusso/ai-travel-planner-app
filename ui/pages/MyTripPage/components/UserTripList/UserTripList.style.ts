import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  separator: {
    height: spacing.TripleAndHalf,
  },
  contentContainer: {
    paddingBottom: spacing.Triple,
    flexGrow: 1,
  },
  container: {
    width: '100%',
    flex: 1,
  },
  itemContainer: {
    paddingHorizontal: spacing.Fourfold,
  },
});
