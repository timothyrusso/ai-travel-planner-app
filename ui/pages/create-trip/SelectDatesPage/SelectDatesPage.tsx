import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useSelectDatesPageLogic } from './SelectDatesPage.logic';
import { style } from './SelectDatesPage.style';

const SelectDatesPage = () => {
  const { handleButtonPress, todayInLocalTimezone, handleDateChange, startDate, numberOfDays } =
    useSelectDatesPageLogic();

  return (
    <BasicView
      nameView={Routes.SelectDates}
      statusBarStyle="dark"
      bottomButtonTitle="SELECT_BUDGET.TITLE"
      bottomButtonPress={handleButtonPress}
      bottomButtonDisabled={!startDate}
      viewStyle={style.container}
    >
      <CustomText text="SELECT_DATES.DESCRIPTION" style={style.subtitle} />
      <View style={style.calendar}>
        <CalendarPicker
          allowRangeSelection
          minDate={todayInLocalTimezone}
          textStyle={style.calendarText}
          selectedDayColor={colors.primaryBlack}
          selectedDayTextStyle={style.calendarDayText}
          width={spacing.calendarWidth}
          onDateChange={handleDateChange}
          selectedRangeStartStyle={numberOfDays !== 1 ? style.rangeSelection : null}
        />
      </View>
    </BasicView>
  );
};

export default SelectDatesPage;
