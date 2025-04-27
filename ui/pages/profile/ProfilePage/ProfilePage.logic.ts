import { Routes, Stacks } from '@/ui/constants/routes';
import { components } from '@/ui/constants/style/dimensions/components';
import { useGetUserTripsQuery } from '@/ui/queries/trips/query/useGetUserTripsQuery';
import { miniavs } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
import { useState } from 'react';

export const useProfilePageLogic = () => {
  const { data, isLoading } = useGetUserTripsQuery();
  const [isLoadingDeletingAccount, setIsLoadingDeletingAccount] = useState<boolean>(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

  const logout = () => {
    setIsLoadingLogout(true);
    auth()
      .signOut()
      .then(() => {
        router.replace(`/${Routes.Welcome}`);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoadingLogout(false);
      });
  };

  const deleteAccount = () => {
    setIsLoadingDeletingAccount(true);
    auth()
      .currentUser?.delete()
      .then(() => {
        router.replace(`/${Routes.Welcome}`);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoadingDeletingAccount(false);
      });
  };

  const avatar = createAvatar(miniavs, {
    seed: 'Kitty',
    radius: components.profileImageHeight / 2,
  }).toString();

  const username = auth().currentUser?.displayName;
  const email = auth().currentUser?.email;

  const totalTrips = data?.totalTrips;
  const favoriteTrips = data?.favoriteTrips;

  const goToChangeLanguage = () => {
    router.push(`/${Stacks.Profile}/${Routes.ChangeLanguage}`);
  };

  return {
    logout,
    deleteAccount,
    avatar,
    username,
    email,
    totalTrips,
    favoriteTrips,
    isTripDataLoading: isLoading,
    goToChangeLanguage,
    isLoadingDeletingAccount,
    isLoadingLogout,
  };
};
