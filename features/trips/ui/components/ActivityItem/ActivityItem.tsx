import { type FC, memo } from 'react';
import { Pressable, View } from 'react-native';
import { CustomIcon, CustomImage, CustomText, colors, icons, spacing } from '@/features/core/ui';
import type { ScheduleItem } from '@/features/trips/domain/entities/ScheduleItem';
import { useActivityItemLogic } from '@/features/trips/ui/components/ActivityItem/ActivityItem.logic';
import { styles } from '@/features/trips/ui/components/ActivityItem/ActivityItem.style';
import { NumberedMarker } from '@/features/trips/ui/components/NumberedMarker/NumberedMarker';

type ActivityItemProps = {
  scheduleItem: ScheduleItem;
  day: number;
  tripId: string;
  currency: string;
};

export const ActivityItem: FC<ActivityItemProps> = memo(
  ({ scheduleItem, day, tripId, currency }) => {
    const { state, derived, effects } = useActivityItemLogic(scheduleItem, tripId, currency);

    return (
      <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={effects.handlePress}>
        <NumberedMarker number={state.placeNumberID} style={styles.marker} />
        <View style={styles.innerContainer}>
          <CustomImage
            source={typeof derived.image === 'string' ? { uri: derived.image } : derived.image}
            style={styles.image}
          />
          <CustomText text={`${state.t('MY_TRIP.DAY')} ${day}`} style={styles.day} />
        </View>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View style={styles.timeContainer}>
              <CustomIcon name={icons.clock} size={spacing.Fourfold} color={colors.primaryBlack} />
              <CustomText text={state.bestTimeToVisit} style={styles.time} numberOfLines={1} ellipsizeMode="tail" />
            </View>
            <View style={styles.ratingContainer}>
              <CustomText text={derived.rating} style={styles.rating} />
              <CustomIcon
                name={icons.star}
                size={spacing.Double + spacing.MinimalDouble}
                color={colors.primaryBlack}
                style={styles.star}
              />
            </View>
          </View>
          <CustomText text={state.placeName} style={styles.place} />
          <CustomText text={state.placeDetails} style={styles.description} />
          {derived.priceLabel !== null && (
            <View style={styles.priceContainer}>
              <CustomIcon name={icons.card} size={spacing.Fourfold} color={colors.primaryBlack} />
              <CustomText text={derived.priceLabel} style={styles.price} />
            </View>
          )}
        </View>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.tripId === nextProps.tripId;
  },
);
