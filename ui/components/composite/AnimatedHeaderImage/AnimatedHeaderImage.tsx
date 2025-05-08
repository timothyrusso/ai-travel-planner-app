import type { FC } from 'react';
import { Animated, Image, View } from 'react-native';

import { images } from '@/ui/constants/style/dimensions/images';

import { HeaderIcons } from '@/ui/pages/create-trip/TripDetailsPage/components/HeaderIcons/HeaderIcons';
import CustomText from '../../basic/CustomText/CustomText';
import { style } from './AnimatedHeaderImage.style';
interface AnimatedHeaderImageProps {
  value: Animated.Value;
  title: string;
  imageUrl?: string;
}

const AnimatedHeaderImage: FC<AnimatedHeaderImageProps> = ({ value, imageUrl, title }) => {
  const HEADER_MAX_HEIGHT = images.fullScreenImageHeight;
  const HEADER_MIN_HEIGHT = images.fullScreenMinImageHeight;
  const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

  const animatedHeaderHeight = value.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const animatedOpacity = value.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const styles = style(animatedHeaderHeight, animatedOpacity);

  return (
    <Animated.View style={styles.header}>
      <Animated.View style={styles.titleContainer}>
        <CustomText text={title} style={styles.title} />
      </Animated.View>
      <View style={styles.image}>{imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}</View>
      <View style={styles.iconsContainer}>
        <HeaderIcons />
      </View>
    </Animated.View>
  );
};

export default AnimatedHeaderImage;
