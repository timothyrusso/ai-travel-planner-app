import { dimensions } from '@/constants/style/dimensions';
import { fonts } from '@/constants/style/fonts';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: dimensions.separator80,
  },
  animation: {
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
    paddingTop: dimensions.separator40,
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
