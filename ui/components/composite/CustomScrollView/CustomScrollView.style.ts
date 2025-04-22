import { StyleSheet } from 'react-native';

import { spacing } from '@/ui/constants/style/dimensions/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  childrenContainer: {
    marginBottom: spacing.Fourfold,
  },
  basicView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  basicScrollView: {
    width: '100%',
    flex: 1,
  },
  basicContentStyle: {
    flex: 1,
  },
});
