import { auth } from '@/configs/firebaseConfig';
import { routes } from '@/constants/routes';
import { useRouter } from 'expo-router';
import type { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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

  const onCreateAccount = async () => {
    if (!email || !password || !fullName) {
      showToast();
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace(routes.myTrip);
    } catch (error) {
      const { code: errorCode, message: errorMessage } = error as FirebaseError;
      showToast();
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
