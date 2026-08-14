import { useGetTrips } from '@/features/trips/facades/useGetTrips';
import { useUniqueItems } from '@/features/trips/hooks/useUniqueItems';

export const useTripListPageLogic = () => {
  const { getUniqueItems } = useUniqueItems();
  const { isLoading, trips } = useGetTrips();

  const skeletonCards = getUniqueItems(4);

  const userTrips = isLoading ? skeletonCards : trips;

  return {
    derived: { userTrips },
  };
};
