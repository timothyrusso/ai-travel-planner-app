import { routes } from '@/constants/routes';
import { useTripState } from '@/ui/state/trip';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TravelerData } from './SelectTravelersPage.data';

export const useSelectTravelersPageLogic = () => {
  const router = useRouter();
  const { tripActions, tripSelectors } = useTripState();
  const travelerId = tripSelectors.travelerInfo().id;

  const [selectedTravelers, setSelectedTravelers] = useState<number>(
    travelerId ?? 0
  );

  const handleCardPress = (id: number) => {
    setSelectedTravelers(id);
    tripActions.setTravelerInfo(TravelerData[id]);
  };

  const handleBackPress = () => router.back();

  const handleButtonPress = () => router.push(routes.selectDates);

  return {
    TravelerData,
    handleBackPress,
    handleCardPress,
    selectedTravelers,
    handleButtonPress,
  };
};
