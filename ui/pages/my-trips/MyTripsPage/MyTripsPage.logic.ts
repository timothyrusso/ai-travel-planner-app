import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';

export const useMyTripsPageLogic = () => {
  const { data, isLoading } = useGetUserTripsQuery();

  return { userTrips: data?.trips, isLoading };
};
