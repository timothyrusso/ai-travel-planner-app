import type { ScheduleItem } from '@/modules/trip/domain/dto/UserTripsDTO';
import { useGooglePlaceImagesQuery } from '@/ui/queries/googlePlaceImages/query/useGooglePlaceImagesQuery';

export const useActivityItemLogic = (scheduleItem: ScheduleItem) => {
  const { data, isLoading } = useGooglePlaceImagesQuery(scheduleItem?.placeName);

  return {
    image: data,
    isLoading,
  };
};
