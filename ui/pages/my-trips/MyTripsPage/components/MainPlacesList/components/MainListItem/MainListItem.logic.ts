import { useGooglePlaceImagesQuery } from '@/ui/queries/googlePlaceImages/query/useGooglePlaceImagesQuery';

export const useMainListItemLogic = (id?: string) => {
  const { data, isLoading } = useGooglePlaceImagesQuery(id ?? '', 50);

  return { data, isLoading };
};
