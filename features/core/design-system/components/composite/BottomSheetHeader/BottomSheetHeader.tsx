import type { FC } from 'react';
import { View } from 'react-native';
import { ButtonType } from '@/features/core/design-system/components/basic/CustomButton/CustomButton.logic';
import { CustomIconButtonMedium } from '@/features/core/design-system/components/basic/CustomIconButton/CustomIconButtonMedium';
import { CustomText } from '@/features/core/design-system/components/basic/CustomText/CustomText';
import { styles } from '@/features/core/design-system/components/composite/BottomSheetHeader/BottomSheetHeader.style';
import { icons } from '@/features/core/design-system/style/icons';

type BottomSheetHeaderProps = {
  title: string;
  onClose: () => void;
};

export const BottomSheetHeader: FC<BottomSheetHeaderProps> = ({ title, onClose }) => (
  <View style={styles.container}>
    <CustomText text={title} style={styles.title} numberOfLines={2} ellipsizeMode="tail" />
    <CustomIconButtonMedium iconName={icons.close} buttonType={ButtonType.Quaternary} onPress={onClose} />
  </View>
);
