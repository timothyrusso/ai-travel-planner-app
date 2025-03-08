import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { TripListItem } from '@/ui/components/composite/TripListItem/TripListItem';
import type { FC } from 'react';
import { FlatList, View } from 'react-native';

type UserTripListProps = {
  userTrips: UserTrips[] | [];
};

export const UserTripList: FC<UserTripListProps> = ({ userTrips }) => {
  // go to specific dynamic route:
  // router.push({ pathname: '/trip-details', params: { trip:  JSON.stringify(userTrips[0]) } });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40 }}>
        <CustomText style={{ fontSize: 20 }} text={'Newest destinations'} />
        <CustomButton
          title="View All"
          style={{ backgroundColor: 'transparent', width: 'auto' }}
          textStyle={{ color: 'black', fontSize: 15 }}
          onPress={() => {}}
        />
      </View>
      <FlatList
        horizontal
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
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        contentContainerStyle={{
          marginTop: 30,
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
