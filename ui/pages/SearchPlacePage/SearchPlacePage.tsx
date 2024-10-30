import { icons } from '@/constants/style/icons';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import PlacesAutocomplete from '@/ui/components/composite/PlacesAutocomplete/PlacesAutocomplete';
import React from 'react';
import { View } from 'react-native';
import { useSearchPageLogic } from './SearchPlacePage.logic';
import { styles } from './SearchPlacePage.style';

const SearchPlacePage = () => {
  const {
    goBackHandler,
    handleSearchPress,
    animation,
    handleParticipantsPress,
    isButtonDisabled,
  } = useSearchPageLogic();

  return (
    <BasicView>
      <CustomHeader
        title="SEARCH_PLACE_PAGE.TITLE"
        icon={icons.arrowBackCircleOutline}
        onPress={goBackHandler}
      />
      <CustomText
        text="SEARCH_PLACE_PAGE.DESCRIPTION"
        style={styles.subtitle}
      />
      <View style={styles.searchContainer}>
        <View style={styles.autoCompleteContainer}>
          <PlacesAutocomplete onPress={handleSearchPress} />
        </View>
        <View style={styles.animationContainer}>
          <LottieAnimation
            style={styles.animation}
            animationPath={animation}
            loop={false}
          />
        </View>
        <View style={{ alignItems: 'center', height: 100 }}>
          <CustomButton
            title="SELECT_TRAVELERS.TITLE"
            style={styles.button}
            onPress={handleParticipantsPress}
            isDisabled={isButtonDisabled}
          />
        </View>
      </View>
    </BasicView>
  );
};

export default SearchPlacePage;
