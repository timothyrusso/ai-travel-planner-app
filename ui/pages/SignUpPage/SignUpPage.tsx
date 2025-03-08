import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import CustomTextInput from '@/ui/components/basic/CustomTextInput/CustomTextInput';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import { routes } from '@/ui/constants/routes';
import { icons } from '@/ui/constants/style/icons';
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSignUpPageLogic } from './SignUpPage.logic';
import { styles } from './SignUpPage.style';

const SignUpPage = () => {
  const { onCreateAccount, email, setEmail, password, setPassword, fullName, setFullName, router, isLoading } =
    useSignUpPageLogic();

  return (
    <BasicView>
      <CustomHeader title="SIGNUP.TITLE" icon={icons.circleClose} onPress={() => router.back()} />
      <Text style={styles.subtitle}>Create a new account!</Text>
      <View style={styles.inputContainer}>
        <View style={styles.emailContainer}>
          <CustomText text="SIGNUP.NAME" style={styles.label} />
          <CustomTextInput
            placeholder="SIGNUP.NAME_PLACEHOLDER"
            onChangeText={(text: string) => setFullName(text)}
            value={fullName}
          />
        </View>
        <View style={styles.emailContainer}>
          <CustomText text="SIGNUP.EMAIL" style={styles.label} />
          <CustomTextInput
            placeholder="SIGNUP.EMAIL_PLACEHOLDER"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.passwordContainer}>
          <CustomText text="SIGNUP.PASSWORD" style={styles.label} />
          <CustomTextInput
            placeholder="SIGNUP.PASSWORD_PLACEHOLDER"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title="SIGNIN.CREATE_ACCOUNT" onPress={onCreateAccount} isLoading={isLoading} />
        <CustomButton title="SIGNIN.TITLE" onPress={() => router.replace(routes.signIn)} outline />
      </View>
      <Toast />
    </BasicView>
  );
};

export default SignUpPage;
