import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import LottieAnimation from '@/ui/components/basic/LottieAnimation/LottieAnimation';
import React from 'react';
import { Image, View } from 'react-native';
import { useWelcomePageLogic } from './WelcomePage.logic';
import { styles } from './WelcomePage.style';

const WelcomePage = () => {
  const { handlePress, animation } = useWelcomePageLogic();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/main_logo.png')}
        style={styles.logo}
      />
      <LottieAnimation style={styles.animation} animationPath={animation} />
      <View style={styles.buttonContainer}>
        <CustomText text="WELCOME.TITLE" style={styles.title} />
        <CustomButton
          title="WELCOME.BUTTON"
          onPress={handlePress}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default WelcomePage;
