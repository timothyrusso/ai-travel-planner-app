import { Routes } from '@/ui/constants/routes';
import auth, { updateProfile } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import type { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useSignUpPageLogic = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Invalid credentials',
    });
  };

  const emailRegex = /\S+@\S+\.\S+/;

  const onCreateAccount = async () => {
    if (!(emailRegex.test(email) && password && fullName)) {
      showToast();
      return;
    }

    setLoading(true);

    try {
      const result = await auth().createUserWithEmailAndPassword(email.toLowerCase(), password);
      updateProfile(result.user, {
        displayName: fullName,
      });
      router.replace(Routes.myTrip);
    } catch (error) {
      const { code: errorCode, message: errorMessage } = error as FirebaseError;
      showToast();
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log(errorCode, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    onCreateAccount,
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    router,
    isLoading: loading,
  };
};
