import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import type { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { View } from 'react-native';
import { ButtonType } from '../../basic/CustomIconButton/BaseIconButton';
import { CustomIconButtonLarge } from '../../basic/CustomIconButton/CustomIconButtonLarge';
import { useCustomHeaderLogic } from './CustomHeader.logic';

type CustomHeaderProps = {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

const CustomHeader: FC<CustomHeaderProps> = ({ title, icon, onPress }) => {
  const { styleComponent } = useCustomHeaderLogic();

  return (
    <View style={styleComponent.container}>
      <CustomText text={title} style={styleComponent.title} />
      {onPress && icon && (
        <CustomIconButtonLarge
          iconName={icon}
          iconSize={spacing.Quintuple}
          onPress={onPress}
          buttonType={ButtonType.Secondary}
        />
      )}
    </View>
  );
};

export default CustomHeader;
