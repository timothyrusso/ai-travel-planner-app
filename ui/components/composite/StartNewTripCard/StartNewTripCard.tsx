import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { useChangeLanguage } from '@/ui/hooks/useChangeLanguage';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { style } from './StartNewTripCard.style';

const StartNewTripCard = () => {
  const { t } = useTranslation();
  const { changeLanguage } = useChangeLanguage();

  return (
    <View style={style.container}>
      <Ionicons
        name="location"
        size={dimensions.Quintuple}
        color={colors.primaryBlack}
      />
      <CustomText text={t('MYTRIP.NO_TRIPS_PLANNED')} style={style.title} />
      <CustomButton
        title={t('MYTRIP.START_NEW_TRIP')}
        onPress={() => changeLanguage('it')}
        style={style.button}
        textStyle={style.buttonText}
      />
    </View>
  );
};

export default StartNewTripCard;
