import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { icons } from '@/constants/style/icons';
import CustomIconButton from '@/ui/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import PlacesAutocomplete from '@/ui/components/composite/PlacesAutocomplete/PlacesAutocomplete';
import React from 'react';
import { View } from 'react-native';
import { useSearchPageLogic } from './SearchPlacePage.logic';
import { styles } from './SearchPlacePage.style';

const SearchPlacePage = () => {
  const { goBackHandler, handleSearchPress, t, animation } =
    useSearchPageLogic();

  return (
    <BasicView>
      <View style={styles.header}>
        <CustomText text={t('SEARCH_PLACE_PAGE.TITLE')} style={styles.title} />
        <CustomIconButton
          icon={icons.arrowBackCircleOutline}
          iconSize={dimensions.Fourfold + dimensions.MinimalDouble}
          iconColor={colors.primaryBlack}
          onPress={goBackHandler}
        />
      </View>
      <View style={styles.searchContainer}>
        <CustomText
          text={t('SEARCH_PLACE_PAGE.DESCRIPTION')}
          style={styles.description}
        />
        <PlacesAutocomplete onPress={handleSearchPress} />
      </View>
      <LottieAnimation
        style={styles.Animation}
        animationPath={animation}
        loop={false}
      />
    </BasicView>
  );
};

export default SearchPlacePage;
