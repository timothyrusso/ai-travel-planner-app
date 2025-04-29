import { CustomIconButton } from '@/ui/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import type { Ionicons } from '@expo/vector-icons';
import type { FC } from 'react';
import { View } from 'react-native';
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
        <CustomIconButton icon={icon} iconSize={spacing.Quintuple} iconColor={colors.primaryBlack} onPress={onPress} />
      )}
    </View>
  );
};

export default CustomHeader;
