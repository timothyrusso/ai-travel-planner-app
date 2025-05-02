import { UrlTypes, useUnsplashImages } from '@/ui/queries/unsplashImages/query/useUnsplashImages';

export const useMainListItemLogic = (id?: string) => {
  const { data, isLoading } = useUnsplashImages(id ?? '', UrlTypes.THUMB);

  return { data, isLoading };
};
