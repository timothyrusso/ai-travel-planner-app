import { useModalState } from '@/ui/state/modal/useModalState';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export const useResetPasswordModalLogic = () => {
  const { modalActions, modalSelectors } = useModalState();

  const closeModal = () => modalActions.hideResetPasswordModal();

  const [email, setEmail] = useState<string>('');

  const showToast = (text: string, type: 'error' | 'success' = 'error') => {
    Toast.show({
      type: type,
      text1: text,
    });
  };

  const emailRegex = /\S+@\S+\.\S+/;

  const handleResetPasswordButton = async () => {
    if (!emailRegex.test(email)) {
      showToast('GLOBAL.ERROR.INVALID_EMAIL', 'error');
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);
      showToast('SIGNIN.RESET_PASSWORD_SENT', 'success');
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    closeModal,
    isVisible: modalSelectors.resetPasswordModal().isVisible,
    email,
    setEmail,
    handleResetPasswordButton,
  };
};
