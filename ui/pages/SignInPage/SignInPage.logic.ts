import { Routes } from '@/ui/constants/routes';
import { useModalState } from '@/ui/state/modal/useModalState';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import type { AuthError } from 'firebase/auth';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useSignInPageLogic = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = (text: string, type: 'error' | 'success' = 'error') => {
    Toast.show({
      type: type,
      text1: text,
    });
  };

  const { modalActions } = useModalState();

  const emailRegex = /\S+@\S+\.\S+/;

  const onSignIn = async () => {
    if (!(emailRegex.test(email) && password)) {
      showToast('GLOBAL.ERROR.INVALID_CREDENTIALS', 'error');
      return;
    }

    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email.toLowerCase(), password);
      router.replace(Routes.myTrip);
    } catch (error) {
      const typedError = error as AuthError;
      showToast('GLOBAL.ERROR.INVALID_CREDENTIALS', 'error');
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(typedError);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordButton = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      showToast('SIGNIN.RESET_PASSWORD_SENT', 'success');
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetPasswordModal = () => {
    modalActions.showResetPasswordModal({
      headerTitle: 'SIGNIN.RESET_PASSWORD_TITLE',
      primaryAction: handleResetPasswordButton,
    });
  };

  return {
    onSignIn,
    email,
    setEmail,
    password,
    setPassword,
    isLoading: loading,
    handleResetPasswordButton,
    handleResetPasswordModal,
  };
};
