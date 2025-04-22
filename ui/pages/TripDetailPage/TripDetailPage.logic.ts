import type { TripAiResp, UserTripData, UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { useAddToFavoriteTrip } from '@/ui/queries/trips/mutation/useAddToFavoriteTrip';
import { useRemoveTrip } from '@/ui/queries/trips/mutation/useRemoveTrip';
import { format } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
export const useTripDetailPageLogic = () => {
  const { trip } = useLocalSearchParams();
  // TODO: fix type
  const _tripData = JSON.parse(trip as string) as UserTrips & UserTripData & TripAiResp & { image: string; id: string };
  const [isFavorite, setIsFavorite] = useState(_tripData.isFavorite);

  const { removeTrip } = useRemoveTrip(_tripData.id);
  const { updateFavorite } = useAddToFavoriteTrip(_tripData.id);

  const _tripDays = `${format(_tripData.startDate ?? new Date(), 'dd MMM yyyy')} - ${format(_tripData.endDate ?? new Date(), 'dd MMM yy')}`;

  const router = useRouter();
  const goBackHandler = () => router.back();

  const addToFavoritesHandler = () => {
    setIsFavorite(prev => !prev);
    updateFavorite(isFavorite);
  };

  const handleDeleteTrip = () => {
    removeTrip(_tripData.id);
    router.back();
  };

  const title = _tripData.location.split(',')[0];

  return { goBackHandler, _tripData, _tripDays, addToFavoritesHandler, isFavorite, handleDeleteTrip, title };
};
