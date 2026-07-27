import { Image } from 'expo-image';
import type { FC } from 'react';
import { BaseSkeleton } from '@/features/core/design-system/components/basic/BaseSkeleton/BaseSkeleton';
import {
  type CustomImageProps,
  useCustomImageLogic,
} from '@/features/core/design-system/components/basic/CustomImage/CustomImage.logic';

export const CustomImage: FC<CustomImageProps> = ({
  useBlur,
  blurhash,
  placeholder,
  source,
  isLoading = false,
  style,
  fallbackImage,
  onError,
  ...props
}) => {
  const { derived, effects } = useCustomImageLogic({
    useBlur,
    blurhash,
    placeholder,
    source,
    fallbackImage,
    onError,
  });

  return isLoading ? (
    <BaseSkeleton style={style} />
  ) : (
    <Image
      placeholder={derived.resolvedPlaceholder}
      transition={200}
      source={derived.resolvedSource}
      onError={effects.onError}
      style={style}
      {...props}
    />
  );
};
