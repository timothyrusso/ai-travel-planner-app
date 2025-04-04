import type { ScheduleItem } from '@/modules/trip/domain/dto/UserTripsDTO';
import { useEffect, useState } from 'react';

export const useActivityItemLogic = (scheduleItem: ScheduleItem) => {
  const [_placeName, _setPlaceName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const _googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || '';
  const image = _placeName
    ? `https://places.googleapis.com/v1/${_placeName}/media?key=${_googleApiKey}&maxWidthPx=1000`
    : '';

  const _getPlaceId = async (placeName: string) => {
    if (!placeName) {
      console.log('No place name provided');
      return null;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': _googleApiKey,
          'X-Goog-FieldMask': 'places.id,places.photos',
        },
        body: JSON.stringify({
          textQuery: placeName,
        }),
      });

      const data = await response.json();

      // Check if data has the expected structure
      if (data?.places?.length > 0 && data.places[0]?.photos?.length > 0) {
        const photoReference = data.places[0].photos[0].name;
        console.log('photoReference found:', photoReference);

        if (photoReference) {
          _setPlaceName(photoReference);
        }
      } else {
        console.log('No photo found for place:', placeName);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to fetch place ID:', error.message);
      } else {
        console.error('Failed to fetch place ID:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scheduleItem?.placeName) {
      _getPlaceId(scheduleItem.placeName);
    }
  }, [scheduleItem?.placeName]);

  return { image, _placeName, isLoading };
};
