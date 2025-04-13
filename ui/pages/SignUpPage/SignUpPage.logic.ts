import { Routes } from '@/ui/constants/routes';
import { useModalState } from '@/ui/state/modal/useModalState';
import auth, { sendEmailVerification, updateProfile } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import type { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useSignUpPageLogic = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { modalActions } = useModalState();

  const router = useRouter();

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'GLOBAL.ERROR.INVALID_CREDENTIALS',
    });
  };

  const emailRegex = /\S+@\S+\.\S+/;

  const showInfoModal = () => {
    modalActions.showInfoModal({
      primaryAction: () => router.replace(Routes.signIn),
      description: 'SIGNUP.EMAIL_VERIFICATION_DESCRIPTION',
    });
  };

  const onCreateAccount = async () => {
    if (!(emailRegex.test(email) && password && password === confirmPassword && fullName)) {
      showToast();
      return;
    }

    setLoading(true);

    try {
      const result = await auth().createUserWithEmailAndPassword(email.toLowerCase(), password);
      updateProfile(result.user, {
        displayName: fullName,
      });
      sendEmailVerification(result.user);
      showInfoModal();
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
    confirmPassword,
    setConfirmPassword,
    fullName,
    setFullName,
    router,
    isLoading: loading,
  };
};
