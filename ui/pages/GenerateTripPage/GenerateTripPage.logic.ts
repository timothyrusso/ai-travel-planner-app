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

  useEffect(() => {
    generateAiTrip();
  }, [tripSelectors]);

  const generateAiTrip = async () => {
    setIsLoading(true);
    const PROMPT = ai_prompt
      .replace('{location}', tripSelectors.locationInfo().name)
      .replace('{days}', tripSelectors.datesInfo().totalNoOfDays.toString())
      .replace(
        '{nights}',
        (tripSelectors.datesInfo().totalNoOfDays - 1).toString()
      )
      .replace('{traveler}', tripSelectors.travelerInfo())
      .replace('{budget}', tripSelectors.budgetInfo())
      .replace('{days}', tripSelectors.datesInfo().totalNoOfDays.toString())
      .replace(
        '{nights}',
        (tripSelectors.datesInfo().totalNoOfDays - 1).toString()
      );

    try {
      const resultPrompt = await chatSession.sendMessage(PROMPT);
      const responseText = await resultPrompt.response.text();
      console.log(responseText);

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

  return { generateAiTrip, isLoading };
};
