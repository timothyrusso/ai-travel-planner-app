import { Routes, Stacks } from '@/ui/constants/routes';
import { useTripState } from '@/ui/state/trip';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';

export type TripRecap = {
  title: string;
  value: string;
  icon: string;
};
export const useReviewTripPageLogic = () => {
  const router = useRouter();
  const { tripSelectors } = useTripState();

  const getTripDates = () => {
    const { startDate, endDate, totalNoOfDays } = tripSelectors.datesInfo();
    return (
      startDate &&
      `${format(startDate, 'dd MMM yyyy')}${endDate ? ` to ${format(endDate, 'dd MMM yy')}` : ''} - (${totalNoOfDays})`
    );
  };

  const getTripRecap = (): TripRecap[] => [
    {
      title: 'REVIEW_TRIP.DESTINATION',
      value: tripSelectors.locationInfo().name,
      icon: '📍',
    },
    {
      title: 'REVIEW_TRIP.TRAVEL_DATE',
      value: getTripDates() ?? '',
      icon: '🗓️',
    },
    {
      title: 'REVIEW_TRIP.TRAVELERS',
      value: tripSelectors.travelerInfo(),
      icon: '🚌',
    },
    {
      title: 'REVIEW_TRIP.BUDGET',
      value: tripSelectors.budgetInfo(),
      icon: '💰',
    },
  ];

  const handleButtonPress = () => {
    router.dismissAll();
    router.replace(`/${Stacks.CreateTrip}/${Routes.GenerateTrip}`);
  };

  return { handleButtonPress, tripData: getTripRecap() };
};
