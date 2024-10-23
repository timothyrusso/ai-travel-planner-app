import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { style } from './StartNewTripCard.style';

const StartNewTripCard = () => {
  return (
    <View style={style.container}>
      <Ionicons
        name="location"
        size={dimensions.Quintuple}
        color={colors.primaryBlack}
      />
      <CustomText text="No trips planned yet" style={style.title} />
      <CustomText
        text="Looks like its time to plan a new travel experience! Get started below!"
        style={style.subtitle}
      />
      <CustomButton
        title="Start New Trip"
        onPress={() => {}}
        style={style.button}
        textStyle={style.buttonText}
      />
    </View>
  );
};

export default StartNewTripCard;
