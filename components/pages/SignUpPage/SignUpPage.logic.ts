import { auth } from '@/configs/firebaseConfig';
import { useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export const useSignUpPageLogic = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onCreateAccount = async () => {
    if (!email || !password || !fullName) return;

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      const { code: errorCode, message: errorMessage } = error as FirebaseError;
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
