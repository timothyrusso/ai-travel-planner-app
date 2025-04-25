import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { Routes, Stacks } from '@/ui/constants/routes';
import { useRouter } from 'expo-router';

export const useTripCardLogic = (item: UserTrips) => {
  const router = useRouter();

  const image = item.userTripData ? JSON.parse(item.userTripData).imageUrl : undefined;

  const location = item.userTripData ? JSON.parse(item.userTripData).location.split(',')[0] : undefined;

  const _userTripData = item.userTripData ? JSON.parse(item.userTripData) : {};

  const itemParams = {
    ...item.tripAiResp,
    ..._userTripData,
    image: item.userTripData ? JSON.parse(item.userTripData).imageUrl : undefined,
    id: item.docId,
    isFavorite: item.isFavorite,
  };

  const onCardPress = () => {
    router.push({
      pathname: `/${Stacks.CreateTrip}/${Routes.TripDetails}`,
      params: { trip: JSON.stringify(itemParams) },
    });
  };

  const isFavorite = item.isFavorite;

  return { image, location, onCardPress, isFavorite };
};
