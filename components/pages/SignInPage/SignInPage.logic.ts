import { useState } from 'react';
import { auth } from '../../../configs/firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthError,
} from 'firebase/auth';

export const useSignInPageLogic = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const typedError = error as AuthError;
      console.log(typedError);
    } finally {
      setLoading(false);
    }
  };

  return { signIn, email, setEmail, password, setPassword, isLoading: loading };
};
