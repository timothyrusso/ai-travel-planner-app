import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useCustomTextInputLogic = () => {
  const { t } = useTranslation();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return {
    state: {
      isPasswordVisible,
      t,
    },
    effects: {
      setIsPasswordVisible,
    },
  };
};
