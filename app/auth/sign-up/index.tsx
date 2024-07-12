import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import SignUpPage from '@/components/pages/SignUpPage/SignUpPage';

const SignUp = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return <SignUpPage />;
};

export default SignUp;
