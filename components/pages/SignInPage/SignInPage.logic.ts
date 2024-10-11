import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../../configs/firebaseConfig';

export const useSignInPageLogic = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSignIn = async () => {
    if (!email || !password) return;

    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password
      );
      console.log(response);
    } catch (error) {
      const typedError = error as AuthError;
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
