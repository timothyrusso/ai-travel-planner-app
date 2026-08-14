import { type FC, Fragment } from 'react';
import { Cheap, colors, icons } from '@/features/core/design-system';

type HeaderChipsProps = {
  travelers: number;
  budget: string;
  date: number;
};

export const HeaderChips: FC<HeaderChipsProps> = ({ travelers, budget, date }) => {
  return (
    <Fragment>
      <Cheap title={travelers.toString()} color={colors.cyan300} icon={icons.people} />
      <Cheap title={budget} color={colors.cyan300} icon={icons.card} />
      <Cheap title={date.toString()} color={colors.lime300} icon={icons.calendar} />
    </Fragment>
  );
};
