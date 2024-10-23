import SignInPage from '@/ui/pages/SignInPage/SignInPage';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';

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
