import type { TripAiResp, UserTripData } from '@/modules/trip/domain/dto/UserTripsDTO';
import { format } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';

export const useTripDetailPageLogic = () => {
  const { trip } = useLocalSearchParams();
  const _tripData = JSON.parse(trip as string) as TripAiResp & UserTripData & { image: string };

  const _tripDays = `${format(_tripData.startDate ?? new Date(), 'dd MMM yyyy')} - ${format(_tripData.endDate ?? new Date(), 'dd MMM yy')}`;

  const router = useRouter();
  const goBackHandler = () => router.back();

  return { goBackHandler, _tripData, _tripDays };
};
