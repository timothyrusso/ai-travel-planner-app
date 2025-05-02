import type { ScheduleItem } from '@/modules/trip/domain/dto/UserTripsDTO';
import { UrlTypes, useUnsplashImages } from '@/ui/queries/unsplashImages/query/useUnsplashImages';

export const useActivityItemLogic = (scheduleItem: ScheduleItem) => {
  const { data, isLoading } = useUnsplashImages(scheduleItem?.placeName, UrlTypes.SMALL);

  return {
    image: data,
    isLoading,
  };
};
