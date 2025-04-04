import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.Triple,
    padding: spacing.Double,
    backgroundColor: colors.primaryPink,
    fontSize: spacing.Triple,
    fontFamily: fonts.interBold,
    borderRadius: spacing.Fourfold,
    width: spacing.separator80,
    textAlign: 'center',
  },
  separator: {
    height: spacing.TripleAndHalf,
  },
  container: {
    alignItems: 'flex-end',
  },
});
