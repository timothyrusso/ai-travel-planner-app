import type { StyleProp, ViewStyle } from 'react-native';
import { CustomCard, type CustomCardProps } from '@/features/core/ui/components/basic/CustomCard/CustomCard';
import { CustomIcon, type IoniconsName } from '@/features/core/ui/components/basic/CustomIcon/CustomIcon';
import { CustomText } from '@/features/core/ui/components/basic/CustomText/CustomText';
import {
  type CustomIconCardLogicProps,
  useCustomIconTextCardLogic,
} from '@/features/core/ui/components/composite/CustomIconTextCard/CustomIconTextCard.logic';
import { spacing } from '@/features/core/ui/style/dimensions/spacing';

export type CustomIconTextCardProps = CustomIconCardLogicProps &
  CustomCardProps & {
    label: string;
    icon: IoniconsName;
    style?: StyleProp<ViewStyle>;
    iconColor?: string;
  };

export const CustomIconTextCard = ({ icon, label, style, iconColor, ...rest }: CustomIconTextCardProps) => {
  const { derived } = useCustomIconTextCardLogic(rest);
  return (
    <CustomCard style={[derived.componentStyle.card, style]} {...rest}>
      <CustomIcon
        style={derived.componentStyle.icon}
        size={spacing.Fourfold}
        name={icon}
        isOutlined
        color={iconColor}
      />
      <CustomText style={derived.componentStyle.label} text={label} numberOfLines={2} ellipsizeMode="tail" />
    </CustomCard>
  );
};
