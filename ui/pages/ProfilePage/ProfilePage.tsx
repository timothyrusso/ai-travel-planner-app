import CustomButton from '@/ui/components/basic/CustomButton/CustomButton';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes, Stacks } from '@/ui/constants/routes';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';

export const ProfilePage = () => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        router.replace(`/${Routes.Welcome}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteAccount = () => {
    auth()
      .currentUser?.delete()
      .then(() => {
        router.replace(`/${Routes.Welcome}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <BasicView nameView={Stacks.Profile}>
      <CustomButton title="Logout" onPress={logout} />
      <CustomButton title="Delete Account" onPress={deleteAccount} />
    </BasicView>
  );
};
