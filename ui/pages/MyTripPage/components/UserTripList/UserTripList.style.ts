import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: spacing.TripleAndHalf,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.TripleAndHalf,
  },
  title: {
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interRegular,
  },
  button: { backgroundColor: 'transparent', width: 'auto' },
  buttonText: {
    fontSize: spacing.Double,
    fontFamily: fonts.interBold,
    color: colors.primaryBlack,
  },
  contentContainer: {
    marginTop: spacing.Quintuple,
  },
});
