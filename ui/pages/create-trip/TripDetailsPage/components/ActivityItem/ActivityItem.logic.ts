import type { ScheduleItem } from '@/modules/trip/domain/dto/UserTripsDTO';
import { UrlTypes, useUnsplashImages } from '@/ui/queries/unsplashImages/query/useUnsplashImages';
import { useTranslation } from 'react-i18next';
export const useActivityItemLogic = (scheduleItem: ScheduleItem, location: string) => {
  const imageLocationName = `${scheduleItem?.placeName}, ${location}`;

  const { data, isLoading } = useUnsplashImages(imageLocationName, UrlTypes.SMALL);

  const { t } = useTranslation();

  return {
    image: data,
    isLoading,
    t,
  };
};
