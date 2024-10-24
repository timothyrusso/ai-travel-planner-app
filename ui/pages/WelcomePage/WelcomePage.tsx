import { routes } from '@/constants/routes';
import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import TravelAnimation from '@/ui/components/basic/TravelAnimation/TravelAnimation';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { styles } from './WelcomePage.style';

const WelcomePage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/main_logo.png')}
        style={styles.logo}
      />
      <TravelAnimation style={styles.Animation} />
      <View style={styles.buttonContainer}>
        <CustomText text={t('WELCOME.TITLE')} style={styles.title} />
        <CustomButton
          title={t('WELCOME.BUTTON')}
          onPress={() => router.push(routes.signIn)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default WelcomePage;
