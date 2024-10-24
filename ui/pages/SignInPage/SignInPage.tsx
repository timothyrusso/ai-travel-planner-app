import { routes } from '@/constants/routes';
import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { icons } from '@/constants/style/icons';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomIconButton from '@/ui/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import CustomTextInput from '@/ui/components/basic/CustomTextInput/CustomTextInput';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSignInPageLogic } from './SignInPage.logic';
import { styles } from './SignInPage.style';

const SignInPage = () => {
  const router = useRouter();
  const { onSignIn, email, setEmail, password, setPassword, isLoading, t } =
    useSignInPageLogic();

  return (
    <BasicView>
      <View style={styles.header}>
        <CustomText text={t('SIGNIN.TITLE')} style={styles.title} />
        <CustomIconButton
          icon={icons.circleClose}
          iconSize={dimensions.Fourfold + dimensions.MinimalDouble}
          iconColor={colors.primaryBlack}
          onPress={() => router.back()}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.emailContainer}>
          <CustomText text={t('SIGNIN.EMAIL')} style={styles.label} />
          <CustomTextInput
            placeholder={t('SIGNIN.EMAIL_PLACEHOLDER')}
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.passwordContainer}>
          <CustomText text={t('SIGNIN.PASSWORD')} style={styles.label} />
          <CustomTextInput
            placeholder={t('SIGNIN.PASSWORD_PLACEHOLDER')}
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={t('SIGNIN.TITLE')}
          onPress={onSignIn}
          isLoading={isLoading}
        />
        <CustomButton
          title={t('SIGNIN.CREATE_ACCOUNT')}
          onPress={() => router.replace(routes.signUp)}
          outline
        />
      </View>
      <Toast />
    </BasicView>
  );
};

export default SignInPage;
