import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';

export const useMainPlacesListLogic = () => {
  const { data, isLoading } = useGetUserTripsQuery();

  const places = data?.lastCreatedTrip?.tripAiResp.dayPlans[0].schedule;

  const listItems = places ? [...places.map(place => ({ id: place.placeName })).slice(0, 3), { id: 'last-item' }] : [];

  return { listItems, isLoading };
};
