import { Platform, View } from 'react-native';
import { BasicView, PlatformOS } from '@/features/core/design-system';
import { Routes } from '@/features/core/navigation';
import { DetailsBox } from '@/features/trips/ui/components/DetailsBox/DetailsBox';
import { EmptyListContainer } from '@/features/trips/ui/components/EmptyListContainer/EmptyListContainer';
import { HeroImage } from '@/features/trips/ui/components/HeroImage/HeroImage';
import { HomeSkeleton } from '@/features/trips/ui/components/HomeSkeleton/HomeSkeleton';
import { useUpcomingTripPageLogic } from '@/features/trips/ui/pages/UpcomingTripPage/UpcomingTripPage.logic';
import { styles } from '@/features/trips/ui/pages/UpcomingTripPage/UpcomingTripPage.style';

const basicViewProps = {
  nameView: Routes.HomePage,
  isFullScreen: true,
  isMenuVisible: true,
  statusBarStyle: 'light',
} as const;

export const UpcomingTripPage = () => {
  const { state, derived, effects } = useUpcomingTripPageLogic();

  if (state.isLoading) {
    return (
      <BasicView {...basicViewProps}>
        <HomeSkeleton />
      </BasicView>
    );
  }

  if (!state.lastCreatedTrip) {
    return (
      <BasicView {...basicViewProps}>
        <EmptyListContainer />
      </BasicView>
    );
  }

  return (
    <BasicView {...basicViewProps}>
      <View style={styles.container}>
        <HeroImage
          image={state.image}
          imageBlurHash={state.imageBlurHash}
          blurTargetRef={state.blurTargetRef}
          onError={effects.retryCoverImage}
        />
        <DetailsBox
          location={derived.location}
          tripId={state.tripId}
          tripStartDate={state.tripStartDate}
          style={styles.detailsBox}
          totalTrips={state.totalTrips}
          blurTargetRef={Platform.OS === PlatformOS.android ? state.blurTargetRef : undefined}
        />
      </View>
    </BasicView>
  );
};
