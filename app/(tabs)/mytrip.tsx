import CustomText from '@/components/basic/CustomText/CustomText';
import BasicView from '@/components/composite/BasicView/BasicView';
import StartNewTripCard from '@/components/composite/StartNewTripCard/StartNewTripCard';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

const MyTrip = () => {
  const [userTrips, setUserTrips] = React.useState([]);

  return (
    <BasicView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CustomText
          text="My Trips"
          style={{ fontSize: 30, fontFamily: 'inter-bold' }}
        />
        <Ionicons name="add-circle" size={24} color="black" />
      </View>

      {userTrips.length === 0 ? (
        <StartNewTripCard />
      ) : (
        <CustomText text="Your Trips" />
      )}
    </BasicView>
  );
};

export default MyTrip;
