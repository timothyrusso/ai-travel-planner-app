import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type LottieAnimationProps = {
  style: StyleProp<ViewStyle>;
  animationPath: string;
  autoPlay?: boolean;
  loop?: boolean;
};
export default function LottieAnimation({
  style,
  animationPath,
  autoPlay = true,
  loop = true,
}: LottieAnimationProps) {
  return (
    <LottieView
      source={animationPath}
      style={style}
      autoPlay={autoPlay}
      loop={loop}
    />
  );
}
