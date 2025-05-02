import { useQuery } from '@tanstack/react-query';
import { UnsplashImagesKeys } from '../UnsplashImagesKeys';

const _unsplashAccessKey = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY;

const noImage = require('../../../assets/images/no-image-placeholder.jpg');

export enum UrlTypes {
  REGULAR = 'regular',
  SMALL = 'small',
  THUMB = 'thumb',
}

const getUnsplashImages = async (placeName: string, urlType: UrlTypes) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${placeName}&client_id=${_unsplashAccessKey}`,
    );
    const data = await response.json();

    if (data.results) {
      return data.results[0].urls[urlType];
    }

    return noImage;
  } catch (error) {
    console.error('Failed to fetch unsplash images:', error);
    return noImage;
  }
};

export const useUnsplashImages = (placeName: string, urlType: UrlTypes) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [UnsplashImagesKeys.getUnsplashImages, placeName, urlType],
    queryFn: () => getUnsplashImages(placeName, urlType),
  });

  return { data, isLoading, error };
};
