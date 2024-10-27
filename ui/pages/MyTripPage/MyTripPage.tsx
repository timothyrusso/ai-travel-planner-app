import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import MyTripContainer from '@/ui/pages/MyTripPage/components/MyTripContainer/MyTripContainer';
import StartNewTripCard from '@/ui/pages/MyTripPage/components/MyTripContainer/StartNewTripCard/StartNewTripCard';
import MyTripHeader from '@/ui/pages/MyTripPage/components/MyTripHeader/MyTripHeader';
import React, { useState } from 'react';
import { style } from './MyTripPage.style';

const MyTripPage = () => {
  const [userTrips, setUserTrips] = useState([]);
  const animation = require('../../assets/lottie/trip_animation.json');

  return (
    <>
      <BasicView>
        <MyTripHeader />

        <MyTripContainer>
          {userTrips.length === 0 ? <StartNewTripCard /> : null}
        </MyTripContainer>
      </BasicView>
      <LottieAnimation animationPath={animation} style={style.animation} />
    </>
  );
};

export default MyTripPage;
