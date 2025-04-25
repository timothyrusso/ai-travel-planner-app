import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';

export const useShowAllTripsPageLogic = () => {
  const { data: userTrips, isLoading } = useGetUserTripsQuery();

  return { userTrips, isLoading };
};
