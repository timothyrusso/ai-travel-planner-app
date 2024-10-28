import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.secondaryGrey,
    borderRadius: dimensions.Double,
    height: dimensions.travelersCardHeight,
    alignItems: 'center',
    paddingHorizontal: dimensions.Double,
  },
  textContainer: {
    flex: 1,
  },
  icon: {
    fontSize: dimensions.separator40,
    alignItems: 'center',
  },
  title: {
    fontSize: dimensions.Fourfold,
    fontFamily: fonts.arimaBold,
  },
  description: {
    fontSize: dimensions.Triple,
    fontFamily: fonts.arimaMedium,
  },
  pressed: {
    opacity: 0.6,
  },
  selected: {
    borderWidth: dimensions.Minimal,
  },
});
