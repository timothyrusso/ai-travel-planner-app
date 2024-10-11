import CustomButton from '@/components/basic/CustomButton/CustomButton';
import CustomIconButton from '@/components/basic/CustomIconButton/CustomIconButton';
import CustomText from '@/components/basic/CustomText/CustomText';
import CustomTextInput from '@/components/basic/CustomTextInput/CustomTextInput';
import BasicView from '@/components/composite/BasicView/BasicView';
import { colors } from '@/constants/colors';
import { dimensions } from '@/constants/dimensions';
import { icons } from '@/constants/icons';
import { routes } from '@/constants/routes';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
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
    </BasicView>
  );
};

export default SignInPage;
