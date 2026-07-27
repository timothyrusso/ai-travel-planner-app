import { styles } from '@/features/core/design-system/components/composite/CustomNumberButton/CustomNumberButton.style';
import { colors } from '@/features/core/design-system/style/colors';

export type CustomNumberButtonLogicProps = {
  selected?: boolean;
};

export const useCustomNumberButtonLogic = ({ selected = false }: CustomNumberButtonLogicProps) => {
  const labelColor = selected ? colors.primaryWhite : colors.primaryBlack;

  const componentStyle = styles(labelColor);

  return {
    derived: {
      componentStyle,
    },
  };
};
