import { db } from '@/configs/firebaseConfig';
import type { UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { dbKeys } from '@/modules/trip/domain/entities/DbKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';
import { tripsKeys } from '../TripsKeys';
export const useAddToFavoriteTrip = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [tripsKeys.addTripToFavorites, id],
    mutationFn: async (isFavorite: boolean) => {
      try {
        const docRef = doc(db, dbKeys.userTrips, id);

        await updateDoc(docRef, {
          isFavorite: !isFavorite,
        });

        return true;
      } catch (error) {
        console.error(`Error updating favorite trip: ${error}`);
        return false;
      }
    },
    onMutate: isFavorite => {
      queryClient.setQueryData([tripsKeys.getUserTrips], (oldTrips: UserTrips[]) => {
        return oldTrips?.map(trip => (trip.docId === id ? { ...trip, isFavorite: !isFavorite } : trip));
      });
    },
    onError: (_, isFavorite) => {
      queryClient.setQueryData([tripsKeys.getUserTrips], (oldTrips: UserTrips[]) => {
        return oldTrips?.map(trip => (trip.docId === id ? { ...trip, isFavorite } : trip));
      });
    },
  });

  return {
    updateFavorite: mutate,
  };
};
