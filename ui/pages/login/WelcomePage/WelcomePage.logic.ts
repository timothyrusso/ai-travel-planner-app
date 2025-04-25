import { Routes } from '@/ui/constants/routes';
import { useRouter } from 'expo-router';

export const useWelcomePageLogic = () => {
  const router = useRouter();
  const animation = require('../../../assets/lottie/travel_animation.json');

  const handlePress = () => router.push(`/${Routes.SignIn}`);
  return { handlePress, animation };
};
