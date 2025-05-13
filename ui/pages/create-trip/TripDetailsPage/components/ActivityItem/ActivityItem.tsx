import type { ScheduleItem } from '@/modules/trip/domain/dto/UserTripsDTO';
import { BaseSkeleton } from '@/ui/components/basic/BaseSkeleton/BaseSkeleton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { type FC, Fragment } from 'react';
import { Image, View } from 'react-native';
import { NumberedMarker } from '../NumberedMarker/NumberedMarker';
import { useActivityItemLogic } from './ActivityItem.logic';
import { styles } from './ActivityItem.style';

type ActivityItemProps = {
  scheduleItem: ScheduleItem;
  day: number;
  location: string;
  index: number;
};

export const ActivityItem: FC<ActivityItemProps> = ({ scheduleItem, day, location, index }) => {
  const { image, isLoading, t } = useActivityItemLogic(scheduleItem, location);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <BaseSkeleton style={styles.skeleton} />
      ) : (
        <Fragment>
          <Image source={typeof image === 'string' ? { uri: image } : image} style={styles.image} />
          <CustomText text={`${t('MY_TRIP.DAY')} ${day}`} style={styles.day} />
          <NumberedMarker number={index + 1} style={styles.marker} />
        </Fragment>
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
