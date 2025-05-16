import type { ScheduleItem } from '@/modules/trip/domain/dto/UserTripsDTO';
import { useGooglePlaceImagesQuery } from '@/ui/queries/googlePlaceImages/query/useGooglePlaceImagesQuery';
import { useTranslation } from 'react-i18next';
export const useActivityItemLogic = (scheduleItem: ScheduleItem, location: string) => {
  const imageLocationName = `${scheduleItem?.placeName}, ${location}`;

  const { data: imageData, isLoading: isImageLoading } = useGooglePlaceImagesQuery(imageLocationName, 400);

  const { t } = useTranslation();

  return {
    image: imageData,
    isLoading: isImageLoading,
    t,
  };
};
