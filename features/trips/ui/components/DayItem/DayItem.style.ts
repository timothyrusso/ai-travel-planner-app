import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/features/core/design-system';

export const styles = StyleSheet.create({
  separator: {
    height: spacing.separator40,
    width: spacing.MinimalDouble,
    backgroundColor: colors.purple500,
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    paddingHorizontal: spacing.Fourfold,
    zIndex: 2,
  },
  list: {
    width: '100%',
    flex: 1,
  },
});
