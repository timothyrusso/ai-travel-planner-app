import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    zIndex: spacing.Minimal,
    left: spacing.Quintuple,
    top: spacing.TripleAndHalf + spacing.separator40,
    backgroundColor: colors.primaryWhite,
    borderRadius: spacing.radius,
  },
  favoriteIcon: {
    position: 'absolute',
    zIndex: spacing.Minimal,
    right: spacing.Quintuple,
    top: spacing.TripleAndHalf + spacing.separator40,
    backgroundColor: colors.primaryWhite,
    borderRadius: spacing.radius,
  },
  removeIcon: {
    position: 'absolute',
    zIndex: spacing.Minimal,
    right: spacing.Quintuple + spacing.Sextuple,
    top: spacing.TripleAndHalf + spacing.separator40,
    backgroundColor: colors.primaryWhite,
    borderRadius: spacing.radius,
  },
});
