import BasicView from '@/ui/components/composite/BasicView/BasicView';
import MyTripContainer from '@/ui/components/composite/MyTripContainer/MyTripContainer';
import MyTripHeader from '@/ui/components/composite/MyTripHeader/MyTripHeader';
import StartNewTripCard from '@/ui/components/composite/StartNewTripCard/StartNewTripCard';
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
