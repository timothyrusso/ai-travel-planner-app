import { Routes, Stacks } from '@/ui/constants/routes';
import { useRouter } from 'expo-router';

export const useListHeaderLogic = () => {
  const router = useRouter();

  const goToShowAllTrips = () => {
    router.push(`/${Stacks.MyTrips}/${Routes.ShowAllTrips}`);
  };

  return { goToShowAllTrips };
};
