import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.TripleAndHalf,
    paddingHorizontal: spacing.Fourfold,
  },
  title: {
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interRegular,
  },
  button: {
    backgroundColor: 'transparent',
    width: 'auto',
  },
  buttonText: {
    fontSize: spacing.Double,
    fontFamily: fonts.interBold,
    color: colors.primaryBlack,
  },
});
