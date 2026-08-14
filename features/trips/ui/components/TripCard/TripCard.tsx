import { Pressable, View } from 'react-native';
import { CustomIcon, CustomImage, CustomText, colors, icons, spacing } from '@/features/core/design-system';
import type { Trip } from '@/features/trips/domain/entities/Trip';
import { useTripCardLogic } from '@/features/trips/ui/components/TripCard/TripCard.logic';
import { styles } from '@/features/trips/ui/components/TripCard/TripCard.style';

export const TripCard = ({ item }: { item: Trip }) => {
  const { state, derived, effects } = useTripCardLogic(item);

  return (
    <Pressable style={({ pressed }) => [styles.container, pressed ? styles.pressed : {}]} onPress={effects.onCardPress}>
      <CustomImage
        source={typeof state.imageUrl === 'string' ? { uri: state.imageUrl } : state.imageUrl}
        style={styles.image}
        placeholder={state.imageBlurHash ? { blurhash: state.imageBlurHash } : undefined}
        onError={effects.retryCoverImage}
      />
      <View style={styles.iconContainer}>
        <CustomIcon
          name={state.isFavorite ? icons.heartOutline : icons.hearth}
          size={spacing.TripleAndHalf}
          color={colors.primaryBlack}
        />
      </View>
      <CustomText text={derived.location} style={styles.title} />
    </Pressable>
  );
};
