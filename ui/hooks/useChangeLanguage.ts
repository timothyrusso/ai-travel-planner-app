import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useChangeLanguage = () => {
  const { i18n } = useTranslation();
  const initialLanguage = Localization.getLocales()[0].languageCode ?? 'en';

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage(initialLanguage);
    }
    return savedLanguage;
  };

  useEffect(() => {
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  return { changeLanguage, loadLanguage };
};
