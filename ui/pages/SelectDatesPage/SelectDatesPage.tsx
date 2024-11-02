import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { icons } from '@/constants/style/icons';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import React from 'react';
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useSelectDatesPageLogic } from './SelectDatesPage.logic';
import { style } from './SelectDatesPage.style';

const SelectDatesPage = () => {
  const {
    handleBackPress,
    handleButtonPress,
    todayInLocalTimezone,
    handleDateChange,
    startDate,
  } = useSelectDatesPageLogic();

  return (
    <BasicView>
      <CustomHeader
        title="SELECT_DATES.TITLE"
        icon={icons.arrowBackCircleOutline}
        onPress={handleBackPress}
      />
      <View style={style.calendar}>
        <CalendarPicker
          allowRangeSelection
          minDate={todayInLocalTimezone}
          textStyle={style.calendarText}
          selectedDayColor={colors.primaryBlack}
          selectedDayTextStyle={style.calendarDayText}
          width={dimensions.calendarWidth}
          onDateChange={handleDateChange}
        />
      </View>
      <View style={style.buttonContainer}>
        <CustomButton
          title="SELECT_BUDGET.TITLE"
          onPress={handleButtonPress}
          style={style.button}
          isDisabled={!startDate}
        />
      </View>
    </BasicView>
  );
};

export default SelectDatesPage;
