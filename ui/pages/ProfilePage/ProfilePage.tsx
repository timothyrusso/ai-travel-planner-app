import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import BasicView from '@/ui/components/composite/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

export const ProfilePage = () => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        router.replace(Routes.welcome);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <BasicView>
      <CustomButton title="Logout" onPress={logout} />
    </BasicView>
  );
};
