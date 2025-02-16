// FIXME: react-native-get-random-values must be imported before nanoid
import 'react-native-get-random-values';
import { ai_prompt } from '@/ai/prompt';
import { auth, db } from '@/configs/firebaseConfig';
import { chatSession } from '@/configs/geminiConfig';
import { routes } from '@/constants/routes';
import { useTripState } from '@/ui/state/trip';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export const useGenerateTripPageLogic = () => {
  const { tripSelectors } = useTripState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = auth.currentUser?.email;
  const location = tripSelectors.locationInfo().name;
  const days = tripSelectors.datesInfo().totalNoOfDays.toString();
  const nights = (tripSelectors.datesInfo().totalNoOfDays - 1).toString();
  const traveler = tripSelectors.travelerInfo;
  const budget = tripSelectors.budgetInfo;

  const PROMPT = ai_prompt
    .replace('{location}', location)
    .replace('{days}', days)
    .replace('{nights}', nights)
    .replace('{traveler}', traveler)
    .replace('{budget}', budget)
    .replace('{days}', days)
    .replace('{nights}', nights);

  const generateAiTrip = async () => {
    setIsLoading(true);

    try {
      const resultPrompt = await chatSession.sendMessage(PROMPT);
      const responseText = await resultPrompt.response.text();

      const docId = nanoid();

      const tripData = JSON.parse(responseText);

      await setDoc(doc(db, 'UserTrips', docId), {
        userEmail,
        tripData,
      });

      router.push(routes.myTrip);
    } catch (error) {
      console.error('Error generating AI trip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateAiTrip();
  }, []);

  return { generateAiTrip, isLoading };
};
