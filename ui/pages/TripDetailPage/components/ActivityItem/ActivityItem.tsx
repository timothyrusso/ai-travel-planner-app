import type { ScheduleItem } from '@/modules/trip/domain/dto/UserTripsDTO';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { colors } from '@/ui/constants/style/colors';
import type { FC } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { useActivityItemLogic } from './ActivityItem.logic';
import { styles } from './ActivityItem.style';

type ActivityItemProps = {
  scheduleItem: ScheduleItem;
};
export const ActivityItem: FC<ActivityItemProps> = ({ scheduleItem }) => {
  const { image, _placeName, isLoading } = useActivityItemLogic(scheduleItem);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={[styles.image, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={colors.primaryBlack} />
        </View>
      ) : _placeName ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.noImageContainer]}>
          <CustomText text="GLOBAL.NO_IMAGE" />
        </View>
      )}

      <View style={styles.content}>
        <CustomText text={`🕗 ${scheduleItem.bestTimeToVisit}`} style={styles.time} />
        <CustomText text={scheduleItem.activity} style={styles.place} />
        <CustomText text={scheduleItem.placeDetails} style={styles.description} />
        <CustomText text={`💲 ${scheduleItem.ticketPricing.toString()}`} style={styles.price} />
      </View>
    </View>
  );
};
