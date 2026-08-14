import { useTranslation } from 'react-i18next';
import { colors } from '@/features/core/design-system';
import { BudgetOptions } from '@/features/trips/domain/entities/BudgetOptions';

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

  // The label has to climb with the fill: black stays legible on the lightest step only, white on
  // the three saturated ones. Kept beside the fills so the pair can never drift apart.
  const budgetLabelColorsMap = {
    [t(BudgetOptions[0].title)]: colors.primaryBlack,
    [t(BudgetOptions[1].title)]: colors.primaryWhite,
    [t(BudgetOptions[2].title)]: colors.primaryWhite,
    [t(BudgetOptions[3].title)]: colors.primaryWhite,
  };

  return { budgetColorsMap, budgetLabelColorsMap };
};
