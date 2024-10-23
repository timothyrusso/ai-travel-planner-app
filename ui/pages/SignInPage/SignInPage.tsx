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
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useSignInPageLogic } from './SignInPage.logic';
import { styles } from './SignInPage.style';

const SignInPage = () => {
  const router = useRouter();
  const { onSignIn, email, setEmail, password, setPassword, isLoading } =
    useSignInPageLogic();

  return (
    <BasicView>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
        <CustomIconButton
          icon={icons.circleClose}
          iconSize={dimensions.Fourfold + dimensions.MinimalDouble}
          iconColor={colors.primaryBlack}
          onPress={() => router.back()}
        />
      </View>
      <View style={styles.inputContainer}>
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
          title="Sign In"
          onPress={onSignIn}
          isLoading={isLoading}
        />
        <CustomButton
          title="Create an account"
          onPress={() => router.replace(routes.signUp)}
          outline
        />
      </View>
      <Toast />
    </BasicView>
  );
};

export default SignInPage;
