import * as Haptics from 'expo-haptics';
import { useRef } from 'react';
import { Platform, type View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlatformOS, spacing } from '@/features/core/design-system';
import { navigationService } from '@/features/core/navigation';
import { useGetTrips } from '@/features/trips/facades/useGetTrips';
import { useGetUpcomingTrip } from '@/features/trips/facades/useGetUpcomingTrip';
import { useRetryCoverImage } from '@/features/trips/facades/useRetryCoverImage';
import { useStartNewTrip } from '@/features/trips/facades/useStartNewTrip';
import { styles } from '@/features/trips/ui/pages/UpcomingTripPage/UpcomingTripPage.style';

export const useUpcomingTripPageLogic = () => {
  const { upcomingTrip, isLoading } = useGetUpcomingTrip();
  const { totalTrips } = useGetTrips();
  const { canStart } = useStartNewTrip();
  const { top, bottom } = useSafeAreaInsets();

  const blurTargetRef = useRef<View | null>(null);

  const location = upcomingTrip?.tripAiResp?.tripDetails?.location?.split(',')[0] ?? '';
  const tripId = upcomingTrip?._id;

  const coverImage = upcomingTrip?.tripAiResp?.coverImage;

  const { retryCoverImage } = useRetryCoverImage(tripId, location);

  const startNewTrip = () => {
    if (!canStart()) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigationService.toSearch();
  };

  // The page is full screen, so nothing insets it: the button clears the status bar / notch itself.
  const addTripButtonTop = top + spacing.Triple;

  // The native tab bar replaces the old floating capsule, so its 120px clearance is gone. On iOS the
  // screen sits behind the translucent bar and its height arrives as the bottom safe-area inset,
  // which has to be cleared by hand; on Android the Material bar already insets the screen content,
  // so only breathing room is left.
  const detailsBoxMarginBottom = spacing.Triple + (Platform.OS === PlatformOS.ios ? bottom : 0);

  return {
    state: {
      lastCreatedTrip: upcomingTrip,
      isLoading,
      image: coverImage?.url,
      imageBlurHash: coverImage?.blurHash || undefined,
      tripId: tripId ?? '',
      tripStartDate: upcomingTrip?.tripAiResp?.tripDetails?.startDate ?? '',
      totalTrips,
      blurTargetRef,
    },
    derived: {
      location,
      componentStyle: styles(addTripButtonTop, detailsBoxMarginBottom),
    },
    effects: {
      retryCoverImage,
      startNewTrip,
    },
  };
};
