import { convertFromUTCToLocaleUseCase } from '@/modules/dates/application/convertFromUTCToLocaleUseCase';
import type { TripItem } from '@/modules/trip/domain/entities/TripItem';
import { Routes, Stacks } from '@/ui/constants/routes';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
export const useDetailsBoxLogic = (tripItem: TripItem, budget: string, travelers: number, days: number) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handlePress = () => {
    router.push({
      pathname: `/${Stacks.CreateTrip}/${Routes.TripDetails}`,
      params: { trip: JSON.stringify(tripItem) },
    });
  };

  const budgetLabel = budget === 'MY_TRIP.BUDGET_NOT_AVAILABLE' ? t('MY_TRIP.BUDGET_NOT_AVAILABLE') : budget;

  const travelersLabel = travelers;
  const daysLabel = days;

  const dateLabel = convertFromUTCToLocaleUseCase(tripItem?.startDate);

  return { handlePress, budgetLabel, travelersLabel, daysLabel, dateLabel };
};
