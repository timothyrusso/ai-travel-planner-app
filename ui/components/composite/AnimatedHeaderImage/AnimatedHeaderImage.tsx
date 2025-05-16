import type { FC } from 'react';
import { Animated, Image, View } from 'react-native';

import { images } from '@/ui/constants/style/dimensions/images';

import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { HeaderIcons } from '@/ui/pages/create-trip/TripDetailsPage/components/HeaderIcons/HeaderIcons';
import { CustomIcon } from '../../basic/CustomIcon/CustomIcon';
import CustomText from '../../basic/CustomText/CustomText';
import { style } from './AnimatedHeaderImage.style';
interface AnimatedHeaderImageProps {
  value: Animated.Value;
  title: string;
  imageUrl?: string;
  travelers: number;
  budget: string;
  date: number;
}

const AnimatedHeaderImage: FC<AnimatedHeaderImageProps> = ({ value, imageUrl, title, travelers, budget, date }) => {
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
        <View style={styles.chipsContainer}>
          <CustomText text={title.toUpperCase()} style={styles.title} />
          <View style={styles.detailsChipRow}>
            <View style={styles.detailsChip}>
              <CustomIcon name={icons.people} size={spacing.Triple} color={colors.primaryBlack} />
              <CustomText text={travelers.toString()} style={styles.travelersChipLabel} />
            </View>
            <View style={styles.detailsChip}>
              <CustomIcon name={icons.card} size={spacing.Triple} color={colors.primaryBlack} />
              <CustomText text={budget.toUpperCase()} style={styles.budgetChipLabel} />
            </View>
            <View style={styles.detailsChip}>
              <CustomIcon name={icons.calendar} size={spacing.Triple} color={colors.primaryBlack} />
              <CustomText text={date.toString()} style={styles.dateChipLabel} />
            </View>
          </View>
        </View>
      </Animated.View>
      <View style={styles.image}>{imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}</View>
      <View style={styles.iconsContainer}>
        <HeaderIcons />
      </View>
    </Animated.View>
  );
};

export default AnimatedHeaderImage;
