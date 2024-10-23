import BasicView from '@/components/composite/BasicView/BasicView';
import MyTripContainer from '@/components/composite/MyTripContainer/MyTripContainer';
import MyTripHeader from '@/components/composite/MyTripHeader/MyTripHeader';
import StartNewTripCard from '@/components/composite/StartNewTripCard/StartNewTripCard';
import React from 'react';

const MyTrip = () => {
  const [userTrips, setUserTrips] = React.useState([]);

  return (
    <BasicView>
      <MyTripHeader />

      <MyTripContainer>
        {userTrips.length === 0 ? <StartNewTripCard /> : null}
      </MyTripContainer>
    </BasicView>
  );
};

export default MyTrip;
