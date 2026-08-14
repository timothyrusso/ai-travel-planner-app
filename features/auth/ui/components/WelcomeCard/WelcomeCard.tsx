import type { ImageProps } from 'expo-image';
import type { FC } from 'react';
import Animated from 'react-native-reanimated';
import { useWelcomeCardLogic } from '@/features/auth/ui/components/WelcomeCard/WelcomeCard.logic';
import { CustomImage } from '@/features/core/design-system';

type WelcomeCardProps = {
  image: ImageProps['source'];
  size: 'small' | 'medium' | 'large';
  withPadding?: boolean;
  withBorderRadius?: boolean;
  rotation?: number;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  floatDuration?: number;
  photoEffect?: boolean;
};

export const WelcomeCard: FC<WelcomeCardProps> = ({
  image,
  size,
  withPadding = true,
  withBorderRadius = true,
  rotation = 0,
  top,
  left,
  bottom,
  right,
  floatDuration = 1800,
  photoEffect = false,
}) => {
  const { derived } = useWelcomeCardLogic(
    size,
    withPadding,
    withBorderRadius,
    rotation,
    top,
    left,
    bottom,
    right,
    floatDuration,
    photoEffect,
  );

  return (
    <Animated.View style={[derived.cardStyle.container, derived.floatStyle]}>
      <CustomImage source={image} style={derived.cardStyle.image} useBlur={true} />
    </Animated.View>
  );
};
