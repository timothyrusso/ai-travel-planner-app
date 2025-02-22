import { auth } from '@/configs/firebaseConfig';
import { routes } from '@/constants/routes';
import { router } from 'expo-router';
import { type AuthError, signInWithEmailAndPassword } from 'firebase/auth';
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
    if (!email || !password) {
      showToast();
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
      router.replace(routes.myTrip);
    } catch (error) {
      const typedError = error as AuthError;
      showToast();
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
