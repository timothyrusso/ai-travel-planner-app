import React, { FC } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { styles } from './CustomTextInput.style';

type CustomTextInputProps = TextInputProps & {
  placeholder: string;
};

const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  ...TextInputProps
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        {...TextInputProps}
      />
    </View>
  );
};

export default CustomTextInput;
