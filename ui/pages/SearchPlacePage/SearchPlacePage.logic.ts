import { routes } from '@/constants/routes';
import { LocationInfo } from '@/modules/trip/domain/entities/LocationInfo';
import { useTripState } from '@/ui/state/trip';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useSearchPageLogic = () => {
  const router = useRouter();
  const { tripActions } = useTripState();
  const { t } = useTranslation();
  const [locationInfo, setLocationInfo] = useState<LocationInfo>();

  const handleSearchPress = (locationInfo: LocationInfo) => {
    tripActions.setLocationInfo(locationInfo);
    setLocationInfo(locationInfo);
  };

  const handleParticipantsPress = () => router.push(routes.selectTraveler);

  const isButtonDisabled = !locationInfo;

  const goBackHandler = () => router.back();

  const animation = require('../../assets/lottie/search_animation.json');

  return {
    handleSearchPress,
    goBackHandler,
    t,
    animation,
    handleParticipantsPress,
    isButtonDisabled,
  };
};
