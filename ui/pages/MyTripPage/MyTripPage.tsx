import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import { routes } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { icons } from '@/ui/constants/style/icons';
import MyTripContainer from '@/ui/pages/MyTripPage/components/MyTripContainer/MyTripContainer';
import StartNewTripCard from '@/ui/pages/MyTripPage/components/MyTripContainer/StartNewTripCard/StartNewTripCard';
import { Fragment } from 'react';
import { ActivityIndicator } from 'react-native';
import { useMyTripPageLogic } from './MyTripPage.logic';
import { style } from './MyTripPage.style';
import { UserTripList } from './components/UserTripList/UserTripList';

const MyTripPage = () => {
  const { userTrips, isLoading, animation, router } = useMyTripPageLogic();

  return (
    <Fragment>
      <BasicView>
        <CustomHeader title="MYTRIP.TITLE" icon={icons.addCircle} onPress={() => router.push(routes.searchPlace)} />

        <MyTripContainer>
          {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
          {userTrips.length === 0 && !isLoading ? <StartNewTripCard /> : <UserTripList userTrips={userTrips} />}
        </MyTripContainer>
      </BasicView>
      {userTrips.length === 0 && <LottieAnimation animationPath={animation} style={style.animation} />}
    </Fragment>
  );
};

export default MyTripPage;
