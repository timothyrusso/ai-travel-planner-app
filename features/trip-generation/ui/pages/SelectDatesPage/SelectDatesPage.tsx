import { View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { BasicView, CustomScrollView, CustomText, colors } from '@/features/core/design-system';
import { Routes } from '@/features/core/navigation';
import { DateBox } from '@/features/trip-generation/ui/components/DateBox/DateBox';
import { useSelectDatesPageLogic } from '@/features/trip-generation/ui/pages/SelectDatesPage/SelectDatesPage.logic';
import { style } from '@/features/trip-generation/ui/pages/SelectDatesPage/SelectDatesPage.style';

export const SelectDatesPage = () => {
  const { state, derived, effects } = useSelectDatesPageLogic();

  return (
    <BasicView
      nameView={Routes.SelectDates}
      statusBarStyle="dark"
      bottomButtonTitle="SELECT_BUDGET.TITLE"
      bottomButtonPress={effects.handleButtonPress}
      bottomButtonDisabled={!state.startDate}
      viewStyle={style.container}
    >
      <CustomScrollView contentContainerStyle={style.contentScrollViewContainer}>
        <CustomText text="SELECT_DATES.DESCRIPTION" style={style.subtitle} />
        <View style={style.calendar}>
          <CalendarPicker
            allowRangeSelection
            minDate={derived.todayInLocalTimezone}
            maxRangeDuration={state.userTokens - 1}
            textStyle={style.calendarText}
            selectedDayColor={colors.primaryBlack}
            selectedDayTextStyle={style.calendarDayText}
            onDateChange={effects.handleDateChange}
            selectedRangeStartStyle={derived.numberOfDays !== 1 ? style.rangeSelection : null}
            key={state.calendarKey}
          />
        </View>
        {derived.startDateLabel && (
          <DateBox
            startDateLabel={derived.startDateLabel}
            endDateLabel={derived.endDateLabel}
            onClearDates={effects.removeDates}
          />
        )}
      </CustomScrollView>
    </BasicView>
  );
};
