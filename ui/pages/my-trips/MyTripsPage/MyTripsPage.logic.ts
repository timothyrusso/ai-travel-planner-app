import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';

export const useMyTripsPageLogic = () => {
  const { data, isLoading } = useGetUserTripsQuery();

  const lastCreatedTrip = data?.lastCreatedTrip;

  const _userTripData = lastCreatedTrip?.userTripData ? JSON.parse(lastCreatedTrip?.userTripData) : {};

  const image = _userTripData?.imageUrl;
  const location = _userTripData?.location?.split(',')[0];
  const days = _userTripData?.days;
  const budget = lastCreatedTrip?.tripAiResp.tripDetails.budget ?? 'MY_TRIP.BUDGET_NOT_AVAILABLE';
  const travelers = lastCreatedTrip?.tripAiResp.tripDetails.travelers ?? 0;

  const tripItem = {
    ...lastCreatedTrip?.tripAiResp,
    ..._userTripData,
    image: _userTripData?.imageUrl,
    id: lastCreatedTrip?.docId,
    isFavorite: lastCreatedTrip?.isFavorite,
  };

  return { lastCreatedTrip: data?.lastCreatedTrip, isLoading, image, location, days, budget, travelers, tripItem };
};
