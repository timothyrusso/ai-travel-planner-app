import { db } from '@/configs/firebaseConfig';
import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { dbKeys } from '@/modules/trip/domain/entities/DbKeys';
import auth from '@react-native-firebase/auth';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { tripsKeys } from '../TripsKeys';

export const useGetUserTripsQuery = () => {
  const user = auth().currentUser;

  const getMyTrips = async () => {
    if (!user) return;

    const userTrips: UserTrips[] = [];

    const q = query(collection(db, dbKeys.userTrips), where('userEmail', '==', user?.email));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      userTrips.push(doc.data() as UserTrips);
    });

    return userTrips;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [tripsKeys.getUserTrips],
    queryFn: getMyTrips,
  });

  return { data, isLoading, refetch };
};
