import { images } from '@/ui/constants/style/dimensions/images';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import type { Animated } from 'react-native';
import { StyleSheet } from 'react-native';

export const style = (
  animatedHeaderHeight?: Animated.AnimatedInterpolation<string | number>,
  animatedOpacity?: Animated.AnimatedInterpolation<string | number>,
) =>
  StyleSheet.create({
    image: {
      width: '100%',
      height: images.fullScreenImageHeight,
      flex: 1,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: 4,
      gap: 4,
      marginHorizontal: spacing.Fourfold,
      width: '100%',
      position: 'absolute',
      bottom: spacing.Fourfold,
      opacity: animatedOpacity,
    },
    header: {
      width: '100%',
      height: animatedHeaderHeight,
      position: 'absolute',
      top: 0,
      zIndex: 3,
    },
    iconsContainer: { zIndex: 2, width: '100%', position: 'absolute' },
  });
