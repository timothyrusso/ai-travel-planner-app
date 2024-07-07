import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { styles } from './SignInPage.style';
import BasicView from '@/components/composite/BasicView/BasicView';
import CustomTextInput from '@/components/basic/CustomTextInput/CustomTextInput';
import CustomText from '@/components/basic/CustomText/CustomText';
import CustomButton from '@/components/basic/CustomButton/CustomButton';
import { useRouter } from 'expo-router';
import { routes } from '@/constants/routes';

const SignInPage = () => {
  const router = useRouter();

  return (
    <BasicView>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        <View style={styles.emailContainer}>
          <CustomText text="Email" style={styles.label} />
          <CustomTextInput placeholder="Enter the email" />
        </View>
        <View style={styles.passwordContainer}>
          <CustomText text="Password" style={styles.label} />
          <CustomTextInput
            placeholder="Enter the password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title="Sign In" onPress={() => {}} />
        <CustomButton
          title="Create an account"
          onPress={() => router.replace(routes.signUp)}
          outline
        />
      </View>
    </BasicView>
  );
};

export default SignInPage;
