import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';

export const useMyTripsPageLogic = () => {
  const { data: userTrips, isLoading } = useGetUserTripsQuery();

  return { userTrips, isLoading };
};
