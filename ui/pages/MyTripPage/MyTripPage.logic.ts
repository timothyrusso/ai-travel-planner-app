import { auth, db } from '@/configs/firebaseConfig';
import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useMyTripPageLogic = () => {
  const [userTrips, setUserTrips] = useState<UserTrips[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const animation = require('../../assets/lottie/trip_animation.json');
  const user = auth.currentUser;

  const router = useRouter();

  useEffect(() => {
    getMyTrips();
  }, [user]);

  const getMyTrips = async () => {
    if (!user) return;

    setIsLoading(true);

    setUserTrips([]);

    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      setUserTrips(prev => [...prev, doc.data()]);
    });

    setIsLoading(false);
  };

  return { userTrips, isLoading, animation, router };
};
