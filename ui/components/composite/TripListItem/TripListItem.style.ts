import { colors } from '@/ui/constants/style/colors';
import { components } from '@/ui/constants/style/dimensions/components';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
    padding: spacing.TripleAndHalf,
    borderRadius: spacing.TripleAndHalf,
    width: '100%',
    rowGap: spacing.Double,
  },
  image: {
    width: '100%',
    height: components.tripImageHeight,
    borderRadius: spacing.Triple,
    objectFit: 'cover',
  },
  location: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interBold,
    width: '80%',
  },
  days: {
    fontSize: spacing.Double,
    fontFamily: fonts.interBold,
  },
  budget: {
    fontSize: spacing.Double,
    fontFamily: fonts.interBold,
  },
  travelers: {
    fontSize: spacing.Double,
    fontFamily: fonts.interBold,
  },
});
