import { routes } from '@/constants/routes';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export const useWelcomePageLogic = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const animation = require('../../assets/lottie/travel_animation.json');

  const handlePress = () => router.push(routes.signIn);
  return { handlePress, t, animation };
};