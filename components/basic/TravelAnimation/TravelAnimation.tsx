import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleProp, ViewStyle } from 'react-native';

type AnimationProps = {
  style: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
};
export default function TravelAnimation({
  style,
  autoPlay,
  loop,
}: AnimationProps) {
  return (
    <LottieView
      source={require('../../../assets/lottie/travel_animation.json')}
      style={style}
      autoPlay
      loop
    />
  );
}
