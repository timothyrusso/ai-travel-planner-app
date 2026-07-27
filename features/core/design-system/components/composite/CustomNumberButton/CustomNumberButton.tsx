import type { StyleProp, ViewStyle } from 'react-native';
import { CustomCard, type CustomCardProps } from '@/features/core/design-system/components/basic/CustomCard/CustomCard';
import { CustomText } from '@/features/core/design-system/components/basic/CustomText/CustomText';
import {
  type CustomNumberButtonLogicProps,
  useCustomNumberButtonLogic,
} from '@/features/core/design-system/components/composite/CustomNumberButton/CustomNumberButton.logic';

export type CustomNumberButtonProps = CustomNumberButtonLogicProps &
  CustomCardProps & {
    label: string;
    style?: StyleProp<ViewStyle>;
  };

export const CustomNumberButton = ({ label, style, ...rest }: CustomNumberButtonProps) => {
  const { derived } = useCustomNumberButtonLogic(rest);
  return (
    <CustomCard style={[derived.componentStyle.card, style]} {...rest}>
      <CustomText style={derived.componentStyle.label} text={label} numberOfLines={2} ellipsizeMode="tail" />
    </CustomCard>
  );
};
