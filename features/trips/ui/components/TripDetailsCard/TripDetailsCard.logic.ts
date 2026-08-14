import { useTranslation } from 'react-i18next';

import { colors } from '@/features/core/design-system';
import type { TripDetails } from '@/features/trips/domain/entities/TripDetails';
import { useBudgetColorsMap } from '@/features/trips/hooks/useBudgetColorsMap';

type UseTripDetailsCardParams = {
  tripDetails: Omit<TripDetails, 'locale' | 'location'>;
};

export const useTripDetailsCardLogic = ({ tripDetails }: UseTripDetailsCardParams) => {
  const { t } = useTranslation();
  const { budgetColorsMap, budgetLabelColorsMap } = useBudgetColorsMap();

  const dateLabel =
    tripDetails.startDate !== tripDetails.endDate
      ? `${tripDetails.startDate} - ${tripDetails.endDate}`
      : tripDetails.startDate;

  const durationLabel =
    tripDetails.durationNights > 0
      ? `${tripDetails.durationDays} ${t('MY_TRIP.DAYS', { count: tripDetails.durationDays })} / ${tripDetails.durationNights} ${t('MY_TRIP.NIGHT', { count: tripDetails.durationNights })}`
      : `${tripDetails.durationDays} ${t('MY_TRIP.DAYS', { count: tripDetails.durationDays })}`;

  // An unknown budget label falls back to the lightest step of the ramp, so the pill still reads as
  // the same family rather than as a fifth, unrelated color.
  const budgetColor = budgetColorsMap[tripDetails.budget] ?? colors.purple300;
  const budgetLabelColor = budgetLabelColorsMap[tripDetails.budget] ?? colors.primaryBlack;

  return {
    derived: { dateLabel, durationLabel, budgetColor, budgetLabelColor },
  };
};
