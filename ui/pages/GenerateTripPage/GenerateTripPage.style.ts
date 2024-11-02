import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  animation: {
    flex: 1,
    width: '100%',
    height: dimensions.tripAnimationHeight,
  },
  subtitle: {
    marginVertical: dimensions.Fourfold,
    fontSize: dimensions.Fourfold,
    fontFamily: fonts.interMedium,
  },
  title: {
    fontSize: dimensions.Quintuple,
    fontFamily: fonts.interBold,
  },
});
