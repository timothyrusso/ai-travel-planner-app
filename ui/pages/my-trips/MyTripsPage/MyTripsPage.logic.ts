import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';
import { UrlTypes, useUnsplashImages } from '@/ui/queries/unsplashImages/query/useUnsplashImages';
import { useTripState } from '@/ui/state/trip';

export const useMyTripsPageLogic = () => {
  const { tripSelectors } = useTripState();

  const { data, isLoading } = useGetUserTripsQuery();
  const { data: imageUrl } = useUnsplashImages(tripSelectors.locationInfo().name.split(',')[0], UrlTypes.REGULAR);

  const lastCreatedTrip = data?.lastCreatedTrip;

  const _userTripData = lastCreatedTrip?.userTripData ? JSON.parse(lastCreatedTrip?.userTripData) : {};

  const image = imageUrl;
  const location = _userTripData?.location?.split(',')[0];
  const days = _userTripData?.days;
  const budget = lastCreatedTrip?.tripAiResp.tripDetails.budget ?? 'MY_TRIP.BUDGET_NOT_AVAILABLE';
  const travelers = lastCreatedTrip?.tripAiResp.tripDetails.travelers ?? 0;

  const tripItem = {
    ...lastCreatedTrip?.tripAiResp,
    ..._userTripData,
    image: imageUrl,
    id: lastCreatedTrip?.docId,
    isFavorite: lastCreatedTrip?.isFavorite,
  };

  return { lastCreatedTrip: data?.lastCreatedTrip, isLoading, image, location, days, budget, travelers, tripItem };
};
