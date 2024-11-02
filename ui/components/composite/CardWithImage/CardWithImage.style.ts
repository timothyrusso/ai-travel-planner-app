import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: dimensions.CardWithIconHeight,
    alignItems: 'center',
    paddingHorizontal: dimensions.Double,
    columnGap: dimensions.Fourfold,
  },
  textContainer: {
    flex: 1,
    rowGap: dimensions.Double,
  },
  icon: {
    fontSize: dimensions.separator40,
    alignItems: 'center',
  },
  title: {
    fontSize: dimensions.Triple,
    fontFamily: fonts.interRegular,
    color: colors.primaryGrey,
  },
  description: {
    fontSize: dimensions.Fourfold,
    fontFamily: fonts.interBold,
  },
  image: {
    width: '100%',
  },
});
