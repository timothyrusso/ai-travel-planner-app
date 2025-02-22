import { routes } from '@/constants/routes';
import { icons } from '@/constants/style/icons';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import CustomTextInput from '@/ui/components/basic/CustomTextInput/CustomTextInput';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSignInPageLogic } from './SignInPage.logic';
import { styles } from './SignInPage.style';

const SignInPage = () => {
  const router = useRouter();
  const { onSignIn, email, setEmail, password, setPassword, isLoading } = useSignInPageLogic();

  return (
    <BasicView>
      <CustomHeader title="SIGNIN.TITLE" icon={icons.circleClose} onPress={() => router.back()} />
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
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title="SIGNIN.TITLE" onPress={onSignIn} isLoading={isLoading} />
        <CustomButton title="SIGNIN.CREATE_ACCOUNT" onPress={() => router.replace(routes.signUp)} outline />
      </View>
      <Toast />
    </BasicView>
  );
};

export default SignInPage;
