import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { type StyleProp, Text, type TextProps, type ViewStyle } from 'react-native';
import { styles } from './CustomText.style';

type CustomTextProps = TextProps & {
  text: string;
  style?: StyleProp<ViewStyle>;
};
const CustomText: FC<CustomTextProps> = ({ text, style, ...textProps }) => {
  const { t } = useTranslation();
  return (
    <Text style={[styles.text, style]} {...textProps}>
      {t(text)}
    </Text>
  );
};

export default CustomText;
