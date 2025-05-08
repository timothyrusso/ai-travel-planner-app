import type { DayPlan } from '@/modules/trip/domain/dto/UserTripsDTO';
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
      <FlatList
        data={dayPlan.schedule}
        keyExtractor={(item, index) => `${item.placeName}-${index}`}
        renderItem={({ item }) => <ActivityItem scheduleItem={item} day={dayPlan.day} />}
        ItemSeparatorComponent={separator}
        style={styles.list}
      />
    </View>
  );
};
