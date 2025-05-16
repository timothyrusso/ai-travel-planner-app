import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';
import { useIsFetching } from '@tanstack/react-query';

export const useMainPlacesListLogic = () => {
  const { data } = useGetUserTripsQuery();

  const places = data?.lastCreatedTrip?.tripAiResp.dayPlans[0].schedule;

  const listItems = places ? [...places.map(place => ({ id: place.placeName })).slice(0, 3), { id: 'last-item' }] : [];

  const isFetching = useIsFetching();

  return { listItems, isFetching };
};
