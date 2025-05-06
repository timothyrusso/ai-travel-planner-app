import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    paddingHorizontal: spacing.Triple,
    paddingVertical: spacing.separator40,
  },
  columnWrapper: {
    gap: spacing.Triple,
    paddingBottom: spacing.Triple,
  },
});
