import type { DayPlan } from '@/modules/trip/domain/dto/UserTripsDTO';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import type { FC } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityItem } from '../ActivityItem/ActivityItem';
import { styles } from './DayItem.style';
type DayItemProps = {
  dayPlan: DayPlan;
};

const separator = () => <View style={styles.separator} />;

export const DayItem: FC<DayItemProps> = ({ dayPlan }) => {
  return (
    <View style={styles.container}>
      <CustomText text={`Day ${dayPlan.day}`} style={styles.title} />
      <FlatList
        data={dayPlan.schedule}
        keyExtractor={item => item.placeName}
        renderItem={({ item }) => <ActivityItem scheduleItem={item} />}
        ItemSeparatorComponent={separator}
        style={styles.list}
      />
    </View>
  );
};
