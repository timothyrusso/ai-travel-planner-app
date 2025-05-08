import type { TravelerInfo } from '@/modules/trip/domain/entities/TravelerInfo';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { FlatList, View } from 'react-native';
import CardWithIcon from '../../../components/composite/CardWithIcon/CardWithIcon';
import { useSelectTravelersPageLogic } from './SelectTravelersPage.logic';
import { style } from './SelectTravelersPage.style';

const separatorItem = () => <View style={style.separator} />;

const SelectTravelersPage = () => {
  const { TravelerData, handleCardPress, selectedTravelers, handleButtonPress } = useSelectTravelersPageLogic();

  const item = ({ item }: { item: TravelerInfo }) =>
    item.id !== null ? (
      <CardWithIcon
        id={item.id}
        title={item.title}
        description={item.description}
        icon={item.icon}
        onPress={handleCardPress}
        isSelected={selectedTravelers === item.id}
      />
    ) : null;

  return (
    <BasicView
      nameView={Routes.SelectTraveler}
      statusBarStyle="dark"
      bottomButtonTitle="SELECT_DATES.TITLE"
      bottomButtonPress={handleButtonPress}
    >
      <CustomText text="SELECT_TRAVELERS.DESCRIPTION" style={style.subtitle} />
      <FlatList
        data={TravelerData}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={separatorItem}
        renderItem={item}
        style={style.list}
      />
    </BasicView>
  );
};

export default SelectTravelersPage;
