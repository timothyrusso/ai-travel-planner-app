import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.interBold,
    fontSize: dimensions.Fourfold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    marginTop: dimensions.separator40,
    rowGap: dimensions.Triple,
  },
  description: {
    fontFamily: fonts.interMedium,
    fontSize: dimensions.Triple,
  },
  Animation: {
    width: '100%',
    height: dimensions.travelAnimationHeight,
    marginTop: dimensions.separator80 + dimensions.separator80,
  },
});
