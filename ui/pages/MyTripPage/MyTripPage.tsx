import { icons } from '@/constants/style/icons';
import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import MyTripContainer from '@/ui/pages/MyTripPage/components/MyTripContainer/MyTripContainer';
import StartNewTripCard from '@/ui/pages/MyTripPage/components/MyTripContainer/StartNewTripCard/StartNewTripCard';
import React, { useState } from 'react';
import { style } from './MyTripPage.style';

const MyTripPage = () => {
  const [userTrips, setUserTrips] = useState([]);
  const animation = require('../../assets/lottie/trip_animation.json');

  return (
    <>
      <BasicView>
        <CustomHeader
          title="MYTRIP.TITLE"
          icon={icons.addCircle}
          onPress={() => {}}
        />

        <MyTripContainer>
          {userTrips.length === 0 ? <StartNewTripCard /> : null}
        </MyTripContainer>
      </BasicView>
      <LottieAnimation animationPath={animation} style={style.animation} />
    </>
  );
};

export default MyTripPage;
