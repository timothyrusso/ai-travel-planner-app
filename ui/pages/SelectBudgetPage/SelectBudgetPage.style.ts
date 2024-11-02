import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  subtitle: {
    marginVertical: dimensions.Fourfold,
    fontSize: dimensions.Fourfold,
    fontFamily: fonts.interMedium,
  },
  button: {
    width: '60%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    height: dimensions.TripleAndHalf,
  },
});
