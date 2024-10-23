import { dimensions } from '@/constants/dimensions';
import { fonts } from '@/constants/fonts';
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
