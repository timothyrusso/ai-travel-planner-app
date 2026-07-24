import { Fragment } from 'react';
import { SectionList, type SectionListData, View } from 'react-native';
import { Routes } from '@/features/core/navigation';
import { AnimatedHeaderImage, BasicView } from '@/features/core/ui';
import type { DayPlan } from '@/features/trips/domain/entities/DayPlan';
import { DayItem } from '@/features/trips/ui/components/DayItem/DayItem';
import { HeaderIcons } from '@/features/trips/ui/components/HeaderIcons/HeaderIcons';
import { ListHeaderComponent } from '@/features/trips/ui/components/ListHeaderComponent/ListHeaderComponent';
import { useTripDetailsPageLogic } from '@/features/trips/ui/pages/TripDetailsPage/TripDetailsPage.logic';
import { styles } from '@/features/trips/ui/pages/TripDetailsPage/TripDetailsPage.style';

export const TripDetailsPage = () => {
  const { state, derived, effects } = useTripDetailsPageLogic();

  const Separator = ({
    trailingSection,
    leadingItem,
    trailingItem,
  }: {
    trailingSection: SectionListData<DayPlan> | null;
    leadingItem: DayPlan | null;
    trailingItem: DayPlan | null;
  }) => {
    const isFirstItemOfSection = !leadingItem && !!trailingItem;
    return trailingSection || isFirstItemOfSection ? <View style={styles.separator} /> : null;
  };

  const renderItem = ({ item }: { item: DayPlan }) => (
    <DayItem dayPlan={item} tripId={state.id} currency={state.currency} />
  );

  return (
    <Fragment>
      <AnimatedHeaderImage
        value={state.scrollOffsetY}
        imageUrl={state.imageUrl}
        imageBlurHash={state.imageBlurHash}
        title={derived.location}
        headerIcons={<HeaderIcons />}
      />
      <BasicView nameView={Routes.TripDetails} containerStyle={styles.basicViewContainer} isFullScreen>
        <SectionList
          sections={derived.sectionData ?? []}
          keyExtractor={item => item.day.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.dayPlans}
          SectionSeparatorComponent={Separator}
          showsVerticalScrollIndicator={false}
          onScroll={effects.handleScroll}
          style={styles.sectionList}
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={
            <ListHeaderComponent
              region={derived.region}
              allCoordinates={derived.allCoordinates}
              budgetNotes={state.budgetNotes}
              transportationNotes={state.transportationNotes}
              weather={state.weather}
              tripDetails={derived.tripDetails}
              food={state.food}
              tripId={state.id}
            />
          }
        />
      </BasicView>
    </Fragment>
  );
};
