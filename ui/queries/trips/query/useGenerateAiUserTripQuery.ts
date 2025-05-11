import { AiModels } from '@/configs/ai/AiModels';
import { generatedTripSchema } from '@/modules/trip/domain/entities/GenerateTripSchema';
import { useVercelAi } from '@/ui/hooks/useVercelAi';
import auth from '@react-native-firebase/auth';
import { useQuery } from '@tanstack/react-query';
import { tripsKeys } from '../TripsKeys';

export const useGenerateAiUserTripQuery = (prompt: string) => {
  const user = auth().currentUser;
  const { generateAiObject } = useVercelAi();

  const { data, isLoading } = useQuery({
    queryKey: [tripsKeys.generateAiUserTrip],
    queryFn: () => generateAiObject(prompt, generatedTripSchema, AiModels.GEMINI_2_0_FLASH),
    enabled: !!user,
  });

  return { data, isLoading };
};
