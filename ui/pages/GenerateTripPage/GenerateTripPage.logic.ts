// FIXME: react-native-get-random-values must be imported before nanoid
import { ai_prompt } from '@/ai/prompt';
import { db } from '@/configs/firebaseConfig';
import { chatSession } from '@/configs/geminiConfig';
import { dbKeys } from '@/modules/trip/domain/entities/DbKeys';
import { Routes } from '@/ui/constants/routes';
import { useTripState } from '@/ui/state/trip';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import 'react-native-get-random-values';

export const useGenerateTripPageLogic = () => {
  const { tripSelectors } = useTripState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = auth().currentUser?.email;
  const userId = auth().currentUser?.uid;
  const _googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

  const userTripData = {
    startDate: tripSelectors.datesInfo().startDate,
    endDate: tripSelectors.datesInfo().endDate,
    location: tripSelectors.locationInfo().name,
    days: tripSelectors.datesInfo().totalNoOfDays.toString(),
    nights: (tripSelectors.datesInfo().totalNoOfDays - 1).toString(),
    traveler: tripSelectors.travelerInfo,
    budget: tripSelectors.budgetInfo,
    imageUrl: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${tripSelectors.locationInfo().photoRef}&key=${_googleApiKey}`,
    isFavorite: false,
  };

  const PROMPT = ai_prompt
    .replace('{location}', userTripData.location)
    .replace('{days}', userTripData.days)
    .replace('{nights}', userTripData.nights)
    .replace('{traveler}', userTripData.traveler)
    .replace('{budget}', userTripData.budget)
    .replace('{days}', userTripData.days)
    .replace('{nights}', userTripData.nights);

  const generateAiTrip = async () => {
    setIsLoading(true);

    try {
      const resultPrompt = await chatSession.sendMessage(PROMPT);
      const responseText = await resultPrompt.response.text();

      const docId = nanoid();

      const tripAiResp = JSON.parse(responseText);

      await setDoc(doc(db, `${dbKeys.userTrips}/${userId}/trips`, docId), {
        userEmail,
        tripAiResp,
        userTripData: JSON.stringify(userTripData),
        docId,
      });

      router.push(`/${Routes.MyTrip}`);
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
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
