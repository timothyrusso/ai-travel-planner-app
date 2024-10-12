import CustomButton from '@/components/basic/CustomButton/CustomButton';
import CustomIconButton from '@/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/components/basic/CustomText/CustomText';
import CustomTextInput from '@/components/basic/CustomTextInput/CustomTextInput';
import BasicView from '@/components/composite/BasicView/BasicView';
import { colors } from '@/constants/colors';
import { dimensions } from '@/constants/dimensions';
import { icons } from '@/constants/icons';
import { routes } from '@/constants/routes';
import React from 'react';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSignUpPageLogic } from './SignUpPage.logic';
import { styles } from './SignUpPage.style';

const SignUpPage = () => {
  const {
    onCreateAccount,
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    router,
    isLoading,
  } = useSignUpPageLogic();

  return (
    <BasicView>
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
        <CustomIconButton
          icon={icons.circleClose}
          iconSize={dimensions.Fourfold + dimensions.MinimalDouble}
          iconColor={colors.primaryBlack}
          onPress={() => router.back()}
        />
      </View>
      <Text style={styles.subtitle}>Create a new account!</Text>
      <View style={styles.inputContainer}>
        <View style={styles.emailContainer}>
          <CustomText text="Name" style={styles.label} />
          <CustomTextInput
            placeholder="Enter the full name"
            onChangeText={(text: string) => setFullName(text)}
            value={fullName}
          />
        </View>
        <View style={styles.emailContainer}>
          <CustomText text="Email" style={styles.label} />
          <CustomTextInput
            placeholder="Enter the email"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.passwordContainer}>
          <CustomText text="Password" style={styles.label} />
          <CustomTextInput
            placeholder="Enter the password"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Create an account"
          onPress={onCreateAccount}
          isLoading={isLoading}
        />
        <CustomButton
          title="Sign In"
          onPress={() => router.replace(routes.signIn)}
          outline
        />
      </View>
      <Toast />
    </BasicView>
  );
};

export default SignUpPage;
