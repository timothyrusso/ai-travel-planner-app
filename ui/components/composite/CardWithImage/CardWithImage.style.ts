import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: spacing.CardWithIconHeight,
    alignItems: 'center',
    paddingHorizontal: spacing.Double,
    columnGap: spacing.Fourfold,
    width: '100%',
  },
  textContainer: {
    flex: 1,
    rowGap: spacing.Double,
  },
  icon: {
    fontSize: spacing.separator40,
    alignItems: 'center',
  },
  title: {
    fontSize: spacing.Triple,
    fontFamily: fonts.interRegular,
    color: colors.primaryGrey,
  },
  description: {
    fontSize: spacing.Fourfold,
    fontFamily: fonts.interBold,
  },
  image: {
    width: '100%',
  },
});
