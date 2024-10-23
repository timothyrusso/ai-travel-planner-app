import CustomIconButton from '@/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/components/basic/CustomText/CustomText';
import { colors } from '@/constants/colors';
import { dimensions } from '@/constants/dimensions';
import React from 'react';
import { View } from 'react-native';
import { style } from './MyTripHeader.style';

const MyTripHeader = () => {
  return (
    <View style={style.container}>
      <CustomText text="My Trips" style={style.title} />
      <CustomIconButton
        icon="add-circle"
        iconSize={dimensions.Fourfold}
        iconColor={colors.primaryBlack}
        onPress={() => {}}
      />
    </View>
  );
};

export default MyTripHeader;
