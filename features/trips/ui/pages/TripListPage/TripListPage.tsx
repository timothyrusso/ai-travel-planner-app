import { FlatList, View } from 'react-native';
import { BaseSkeleton, BasicView, CustomHeader } from '@/features/core/design-system';
import { Routes } from '@/features/core/navigation';
import type { Trip } from '@/features/trips/domain/entities/Trip';
import type { UniqueItem } from '@/features/trips/domain/entities/UniqueItem';
import { StartNewTripCard } from '@/features/trips/ui/components/StartNewTripCard/StartNewTripCard';
import { TripCard } from '@/features/trips/ui/components/TripCard/TripCard';
import { useTripListPageLogic } from '@/features/trips/ui/pages/TripListPage/TripListPage.logic';
import { styles } from '@/features/trips/ui/pages/TripListPage/TripListPage.style';

const renderItem = (item: Trip | UniqueItem) => {
  const isSkeleton = 'uuid' in item;
  return isSkeleton ? <BaseSkeleton style={styles.skeleton} /> : <TripCard item={item} />;
};

export const TripListPage = () => {
  const { derived } = useTripListPageLogic();

  return (
    // `isFullScreen` keeps BasicView from adding its own Android status-bar padding: as a tab root
    // this page renders the header itself, and CustomHeader already applies the top inset.
    <BasicView nameView={Routes.Trips} statusBarStyle="dark" isFullScreen>
      {/* A tab root has nothing to pop, so the header is title-only — no back arrow. */}
      <CustomHeader title="TRIPS.TITLE" />
      <FlatList<Trip | UniqueItem>
        data={derived.userTrips}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => ('_id' in item ? item._id : item.uuid)}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        // A tab root has nowhere to redirect to when the user has no trips, so the empty state lives in the
        // grid. `EmptyListContainer` is not reused here: its fixed top padding and bottom-anchored animation
        // are tuned for the full-screen Home empty state and collide under this page's header.
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <StartNewTripCard />
          </View>
        }
      />
    </BasicView>
  );
};
