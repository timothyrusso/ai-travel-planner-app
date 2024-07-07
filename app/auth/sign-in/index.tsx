import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import SignInPage from '@/components/pages/SignInPage/SignInPage';

const SignIn = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return <SignInPage />;
};

export default SignIn;
