import { Fragment } from 'react';
import { View } from 'react-native';
import {
  AnimatedHeaderImage,
  BasicView,
  ButtonType,
  CustomIcon,
  CustomIconButtonMedium,
  CustomScrollView,
  CustomText,
  colors,
  icons,
  spacing,
} from '@/features/core/design-system';
import { Routes } from '@/features/core/navigation';
import { ActivityDetailsBox } from '@/features/trips/ui/components/ActivityDetailsBox/ActivityDetailsBox';
import { useActivityDetailsPageLogic } from '@/features/trips/ui/pages/ActivityDetailsPage/ActivityDetailsPage.logic';
import { styles } from '@/features/trips/ui/pages/ActivityDetailsPage/ActivityDetailsPage.style';
import { ActivityImageCarousel } from '@/features/trips/ui/pages/ActivityDetailsPage/components/ActivityImageCarousel/ActivityImageCarousel';

export const ActivityDetailsPage = () => {
  const { state, derived, effects } = useActivityDetailsPageLogic();

  return (
    <Fragment>
      <AnimatedHeaderImage
        value={state.scrollOffsetY}
        imageUrl={derived.imageData}
        title={state.locationTitle}
        chipsAlignment="flex-end"
        onError={effects.retryActivityImage}
        headerIcons={
          <CustomIconButtonMedium
            iconName={icons.arrowBack}
            iconSize={spacing.Fourfold}
            onPress={effects.goBackHandler}
            style={styles.backIcon}
            buttonType={ButtonType.Tertiary}
          />
        }
      />
      <BasicView nameView={Routes.ActivityDetails} containerStyle={styles.basicViewContainer} isFullScreen>
        <CustomScrollView onScroll={effects.handleScroll} style={styles.scrollView}>
          <View style={styles.container}>
            <ActivityDetailsBox
              rating={state.rating}
              bestTimeToVisit={state.bestTimeToVisit}
              ticketPricing={state.ticketPricing}
              currency={state.currency}
              locationTitle={state.locationTitle}
              latitude={state.latitude}
              longitude={state.longitude}
            />
            {state.mainDescription && <CustomText text={state.mainDescription} style={styles.description} />}
            {state.activityInsights && (
              <View style={styles.insightsContainer}>
                <View style={styles.insightHeader}>
                  <CustomIcon name={icons.diamond} size={spacing.Triple} color={colors.primaryBlack} />
                  <CustomText text="ACTIVITY_DETAILS.USEFUL_TIPS" style={styles.insightTitle} />
                </View>
                <CustomText text={state.activityInsights} style={styles.insightDescription} />
              </View>
            )}
            <ActivityImageCarousel images={derived.carouselImages} />
          </View>
        </CustomScrollView>
      </BasicView>
    </Fragment>
  );
};
