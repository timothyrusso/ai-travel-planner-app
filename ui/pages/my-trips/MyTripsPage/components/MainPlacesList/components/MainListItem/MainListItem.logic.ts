import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { useGooglePlaceImagesQuery } from '@/ui/queries/googlePlaceImages/query/useGooglePlaceImagesQuery';

export const useMainListItemLogic = (id?: string) => {
  const { data, isLoading } = useGooglePlaceImagesQuery(id ?? '', spacing.separator40 * 2);

  return { data, isLoading };
};
