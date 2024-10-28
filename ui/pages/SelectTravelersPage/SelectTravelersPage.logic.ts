import { useTripState } from '@/ui/state/trip';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TravelerData } from './SelectTravelersPage.data';

export const useSelectTravelersPageLogic = () => {
  const router = useRouter();
  const [selectedTravelers, setSelectedTravelers] = useState<number>();
  const { tripActions } = useTripState();

  const handleCardPress = (id: number) => {
    setSelectedTravelers(id);
    tripActions.setTravelerInfo(TravelerData[id]);
  };

  const handleBackPress = () => router.back();

  return { TravelerData, handleBackPress, handleCardPress, selectedTravelers };
};
