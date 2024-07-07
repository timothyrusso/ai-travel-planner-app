import { View, Text, TextInput, TextInputProps } from 'react-native';
import React, { FC } from 'react';
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
