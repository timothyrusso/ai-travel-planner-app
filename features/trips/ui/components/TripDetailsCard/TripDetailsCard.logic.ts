import { useTranslation } from 'react-i18next';

import { colors } from '@/features/core/design-system';
import type { TripDetails } from '@/features/trips/domain/entities/TripDetails';
import { useBudgetColorsMap } from '@/features/trips/hooks/useBudgetColorsMap';

type UseTripDetailsCardParams = {
  tripDetails: Omit<TripDetails, 'locale' | 'location'>;
};

export const useTripDetailsCardLogic = ({ tripDetails }: UseTripDetailsCardParams) => {
  const { t } = useTranslation();
  const { budgetColorsMap } = useBudgetColorsMap();

  const dateLabel =
    tripDetails.startDate !== tripDetails.endDate
      ? `${tripDetails.startDate} - ${tripDetails.endDate}`
      : tripDetails.startDate;

  const durationLabel =
    tripDetails.durationNights > 0
      ? `${tripDetails.durationDays} ${t('MY_TRIP.DAYS', { count: tripDetails.durationDays })} / ${tripDetails.durationNights} ${t('MY_TRIP.NIGHT', { count: tripDetails.durationNights })}`
      : `${tripDetails.durationDays} ${t('MY_TRIP.DAYS', { count: tripDetails.durationDays })}`;

  const budgetColor = budgetColorsMap[tripDetails.budget] ?? colors.purple300;

  return {
    derived: { dateLabel, durationLabel, budgetColor },
  };
};
