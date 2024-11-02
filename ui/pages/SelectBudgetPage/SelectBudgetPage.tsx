import { icons } from '@/constants/style/icons';
import { BudgetInfo } from '@/modules/trip/domain/entities/BudgetInfo';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import React from 'react';
import { FlatList, View } from 'react-native';
import CardWithIcon from '../../components/composite/CardWithIcon/CardWithIcon';
import { BudgetData } from './SelectBudgetPage.data';
import { useSelectBudgetPageLogic } from './SelectBudgetPage.logic';
import { style } from './SelectBudgetPage.style';

const SelectBudgetPage = () => {
  const {
    handleBackPress,
    selectedBudget,
    handleCardPress,
    handleButtonPress,
  } = useSelectBudgetPageLogic();

  const separatorItem = () => <View style={style.separator} />;

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
    <BasicView>
      <CustomHeader
        title="SELECT_BUDGET.TITLE"
        icon={icons.arrowBackCircleOutline}
        onPress={handleBackPress}
      />
      <CustomText text="SELECT_BUDGET.DESCRIPTION" style={style.subtitle} />
      <FlatList
        data={BudgetData}
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

export default SelectBudgetPage;
