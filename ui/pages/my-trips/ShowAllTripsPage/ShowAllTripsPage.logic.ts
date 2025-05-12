import { useUniqueItems } from '@/ui/hooks/useUniqueItems';
import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';

export const useShowAllTripsPageLogic = () => {
  const { data, isLoading } = useGetUserTripsQuery();
  const { getUniqueItems } = useUniqueItems();

  const skeletonCards = getUniqueItems(4);

  const userTrips = isLoading ? skeletonCards : data?.trips;

  return { userTrips };
};
