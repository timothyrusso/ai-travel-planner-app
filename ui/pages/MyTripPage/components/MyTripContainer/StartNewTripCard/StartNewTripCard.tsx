import { routes } from '@/constants/routes';
import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { icons } from '@/constants/style/icons';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { style } from './StartNewTripCard.style';

const StartNewTripCard = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View style={style.container}>
      <Ionicons
        name={icons.location}
        size={dimensions.Quintuple}
        color={colors.primaryBlack}
      />
      <CustomText text={t('MYTRIP.NO_TRIPS_PLANNED')} style={style.title} />
      <CustomButton
        title={t('MYTRIP.START_NEW_TRIP')}
        onPress={() => router.push(routes.searchPlace)}
        style={style.button}
        textStyle={style.buttonText}
      />
    </View>
  );
};

export default StartNewTripCard;
