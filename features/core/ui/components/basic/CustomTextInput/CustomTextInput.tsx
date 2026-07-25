import type { FC } from 'react';
import { TextInput, type TextInputProps, View } from 'react-native';
import { ButtonType } from '@/features/core/ui/components/basic/CustomButton/CustomButton.logic';
import { CustomIconButtonMedium } from '@/features/core/ui/components/basic/CustomIconButton/CustomIconButtonMedium';
import { useCustomTextInputLogic } from '@/features/core/ui/components/basic/CustomTextInput/CustomTextInput.logic';
import { styles as inputStyles } from '@/features/core/ui/components/basic/CustomTextInput/CustomTextInput.style';
import { colors } from '@/features/core/ui/style/colors';
import { icons } from '@/features/core/ui/style/icons';

type CustomTextInputProps = TextInputProps & {
  placeholder: string;
  placeholderTextColor?: string;
  isPassword?: boolean;
};

export const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  placeholderTextColor = colors.primaryGrey,
  isPassword = false,
  ...TextInputProps
}) => {
  const { state, effects } = useCustomTextInputLogic();
  const styles = inputStyles(isPassword);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={state.t(placeholder)}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input]}
        secureTextEntry={isPassword ? !state.isPasswordVisible : false}
        {...TextInputProps}
      />
      {isPassword && (
        <CustomIconButtonMedium
          iconName={state.isPasswordVisible ? icons.eye : icons.eyeOff}
          onPress={() => effects.setIsPasswordVisible(!state.isPasswordVisible)}
          buttonType={ButtonType.Ghost}
          style={styles.eyeButton}
        />
      )}
    </View>
  );
};
