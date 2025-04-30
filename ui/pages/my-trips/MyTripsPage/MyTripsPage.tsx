import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { ActivityIndicator, Image, View } from 'react-native';
import { useMyTripsPageLogic } from './MyTripsPage.logic';
import { styles } from './MyTripsPage.style';
import { DetailsBox } from './components/DetailsBox/DetailsBox';
import { EmptyListContainer } from './components/EmptyListContainer/EmptyListContainer';
import { HomeCustomHeader } from './components/HomeCustomHeader/HomeCustomHeader';
const MyTripsPage = () => {
  const { lastCreatedTrip, isLoading, image, location, days, budget, travelers, tripItem } = useMyTripsPageLogic();

  return (
    <BasicView nameView={Routes.MyTrips} isFullScreen isMenuVisible>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : lastCreatedTrip ? (
        <View style={styles.container}>
          <HomeCustomHeader />
          <Image source={{ uri: image }} style={styles.image} />
          <DetailsBox
            location={location}
            days={days}
            budget={budget}
            travelers={travelers}
            tripItem={tripItem}
            style={styles.detailsBox}
          />
        </View>
      ) : (
        <EmptyListContainer />
      )}
    </BasicView>
  );
};

export default MyTripsPage;
