import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { shadows } from '@/ui/constants/style/shadows';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.Double,
    boxShadow: shadows.defaultShadow,
    borderRadius: spacing.Double,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: spacing.Double,
  },
  title: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interBold,
    paddingTop: spacing.Double,
  },
  pressed: {
    opacity: 0.5,
  },
  iconContainer: {
    position: 'absolute',
    top: spacing.TripleAndHalf,
    right: spacing.TripleAndHalf,
    backgroundColor: colors.primaryBlack,
    borderRadius: spacing.Quintuple,
    width: spacing.Quintuple,
    height: spacing.Quintuple,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
  },
});
