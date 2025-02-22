import SignUpPage from '@/ui/pages/SignUpPage/SignUpPage';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

const SignUp = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return <SignUpPage />;
};

export default SignUp;
