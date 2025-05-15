import { CustomIcon } from '@/ui/components/basic/CustomIcon/CustomIcon';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import type { FC } from 'react';
import { View } from 'react-native';
import { style } from './DateBox.style';

type DateBoxProps = {
  startDateLabel: string;
  endDateLabel: string;
};

export const DateBox: FC<DateBoxProps> = ({ startDateLabel, endDateLabel }) => {
  return (
    <View style={style.dateLabelContainer}>
      <View style={style.rowLabelContainer}>
        <View style={style.labelContainer}>
          <CustomIcon name={icons.calendar} size={spacing.Triple} color={colors.primaryBlack} />
          <CustomText text="SELECT_DATES.START_DATE" style={style.dateLabel} />
        </View>
        <CustomText text={startDateLabel} style={style.dateValue} />
      </View>
      <View style={style.rowLabelContainer}>
        <View style={style.labelContainer}>
          <CustomIcon name={icons.airplane} size={spacing.Triple} color={colors.primaryBlack} style={style.icon} />
          <CustomText text="SELECT_DATES.END_DATE" style={style.dateLabel} />
        </View>
        <CustomText text={endDateLabel ? endDateLabel : startDateLabel} style={style.dateValue} />
      </View>
      {startDateLabel && !endDateLabel && (
        <View style={style.singleDayLabelContainer}>
          <CustomText text="SELECT_DATES.SINGLE_DAY" style={style.singleDayLabel} />
        </View>
      )}
    </View>
  );
};
