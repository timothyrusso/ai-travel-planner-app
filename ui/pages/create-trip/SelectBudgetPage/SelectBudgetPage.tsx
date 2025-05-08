import type { BudgetInfo } from '@/modules/trip/domain/entities/BudgetInfo';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { FlatList, View } from 'react-native';
import CardWithIcon from '../../../components/composite/CardWithIcon/CardWithIcon';
import { BudgetData } from './SelectBudgetPage.data';
import { useSelectBudgetPageLogic } from './SelectBudgetPage.logic';
import { style } from './SelectBudgetPage.style';

const separatorItem = () => <View style={style.separator} />;

const SelectBudgetPage = () => {
  const { selectedBudget, handleCardPress, handleButtonPress } = useSelectBudgetPageLogic();

  const item = ({ item }: { item: BudgetInfo }) =>
    item.id !== null ? (
      <CardWithIcon
        id={item.id}
        title={item.title}
        description={item.description}
        icon={item.icon}
        onPress={handleCardPress}
        isSelected={selectedBudget === item.id}
      />
    ) : null;

  return (
    <BasicView
      nameView={Routes.SelectBudget}
      statusBarStyle="dark"
      bottomButtonTitle="REVIEW_TRIP.TITLE"
      bottomButtonPress={handleButtonPress}
    >
      <CustomText text="SELECT_BUDGET.DESCRIPTION" style={style.subtitle} />
      <FlatList
        data={BudgetData}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={separatorItem}
        renderItem={item}
        style={style.list}
      />
    </BasicView>
  );
};

export default SelectBudgetPage;
