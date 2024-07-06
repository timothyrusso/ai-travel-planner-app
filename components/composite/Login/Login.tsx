import { View, Text, Image } from 'react-native';
import React from 'react';
import TravelAnimation from '@/components/basic/TravelAnimation/TravelAnimation';
import { styles } from './Login.style';
import Button from '@/components/basic/Button/Button';

const Login = () => {
  return (
    <View>
      <Image
        source={require('../../../assets/images/main_logo.png')}
        style={styles.logo}
      />
      <TravelAnimation style={styles.Animation} />
      <Button
        title="Login"
        onPress={() => console.log('Login')}
        style={styles.button}
      />
    </View>
  );
};

export default Login;
