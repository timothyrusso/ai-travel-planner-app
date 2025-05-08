import type { ScheduleItem } from '@/modules/trip/domain/dto/UserTripsDTO';
import { UrlTypes, useUnsplashImages } from '@/ui/queries/unsplashImages/query/useUnsplashImages';
import { useTranslation } from 'react-i18next';
export const useActivityItemLogic = (scheduleItem: ScheduleItem) => {
  const { data, isLoading } = useUnsplashImages(scheduleItem?.placeName, UrlTypes.SMALL);
  const { t } = useTranslation();

  return {
    image: data,
    isLoading,
    t,
  };
};
