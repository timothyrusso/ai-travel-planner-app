import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: dimensions.Quintuple,
    fontFamily: fonts.interBold,
  },
});
