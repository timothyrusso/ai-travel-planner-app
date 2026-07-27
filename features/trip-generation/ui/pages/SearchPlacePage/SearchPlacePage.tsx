import { View } from 'react-native';
import { BasicView, CustomText, LottieAnimation, PlacesAutocomplete } from '@/features/core/design-system';
import { Routes } from '@/features/core/navigation';
import { useSearchPlacePageLogic } from '@/features/trip-generation/ui/pages/SearchPlacePage/SearchPlacePage.logic';
import { styles } from '@/features/trip-generation/ui/pages/SearchPlacePage/SearchPlacePage.style';

export const SearchPlacePage = () => {
  const { state, derived, effects } = useSearchPlacePageLogic();

  return (
    <BasicView
      nameView={Routes.Search}
      statusBarStyle="dark"
      bottomButtonTitle="SELECT_TRAVELERS.TITLE"
      bottomButtonPress={effects.handleParticipantsPress}
      bottomButtonDisabled={derived.isButtonDisabled}
    >
      <CustomText text="SEARCH_PLACE_PAGE.DESCRIPTION" style={styles.subtitle} />
      <View style={styles.searchContainer}>
        <View style={styles.autoCompleteContainer}>
          <PlacesAutocomplete onPress={effects.handleSearchPress} />
        </View>
        <View style={styles.animationContainer}>
          <LottieAnimation style={styles.animation} animationPath={state.animation} loop={false} />
        </View>
      </View>
    </BasicView>
  );
};
