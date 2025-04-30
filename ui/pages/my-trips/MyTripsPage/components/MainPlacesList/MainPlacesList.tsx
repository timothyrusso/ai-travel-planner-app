import { colors } from '@/ui/constants/style/colors';
import { ActivityIndicator, FlatList } from 'react-native';
import { useMainPlacesListLogic } from './MainPlacesList.logic';
import { styles } from './MainPlacesList.style';
import { MainListItem } from './components/MainListItem/MainListItem';

export const MainPlacesList = () => {
  const { listItems, isLoading } = useMainPlacesListLogic();

  return isLoading ? (
    <ActivityIndicator size="large" color={colors.primaryBlack} />
  ) : (
    <FlatList
      data={listItems}
      renderItem={({ item, index }) => <MainListItem id={item?.id} index={index} />}
      style={styles.container}
      scrollEnabled={false}
      horizontal
    />
  );
};
