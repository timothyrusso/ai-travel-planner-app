import { dimensions } from '@/constants/dimensions';
import { fonts } from '@/constants/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: dimensions.separator80,
  },
  Animation: {
    width: '100%',
    height: dimensions.travelAnimationHeight,
  },
  logo: {
    width: dimensions.mainLogoSize,
    height: dimensions.mainLogoSize,
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    width: dimensions.customButtonWidth,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: dimensions.separator40 + dimensions.TripleAndHalf,
    rowGap: dimensions.Fourfold,
  },
  title: {
    fontFamily: fonts.interRegular,
    fontSize: dimensions.Triple,
    marginTop: dimensions.Double,
    textAlign: 'center',
    paddingHorizontal: dimensions.separator80,
  },
});
