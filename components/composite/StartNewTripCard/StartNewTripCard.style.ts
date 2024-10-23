import { colors } from '@/constants/colors';
import { dimensions } from '@/constants/dimensions';
import { fonts } from '@/constants/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: dimensions.Triple,
  },
  title: {
    fontFamily: fonts.interBold,
    fontSize: dimensions.Fourfold,
  },
  subtitle: {
    fontFamily: fonts.interMedium,
    fontSize: dimensions.TripleAndHalf,
    color: colors.primaryGrey,
    textAlign: 'center',
  },
  button: {
    width: '50%',
  },
  buttonText: {
    textAlign: 'center',
  },
});
