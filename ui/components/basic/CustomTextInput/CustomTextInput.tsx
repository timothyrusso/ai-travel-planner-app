import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TextInput, TextInputProps, View } from 'react-native';
import { styles } from './CustomTextInput.style';

type CustomTextInputProps = TextInputProps & {
  placeholder: string;
};

const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  ...TextInputProps
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t(placeholder)}
        style={styles.input}
        {...TextInputProps}
      />
    </View>
  );
};

export default CustomTextInput;
