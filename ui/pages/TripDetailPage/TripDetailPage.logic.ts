import type { TripAiResp, UserTripData, UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
export const useTripDetailPageLogic = () => {
  const { trip } = useLocalSearchParams();
  // TODO: fix type
  const _tripData = JSON.parse(trip as string) as UserTrips & UserTripData & TripAiResp & { image: string; id: string };

  const _tripDays = `${format(_tripData.startDate ?? new Date(), 'dd MMM yyyy')} - ${format(_tripData.endDate ?? new Date(), 'dd MMM yy')}`;

  const title = _tripData.location.split(',')[0];

  return { _tripData, _tripDays, title };
};
