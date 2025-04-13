import { StyleSheet } from 'react-native';

import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryWhite,
    borderTopLeftRadius: spacing.Triple,
    borderTopRightRadius: spacing.Triple,
  },
});
