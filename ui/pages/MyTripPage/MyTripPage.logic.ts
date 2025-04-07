import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';
import { useRouter } from 'expo-router';

export const useMyTripPageLogic = () => {
  const animation = require('../../assets/lottie/trip_animation.json');

  const { data: userTrips, isLoading } = useGetUserTripsQuery();

  const router = useRouter();

  return { userTrips, isLoading, animation, router };
};
