import { BaseSkeleton } from '@/ui/components/basic/BaseSkeleton/BaseSkeleton';
import { CustomButtonLarge } from '@/ui/components/basic/CustomButton/CustomButtonLarge';
import CustomText from '@/ui/components/basic/CustomText/CustomText';
import CustomScrollView from '@/ui/components/composite/CustomScrollView/CustomScrollView';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Stacks } from '@/ui/constants/routes';
import { components } from '@/ui/constants/style/dimensions/components';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useProfilePageLogic } from './ProfilePage.logic';
import { styles } from './ProfilePage.style';

export const ProfilePage = () => {
  const {
    logout,
    deleteAccount,
    avatar,
    username,
    email,
    totalTrips,
    favoriteTrips,
    isTripDataLoading,
    goToChangeLanguage,
    isLoadingDeletingAccount,
    isLoadingLogout,
  } = useProfilePageLogic();

  return (
    <BasicView nameView={Stacks.Profile} isMenuVisible statusBarStyle="dark">
      <CustomScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <SvgXml xml={avatar} width={components.profileImageHeight} height={components.profileImageHeight} />
          </View>
        </View>
        {username && <CustomText text={username} style={styles.name} />}
        {email && <CustomText text={email} style={styles.email} />}
        {isTripDataLoading ? (
          <View style={styles.skeletonContainer}>
            <BaseSkeleton style={styles.skeleton} />
          </View>
        ) : (
          <View style={styles.userDataContainer}>
            <View style={styles.userDataItem}>
              <CustomText text="PROFILE.LABEL.TOTAL_TRIPS" style={styles.userDataLabel} />
              <CustomText text={totalTrips?.toString() ?? '0'} style={styles.userDataValue} />
            </View>
            <View style={styles.divider} />
            <View style={styles.userDataItem}>
              <CustomText text="PROFILE.LABEL.FAVORITE_TRIPS" style={styles.userDataLabel} />
              <CustomText text={favoriteTrips?.length?.toString() ?? '0'} style={styles.userDataValue} />
            </View>
          </View>
        )}
        <View style={styles.settingsContainer}>
          <CustomButtonLarge title="PROFILE.BUTTON.CHANGE_LANGUAGE" onPress={goToChangeLanguage} />
          <CustomButtonLarge
            title="PROFILE.BUTTON.DELETE_ACCOUNT"
            onPress={deleteAccount}
            isLoading={isLoadingDeletingAccount}
          />
          <CustomButtonLarge title="GLOBAL.BUTTON.LOGOUT" onPress={logout} isLoading={isLoadingLogout} />
        </View>
      </CustomScrollView>
    </BasicView>
  );
};
