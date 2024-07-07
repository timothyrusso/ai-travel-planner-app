import { dimensions } from '@/constants/dimensions';
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
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: dimensions.separator40 + dimensions.TripleAndHalf,
  },
});
