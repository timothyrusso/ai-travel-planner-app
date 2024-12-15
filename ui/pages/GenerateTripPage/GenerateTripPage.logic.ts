import { ai_prompt } from '@/ai/prompt';
import { chatSession } from '@/configs/geminiConfig';
import { useTripState } from '@/ui/state/trip';

export const useGenerateTripPageLogic = () => {
  const { tripSelectors } = useTripState();

  const generateAiTrip = async () => {
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

    const result = await chatSession.sendMessage(PROMPT);
    return result.response;
  };

  return { generateAiTrip };
};
