import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';

export const useMyTripPageLogic = () => {
  const { data: userTrips, isLoading } = useGetUserTripsQuery();

  return { userTrips, isLoading };
};
