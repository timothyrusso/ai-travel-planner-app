import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  subtitle: {
    marginVertical: spacing.Fourfold,
    fontSize: spacing.Triple,
    fontFamily: fonts.interMedium,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.Fourfold,
  },
  separator: {
    height: spacing.TripleAndHalf,
  },
  list: {
    paddingHorizontal: spacing.Fourfold,
    width: '100%',
    paddingTop: spacing.Double,
  },
});
