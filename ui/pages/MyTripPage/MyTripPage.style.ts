import { dimensions } from '@/constants/style/dimensions';
import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  animation: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: dimensions.tripAnimationHeight,
    bottom: 0,
  },
});
