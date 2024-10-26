import { LocationInfo } from '@/modules/trip/domain/entities/LocationInfo';
import { useTripState } from '@/ui/state/trip';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export const useSearchPageLogic = () => {
  const router = useRouter();
  const { tripActions } = useTripState();
  const { t } = useTranslation();

  const handleSearchPress = (locationInfo: LocationInfo) => {
    tripActions.setLocationInfo(locationInfo);
  };

  const goBackHandler = () => router.back();

  return { handleSearchPress, goBackHandler, t };
};
