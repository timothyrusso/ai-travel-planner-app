import Constants from 'expo-constants';
import ky from 'ky';

export const GetAirportsUseCase = async (place: string, locale: string) => {
  return await ky
    .get('https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport', {
      headers: {
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
        'x-rapidapi-key': Constants.expoConfig?.extra?.rapidApiKey,
      },
      searchParams: { query: place, locale },
    })
    .json();
};
