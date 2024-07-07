import { View, Text, Image } from 'react-native';
import React from 'react';
import TravelAnimation from '@/components/basic/TravelAnimation/TravelAnimation';
import { styles } from './WelcomePage.style';
import CustomButton from '@/components/basic/CustomButton/CustomButton';
import { useRouter } from 'expo-router';
import { routes } from '@/constants/routes';

const WelcomePage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/main_logo.png')}
        style={styles.logo}
      />
      <TravelAnimation style={styles.Animation} />
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Get started"
          onPress={() => router.push(routes.signIn)}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default WelcomePage;
