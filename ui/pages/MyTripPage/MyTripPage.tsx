import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import { Routes } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { icons } from '@/ui/constants/style/icons';
import StartNewTripCard from '@/ui/pages/MyTripPage/components/StartNewTripCard/StartNewTripCard';
import { Fragment } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useMyTripPageLogic } from './MyTripPage.logic';
import { styles } from './MyTripPage.style';
import { UserTripList } from './components/UserTripList/UserTripList';

const MyTripPage = () => {
  const { userTrips, isLoading, animation, router } = useMyTripPageLogic();

  return (
    <Fragment>
      <BasicView>
        <CustomHeader title="MY_TRIP.TITLE" icon={icons.addCircle} onPress={() => router.push(`/${Routes.Search}`)} />

        <View style={styles.container}>
          {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
          {userTrips?.length === 0 && !isLoading ? <StartNewTripCard /> : <UserTripList userTrips={userTrips ?? []} />}
        </View>
      </BasicView>
      {userTrips?.length === 0 && <LottieAnimation animationPath={animation} style={styles.animation} />}
    </Fragment>
  );
};

export default MyTripPage;
