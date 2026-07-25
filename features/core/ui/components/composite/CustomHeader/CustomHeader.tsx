import type { FC } from 'react';
import { View } from 'react-native';
import { ButtonType } from '@/features/core/ui/components/basic/CustomButton/CustomButton.logic';
import type { IoniconsName } from '@/features/core/ui/components/basic/CustomIcon/CustomIcon';
import { CustomIconButtonMedium } from '@/features/core/ui/components/basic/CustomIconButton/CustomIconButtonMedium';
import { CustomText } from '@/features/core/ui/components/basic/CustomText/CustomText';
import { useCustomHeaderLogic } from '@/features/core/ui/components/composite/CustomHeader/CustomHeader.logic';
import { spacing } from '@/features/core/ui/style/dimensions/spacing';

type CustomHeaderProps = {
  title?: string;
  icon?: IoniconsName;
  onPress?: () => void;
};

export const CustomHeader: FC<CustomHeaderProps> = ({ title, icon, onPress }) => {
  const { derived } = useCustomHeaderLogic();

  return (
    <View style={derived.styleComponent.container}>
      {onPress && icon && (
        <CustomIconButtonMedium
          iconName={icon}
          iconSize={spacing.Quintuple}
          onPress={onPress}
          buttonType={ButtonType.Quaternary}
          style={derived.styleComponent.icon}
        />
      )}
      {title && <CustomText text={title} style={derived.styleComponent.title} />}
    </View>
  );
};
