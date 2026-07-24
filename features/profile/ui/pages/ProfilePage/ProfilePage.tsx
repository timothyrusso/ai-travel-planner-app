import { View } from 'react-native';
import { Stacks } from '@/features/core/navigation';
import { BaseSkeleton, BasicView, CustomImage, CustomScrollView, CustomText, icons } from '@/features/core/ui';
import { ButtonsContainer } from '@/features/profile/ui/components/ButtonsContainer/ButtonsContainer';
import { UserDataBox } from '@/features/profile/ui/components/UserDataBox/UserDataBox';
import { useProfilePageLogic } from '@/features/profile/ui/pages/ProfilePage/ProfilePage.logic';
import { styles } from '@/features/profile/ui/pages/ProfilePage/ProfilePage.style';

export const ProfilePage = () => {
  const { state, derived, effects } = useProfilePageLogic();

  return (
    <BasicView nameView={Stacks.Profile} isMenuVisible statusBarStyle="dark" hasHeader={false}>
      <CustomScrollView contentContainerStyle={styles.contentContainer}>
        {derived.isUserLoading ? (
          <View style={styles.avatarContainer}>
            <BaseSkeleton style={styles.avatarSkeleton} />
            <BaseSkeleton style={styles.nameSkeleton} />
          </View>
        ) : (
          <>
            <View style={styles.avatar}>
              <CustomImage source={{ uri: derived.profileImage }} style={styles.avatarImage} />
            </View>
            {state.username && <CustomText text={state.username} style={styles.name} />}
          </>
        )}
        {state.isTripDataLoading ? (
          <View style={styles.skeletonContainer}>
            <BaseSkeleton style={styles.skeleton} />
          </View>
        ) : (
          <UserDataBox
            totalTrips={state.totalTrips}
            favoriteTrips={state.favoriteTrips}
            userTokens={state.userTokens}
            onPress={effects.goToShowAllTrips}
          />
        )}
        <View style={styles.settingsContainer}>
          <ButtonsContainer
            firstTitle="PROFILE.BUTTON.CHANGE_LANGUAGE"
            firstOnPress={effects.goToChangeLanguage}
            firstIcon={icons.language}
            secondTitle="PROFILE.BUTTON.ACCOUNT_SETTINGS"
            secondOnPress={effects.goToAccountSettings}
            secondIcon={icons.settings}
          />
        </View>
      </CustomScrollView>
    </BasicView>
  );
};
