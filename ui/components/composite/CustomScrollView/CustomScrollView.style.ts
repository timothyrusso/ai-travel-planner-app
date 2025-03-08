import { StyleSheet } from 'react-native';

import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';

export const styles = StyleSheet.create({
  childrenContainer: {
    marginBottom: spacing.Fourfold,
  },
  basicView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryWhite,
  },
  basicScrollView: {
    width: '100%',
    flex: 1,
    backgroundColor: colors.primaryWhite,
    padding: spacing.Fourfold,
    paddingBottom: spacing.Fourfold,
  },
});
