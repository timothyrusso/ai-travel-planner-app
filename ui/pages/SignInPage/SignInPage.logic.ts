import { Routes } from '@/ui/constants/routes';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import type { AuthError } from 'firebase/auth';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useSignInPageLogic = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Invalid credentials',
    });
  };

  const onSignIn = async () => {
    if (!(email && password)) {
      showToast();
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email.toLowerCase(), password);
      router.replace(Routes.myTrip);
    } catch (error) {
      const typedError = error as AuthError;
      showToast();
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log(typedError);
    } finally {
      setLoading(false);
    }
  };

  return {
    onSignIn,
    email,
    setEmail,
    password,
    setPassword,
    isLoading: loading,
  };
};
