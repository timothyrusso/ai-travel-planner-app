import type { FC } from 'react';
import { View } from 'react-native';
import { ButtonType } from '@/features/core/design-system/components/basic/CustomButton/CustomButton.logic';
import type { IoniconsName } from '@/features/core/design-system/components/basic/CustomIcon/CustomIcon';
import { CustomIconButtonMedium } from '@/features/core/design-system/components/basic/CustomIconButton/CustomIconButtonMedium';
import { CustomText } from '@/features/core/design-system/components/basic/CustomText/CustomText';
import { useCustomHeaderLogic } from '@/features/core/design-system/components/composite/CustomHeader/CustomHeader.logic';
import { spacing } from '@/features/core/design-system/style/dimensions/spacing';

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
