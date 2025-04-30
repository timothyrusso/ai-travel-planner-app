import { db } from '@/configs/firebaseConfig';
import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { dbKeys } from '@/modules/trip/domain/entities/DbKeys';
import auth from '@react-native-firebase/auth';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query } from 'firebase/firestore';
import { tripsKeys } from '../TripsKeys';

export const useGetUserTripsQuery = () => {
  const user = auth().currentUser;

  const getMyTrips = async () => {
    if (!user) return;

    const userTrips: UserTrips[] = [];

    const q = query(collection(db, `${dbKeys.userTrips}/${user?.uid}/trips`));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      userTrips.push(doc.data() as UserTrips);
    });

    return userTrips;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [tripsKeys.getUserTrips],
    queryFn: getMyTrips,
    enabled: !!user,
    select: data => ({
      trips: data,
      totalTrips: data?.length,
      favoriteTrips: data?.filter(trip => trip.isFavorite),
      tripItems: data?.map(trip => {
        const userTripData = JSON.parse(trip.userTripData);
        return {
          ...trip.tripAiResp,
          ...userTripData,
          image: userTripData?.imageUrl,
          id: trip.docId,
          isFavorite: trip.isFavorite,
        };
      }),
      lastCreatedTrip: data?.sort((a, b) => {
        const userTripDataA = JSON.parse(a.userTripData);
        const userTripDataB = JSON.parse(b.userTripData);

        const dateA = new Date(userTripDataA.createdAt);
        const dateB = new Date(userTripDataB.createdAt);

        return dateB.getTime() - dateA.getTime();
      })[0],
    }),
  });

  return { data, isLoading, refetch };
};
