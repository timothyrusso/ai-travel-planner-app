import { FlatList, View } from 'react-native';
import { Routes } from '@/features/core/navigation';
import { BasicView, CardType, CustomIconTextCard, CustomText, colors } from '@/features/core/ui';
import { TravelersNumberSelector } from '@/features/trip-generation/ui/components/TravelersNumberSelector/TravelersNumberSelector';
import {
  TravelerData,
  useSelectTravelersPageLogic,
} from '@/features/trip-generation/ui/pages/SelectTravelersPage/SelectTravelersPage.logic';
import { style } from '@/features/trip-generation/ui/pages/SelectTravelersPage/SelectTravelersPage.style';

const SeparatorItem = () => <View style={style.separator} />;

export const SelectTravelersPage = () => {
  const { state, effects } = useSelectTravelersPageLogic();

  const renderItem = ({ item }: { item: (typeof TravelerData)[number] }) =>
    item.id !== null ? (
      <CustomIconTextCard
        cardType={CardType.Secondary}
        label={item.title}
        icon={item.icon}
        style={style.twoColumnCard}
        selected={state.selectedTravelers === item.id}
        onPress={() => effects.handleCardPress(item.id ?? 0)}
        iconColor={state.selectedTravelers === item.id ? colors.primaryWhite : colors.primaryBlack}
      />
    ) : null;

  return (
    <BasicView
      nameView={Routes.SelectTraveler}
      statusBarStyle="dark"
      bottomButtonTitle="SELECT_DATES.TITLE"
      bottomButtonPress={effects.handleButtonPress}
    >
      <CustomText text="SELECT_TRAVELERS.TRAVELERS_NUMBER" style={style.subtitle} />
      <TravelersNumberSelector />
      <FlatList
        data={TravelerData}
        numColumns={2}
        keyExtractor={item => item.id?.toString() ?? ''}
        ItemSeparatorComponent={SeparatorItem}
        renderItem={renderItem}
        style={style.list}
        contentContainerStyle={style.contentContainer}
        columnWrapperStyle={style.columnWrapper}
        ListHeaderComponent={<CustomText text="SELECT_TRAVELERS.TRAVELERS_TYPE" style={style.listTitle} />}
      />
    </BasicView>
  );
};
