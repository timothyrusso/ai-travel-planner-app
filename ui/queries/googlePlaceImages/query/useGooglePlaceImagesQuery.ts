import { useQuery } from '@tanstack/react-query';
import { GooglePlaceImagesKeys } from '../GooglePlaceImagesKeys';

export const useGooglePlaceImagesQuery = (placeName: string) => {
  const _googleApiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || '';

  const { data, isFetching } = useQuery({
    queryKey: [GooglePlaceImagesKeys.getGooglePlaceImages, placeName],
    queryFn: () => getImage(placeName),
    enabled: !!placeName,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });

  const getImage = async (placeName: string) => {
    if (!placeName) {
      console.log('No place name provided');
      return null;
    }

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

        if (photoReference) {
          return `https://places.googleapis.com/v1/${photoReference}/media?key=${_googleApiKey}&maxWidthPx=500`;
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
    }
  };

  return { data, isLoading: isFetching };
};
