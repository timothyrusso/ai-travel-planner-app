import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import { CustomTextButton } from '@/ui/components/basic/CustomTextButton/CustomTextButton';
import CustomTextInput from '@/ui/components/basic/CustomTextInput/CustomTextInput';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import { ActionModal } from '@/ui/components/dialogs/ActionModal/ActionModal';
import { InfoModal } from '@/ui/components/dialogs/InfoModal/InfoModal';
import { ResetPasswordModal } from '@/ui/components/dialogs/ResetPasswordModal/ResetPasswordModal';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { icons } from '@/ui/constants/style/icons';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSignInPageLogic } from './SignInPage.logic';
import { styles } from './SignInPage.style';

const SignInPage = () => {
  const router = useRouter();
  const { onSignIn, email, setEmail, password, setPassword, isLoading, handleResetPasswordModal } =
    useSignInPageLogic();

  return (
    <BasicView nameView={Routes.SignIn}>
      <View style={styles.container}>
        <CustomHeader title="SIGNIN.TITLE" icon={icons.close} onPress={() => router.back()} />
        <View style={styles.inputContainer}>
          <View style={styles.emailContainer}>
            <CustomText text="SIGNIN.EMAIL" style={styles.label} />
            <CustomTextInput
              placeholder="SIGNIN.EMAIL_PLACEHOLDER"
              onChangeText={(text: string) => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.passwordContainer}>
            <CustomText text="SIGNIN.PASSWORD" style={styles.label} />
            <CustomTextInput
              placeholder="SIGNIN.PASSWORD_PLACEHOLDER"
              secureTextEntry={true}
              onChangeText={(text: string) => setPassword(text)}
              value={password}
            />
            <CustomTextButton title="SIGNIN.RESET_PASSWORD" onPress={handleResetPasswordModal} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton title="SIGNIN.TITLE" onPress={onSignIn} isLoading={isLoading} />
          <CustomButton title="SIGNIN.CREATE_ACCOUNT" onPress={() => router.replace(`/${Routes.SignUp}`)} outline />
        </View>
      </View>
      <Toast />
      <ResetPasswordModal />
      <InfoModal />
      <ActionModal />
    </BasicView>
  );
};

export default SignInPage;
