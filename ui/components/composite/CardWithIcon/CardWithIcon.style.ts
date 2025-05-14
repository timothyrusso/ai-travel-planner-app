import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { opacity } from '@/ui/constants/style/opacity';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.secondaryGrey,
    borderRadius: spacing.Double,
    height: spacing.CardWithIconHeight,
    alignItems: 'center',
    paddingHorizontal: spacing.Double,
  },
  textContainer: {
    flex: 1,
    width: '100%',
  },
  icon: {
    fontSize: spacing.separator40,
    alignItems: 'center',
  },
  title: {
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interBold,
  },
  description: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interMedium,
  },
  pressed: {
    opacity: opacity.default,
  },
  selected: {
    borderWidth: spacing.Minimal,
  },
});
