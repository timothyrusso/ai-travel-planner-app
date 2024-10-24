import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import CustomIconButton from '@/ui/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { style } from './MyTripHeader.style';

const MyTripHeader = () => {
  const { t } = useTranslation();

  return (
    <View style={style.container}>
      <CustomText text={t('MYTRIP.TITLE')} style={style.title} />
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
