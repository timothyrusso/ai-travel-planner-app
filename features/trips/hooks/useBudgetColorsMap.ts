import { useTranslation } from 'react-i18next';
import { colors } from '@/features/core/design-system';
import { BudgetOptions } from '@/features/trips/domain/entities/BudgetOptions';

export const useBudgetColorsMap = () => {
  const { t } = useTranslation();

  const budgetColorsMap = {
    [t(BudgetOptions[0].title)]: colors.purple300,
    [t(BudgetOptions[1].title)]: colors.purple500,
    [t(BudgetOptions[2].title)]: colors.purple700,
    [t(BudgetOptions[3].title)]: colors.purple900,
  };

  return { budgetColorsMap };
};
