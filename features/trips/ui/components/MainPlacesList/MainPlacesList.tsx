import { FlatList } from 'react-native';
import { BaseSkeleton } from '@/features/core/design-system';
import { MainListItem } from '@/features/trips/ui/components/MainPlacesList/components/MainListItem/MainListItem';
import { useMainPlacesListLogic } from '@/features/trips/ui/components/MainPlacesList/MainPlacesList.logic';
import { styles } from '@/features/trips/ui/components/MainPlacesList/MainPlacesList.style';

export const MainPlacesList = () => {
  const { state, derived } = useMainPlacesListLogic();

  return state.isLoading ? (
    <BaseSkeleton style={styles.skeleton} />
  ) : (
    <FlatList
      data={derived.listItems}
      renderItem={({ item, index }) => <MainListItem index={index} photoResourceName={item?.photoResourceName} />}
      style={styles.container}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => `${item?.id}-${index}`}
      horizontal
    />
  );
};
