import { routes } from '@/constants/routes';
import { icons } from '@/constants/style/icons';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import CustomTextInput from '@/ui/components/basic/CustomTextInput/CustomTextInput';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
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
    t,
  } = useSignUpPageLogic();

  return (
    <BasicView>
      <CustomHeader
        title={t('SIGNUP.TITLE')}
        icon={icons.circleClose}
        onPress={() => router.back()}
      />
      <Text style={styles.subtitle}>Create a new account!</Text>
      <View style={styles.inputContainer}>
        <View style={styles.emailContainer}>
          <CustomText text={t('SIGNUP.NAME')} style={styles.label} />
          <CustomTextInput
            placeholder={t('SIGNUP.NAME_PLACEHOLDER')}
            onChangeText={(text: string) => setFullName(text)}
            value={fullName}
          />
        </View>
        <View style={styles.emailContainer}>
          <CustomText text={t('SIGNUP.EMAIL')} style={styles.label} />
          <CustomTextInput
            placeholder={t('SIGNUP.EMAIL_PLACEHOLDER')}
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.passwordContainer}>
          <CustomText text={t('SIGNUP.PASSWORD')} style={styles.label} />
          <CustomTextInput
            placeholder={t('SIGNUP.PASSWORD_PLACEHOLDER')}
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={t('SIGNIN.CREATE_ACCOUNT')}
          onPress={onCreateAccount}
          isLoading={isLoading}
        />
        <CustomButton
          title={t('SIGNIN.TITLE')}
          onPress={() => router.replace(routes.signIn)}
          outline
        />
      </View>
      <Toast />
    </BasicView>
  );
};

export default SignUpPage;
