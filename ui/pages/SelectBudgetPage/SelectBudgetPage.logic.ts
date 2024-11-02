import { routes } from '@/constants/routes';
import { useTripState } from '@/ui/state/trip';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { BudgetData } from './SelectBudgetPage.data';

export const useSelectBudgetPageLogic = () => {
  const router = useRouter();
  const { tripActions } = useTripState();

  const [selectedBudget, setSelectedBudget] = useState<number>(0);

  const handleCardPress = (id: number) => {
    setSelectedBudget(id);
    tripActions.setBudgetInfo(BudgetData[id].title);
  };

  const handleBackPress = () => router.back();

  const handleButtonPress = () => router.push(routes.reviewTrip);

  return {
    handleBackPress,
    selectedBudget,
    handleCardPress,
    handleButtonPress,
  };
};
