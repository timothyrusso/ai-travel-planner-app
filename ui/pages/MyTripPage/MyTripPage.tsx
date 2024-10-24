import BasicView from '@/ui/components/composite/BasicView/BasicView';
import MyTripContainer from '@/ui/pages/MyTripPage/components/MyTripContainer/MyTripContainer';
import StartNewTripCard from '@/ui/pages/MyTripPage/components/MyTripContainer/StartNewTripCard/StartNewTripCard';
import MyTripHeader from '@/ui/pages/MyTripPage/components/MyTripHeader/MyTripHeader';
import React, { useState } from 'react';

const MyTripPage = () => {
  const [userTrips, setUserTrips] = useState([]);

  return (
    <BasicView>
      <MyTripHeader />

      <MyTripContainer>
        {userTrips.length === 0 ? <StartNewTripCard /> : null}
      </MyTripContainer>
    </BasicView>
  );
};

export default MyTripPage;
