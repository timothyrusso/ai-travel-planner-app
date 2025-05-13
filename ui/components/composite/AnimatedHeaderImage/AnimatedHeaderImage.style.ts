import { colors } from '@/ui/constants/style/colors';
import { images } from '@/ui/constants/style/dimensions/images';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { fonts } from '@/ui/constants/style/fonts';
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
    header: {
      width: '100%',
      height: animatedHeaderHeight,
      position: 'absolute',
      top: 0,
      zIndex: 3,
    },
    iconsContainer: { zIndex: 2, width: '100%', position: 'absolute' },
    titleContainer: {
      position: 'absolute',
      bottom: spacing.Quintuple,
      left: spacing.Fourfold,
      zIndex: 1,
      paddingVertical: spacing.Single,
      paddingHorizontal: spacing.Triple,
      backgroundColor: colors.primaryWhite,
      borderRadius: spacing.Fourfold,
      opacity: animatedOpacity,
    },
    title: {
      color: colors.primaryBlack,
      fontSize: spacing.TripleAndHalf,
      fontFamily: fonts.interBold,
    },
  });
