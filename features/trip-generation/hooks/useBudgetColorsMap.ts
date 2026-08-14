import { useTranslation } from 'react-i18next';
import { colors } from '@/features/core/design-system';
import { BudgetOptions } from '@/features/trips';

export const useBudgetColorsMap = () => {
  const { t } = useTranslation();

  // Budget is ordinal, so the four levels climb one purple ramp instead of taking four unrelated
  // hues, which read as categories.
  const budgetColorsMap = {
    [t(BudgetOptions[0].title)]: colors.purple300,
    [t(BudgetOptions[1].title)]: colors.purple500,
    [t(BudgetOptions[2].title)]: colors.purple700,
    [t(BudgetOptions[3].title)]: colors.purple900,
  };

  return { budgetColorsMap };
};
