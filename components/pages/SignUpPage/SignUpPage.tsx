import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { styles } from './SignUpPage.style';
import BasicView from '@/components/composite/BasicView/BasicView';
import CustomTextInput from '@/components/basic/CustomTextInput/CustomTextInput';
import CustomText from '@/components/basic/CustomText/CustomText';
import CustomButton from '@/components/basic/CustomButton/CustomButton';
import { useRouter } from 'expo-router';
import { routes } from '@/constants/routes';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '@/constants/icons';
import { dimensions } from '@/constants/dimensions';
import { colors } from '@/constants/colors';
import CustomIconButton from '@/components/basic/CustomIconButton/CustomIconButton';

const SignUpPage = () => {
  const router = useRouter();

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
          <CustomTextInput placeholder="Enter the name" />
        </View>
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
        <CustomButton
          title="Create an account"
          onPress={() => router.replace(routes.signUp)}
        />
        <CustomButton
          title="Sign In"
          onPress={() => router.replace(routes.signIn)}
          outline
        />
      </View>
    </BasicView>
  );
};

export default SignUpPage;
