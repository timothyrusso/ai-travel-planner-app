import type { UserTripData, UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import type { FC } from 'react';
import { Image, View } from 'react-native';

type UserTripListProps = {
  userTrips: UserTrips[] | [];
};

export const UserTripList: FC<UserTripListProps> = ({ userTrips }) => {
  // Può essere preso anche dallo stato globale
  let _latestTrip: UserTripData;
  try {
    _latestTrip = JSON.parse(userTrips[0]?.userTripData);
  } catch (error) {
    console.error('Error parsing userTripData:', error);
  }

  // go to specific dynamic route:
  // router.push({ pathname: '/trip-details', params: { trip:  JSON.stringify(userTrips[0]) } });

  return (
    <View>
      <Image
        source={{
          uri: 'https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D',
        }}
        style={{
          width: '100%',
          height: 240,
          borderRadius: 15,
          objectFit: 'cover',
        }}
      />
    </View>
  );
};
