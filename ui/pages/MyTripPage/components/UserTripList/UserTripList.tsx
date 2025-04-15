import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { TripListItem } from '@/ui/components/composite/TripListItem/TripListItem';
import type { FC } from 'react';
import { FlatList, View } from 'react-native';
import { styles } from './UserTripList.style';
type UserTripListProps = {
  userTrips: UserTrips[] | [];
};

const separator = () => <View style={styles.separator} />;

export const UserTripList: FC<UserTripListProps> = ({ userTrips }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText style={styles.title} text="MY_TRIP.NEWEST_DESTINATIONS" />
        <CustomButton title="GLOBAL.VIEW_ALL" style={styles.button} textStyle={styles.buttonText} onPress={() => {}} />
      </View>
      <FlatList
        data={userTrips}
        keyExtractor={item => item.docId}
        renderItem={({ item }) => {
          const _userTripData = item.userTripData ? JSON.parse(item.userTripData) : {};

          return (
            <TripListItem
              tripItem={{
                ...item.tripAiResp,
                ..._userTripData,
                image: item.userTripData ? JSON.parse(item.userTripData).imageUrl : undefined,
                id: item.docId,
                isFavorite: item.isFavorite,
              }}
            />
          );
        }}
        ItemSeparatorComponent={separator}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
