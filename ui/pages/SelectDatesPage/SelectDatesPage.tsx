import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useSelectDatesPageLogic } from './SelectDatesPage.logic';
import { style } from './SelectDatesPage.style';

const SelectDatesPage = () => {
  const { handleBackPress, handleButtonPress, todayInLocalTimezone, handleDateChange, startDate } =
    useSelectDatesPageLogic();

  return (
    <BasicView nameView={Routes.SelectDates}>
      <CustomHeader title="SELECT_DATES.TITLE" icon={icons.arrowBack} onPress={handleBackPress} />
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
