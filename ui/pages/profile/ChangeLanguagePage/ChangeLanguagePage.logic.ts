import { useChangeLanguage } from '@/ui/hooks/useChangeLanguage';
import * as Localization from 'expo-localization';
import { useEffect, useState } from 'react';

export enum Languages {
  IT = 'it',
  EN = 'en',
}

export const useChangeLanguagePageLogic = () => {
  const initialLanguage = Localization.getLocales()[0].languageCode ?? 'en';

  const [selectedLanguage, setSelectedLanguage] = useState<Languages>(initialLanguage as Languages);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { changeLanguage, loadLanguage } = useChangeLanguage();

  useEffect(() => {
    const loadLanguageHandler = async () => {
      const startingLanguage = await loadLanguage();
      setSelectedLanguage(startingLanguage as Languages);
      setIsLoading(false);
    };
    loadLanguageHandler();
  }, []);

  const changeLanguageHandler = (lang: Languages) => {
    changeLanguage(lang);
    setSelectedLanguage(lang);
  };

  return { changeLanguageHandler, selectedLanguage, isLoading };
};
