import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { ActivityIndicator, View } from 'react-native';
import { Languages, useChangeLanguagePageLogic } from './ChangeLanguagePage.logic';
import { styles } from './ChangeLanguagePage.style';
import { LanguageItem } from './components/LanguageItem/LanguageItem';
export const ChangeLanguagePage = () => {
  const { changeLanguageHandler, selectedLanguage, isLoading } = useChangeLanguagePageLogic();

  return (
    <BasicView nameView={Routes.ChangeLanguage}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <View style={styles.container}>
          <LanguageItem
            language="CHANGE_LANGUAGE.BUTTON.EN"
            onPress={() => changeLanguageHandler(Languages.EN)}
            isSelected={selectedLanguage === Languages.EN}
          />
          <LanguageItem
            language="CHANGE_LANGUAGE.BUTTON.IT"
            onPress={() => changeLanguageHandler(Languages.IT)}
            isSelected={selectedLanguage === Languages.IT}
          />
        </View>
      )}
    </BasicView>
  );
};
