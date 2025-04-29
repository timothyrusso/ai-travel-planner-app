import { CustomIcon } from '@/ui/components/basic/CustomIcon/CustomIcon';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { icons } from '@/ui/constants/style/icons';
import type { FC } from 'react';
import { Pressable } from 'react-native';
import { styles } from './LanguageItem.style';

type LanguageItemProps = {
  language: string;
  onPress: () => void;
  isSelected: boolean;
};

export const LanguageItem: FC<LanguageItemProps> = ({ language, onPress, isSelected }) => {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed ? styles.pressed : {}]} onPress={onPress}>
      <CustomText text={language} style={styles.language} />
      {isSelected && <CustomIcon name={icons.success} />}
    </Pressable>
  );
};
