import type { TripItem } from '@/modules/trip/domain/entities/TripItem';
import { Routes, Stacks } from '@/ui/constants/routes';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
export const useDetailsBoxLogic = (tripItem: TripItem, budget: string) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handlePress = () => {
    router.push({
      pathname: `/${Stacks.CreateTrip}/${Routes.TripDetails}`,
      params: { trip: JSON.stringify(tripItem) },
    });
  };

  const budgetLabel =
    budget === 'MY_TRIP.BUDGET_NOT_AVAILABLE' ? t('MY_TRIP.BUDGET_NOT_AVAILABLE') : `${budget} budget`;

  return { handlePress, budgetLabel };
};
