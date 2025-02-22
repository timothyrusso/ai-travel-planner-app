import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: dimensions.Triple,
  },
  title: {
    fontFamily: fonts.interMedium,
    fontSize: dimensions.Fourfold,
  },
  button: {
    width: '60%',
  },
});
