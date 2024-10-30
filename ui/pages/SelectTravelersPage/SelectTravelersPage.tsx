import { icons } from '@/constants/style/icons';
import { TravelerInfo } from '@/modules/trip/domain/entities/TravelerInfo';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import React from 'react';
import { FlatList, View } from 'react-native';
import TravelersCard from './components/TravelersCard/TravelersCard';
import { useSelectTravelersPageLogic } from './SelectTravelersPage.logic';
import { style } from './SelectTravelersPage.style';

const SelectTravelersPage = () => {
  const {
    TravelerData,
    handleBackPress,
    handleCardPress,
    selectedTravelers,
    handleButtonPress,
  } = useSelectTravelersPageLogic();

  const item = ({ item }: { item: TravelerInfo }) =>
    item.id !== null ? (
      <TravelersCard
        id={item.id}
        title={item.title}
        description={item.description}
        icon={item.icon}
        onPress={handleCardPress}
        isSelected={selectedTravelers === item.id}
      />
    ) : null;

  const separatorItem = () => <View style={style.separator} />;

  return (
    <BasicView>
      <CustomHeader
        title="SELECT_TRAVELERS.TITLE"
        icon={icons.arrowBackCircleOutline}
        onPress={handleBackPress}
      />
      <CustomText text="SELECT_TRAVELERS.DESCRIPTION" style={style.subtitle} />
      <FlatList
        data={TravelerData}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={separatorItem}
        renderItem={item}
      />
      <View style={style.buttonContainer}>
        <CustomButton
          title="SELECT_DATES.TITLE"
          onPress={handleButtonPress}
          style={style.button}
        />
      </View>
    </BasicView>
  );
};

export default SelectTravelersPage;
