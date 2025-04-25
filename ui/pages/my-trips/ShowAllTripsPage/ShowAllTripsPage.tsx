import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { ActivityIndicator, FlatList } from 'react-native';
import { useShowAllTripsPageLogic } from './ShowAllTripsPage.logic';
import { styles } from './ShowAllTripsPage.style';
import { TripCard } from './components/TripCard/TripCard';
export const ShowAllTripsPage = () => {
  const { userTrips, isLoading } = useShowAllTripsPageLogic();

  return (
    <BasicView nameView={Routes.ShowAllTrips}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={userTrips}
          renderItem={({ item }) => <TripCard item={item} />}
          keyExtractor={item => item.docId}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          style={styles.container}
        />
      )}
    </BasicView>
  );
};
