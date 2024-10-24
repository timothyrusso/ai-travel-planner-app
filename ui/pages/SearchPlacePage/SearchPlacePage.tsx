import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { icons } from '@/constants/style/icons';
import CustomIconButton from '@/ui/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { styles } from './SearchPlacePage.style';

const SearchPlacePage = () => {
  const router = useRouter();

  return (
    <BasicView>
      <View style={styles.header}>
        <CustomText text="test" style={styles.title} />
        <CustomIconButton
          icon={icons.arrowBackCircleOutline}
          iconSize={dimensions.Fourfold + dimensions.MinimalDouble}
          iconColor={colors.primaryBlack}
          onPress={() => router.back()}
        />
      </View>
    </BasicView>
  );
};

export default SearchPlacePage;
