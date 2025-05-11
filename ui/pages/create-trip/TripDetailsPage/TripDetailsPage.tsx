import type { DayPlan } from '@/modules/trip/domain/dto/UserTripsDTO';
import AnimatedHeaderImage from '@/ui/components/composite/AnimatedHeaderImage/AnimatedHeaderImage';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { Fragment } from 'react';
import { SectionList, View } from 'react-native';
import { useTripDetailsPageLogic } from './TripDetailsPage.logic';
import { styles } from './TripDetailsPage.style';
import { DayItem } from './components/DayItem/DayItem';
import { MapListHeaderComponent } from './components/MapListHeaderComponent/MapListHeaderComponent';

const separator = () => <View style={styles.separator} />;

export const TripDetailsPage = () => {
  const { _tripData, title, allCoordinates, scrollOffsetY, handleScroll, region, sectionData } =
    useTripDetailsPageLogic();

  const renderItem = ({ item }: { item: DayPlan }) => <DayItem dayPlan={item} location={title} />;

  return (
    <Fragment>
      <AnimatedHeaderImage value={scrollOffsetY} imageUrl={_tripData.image} title={title} />
      <BasicView nameView={Routes.TripDetails} containerStyle={styles.basicViewContainer} isFullScreen>
        <SectionList
          sections={sectionData}
          keyExtractor={item => item.day.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.dayPlans}
          ItemSeparatorComponent={separator}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          style={styles.sectionList}
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={() => <MapListHeaderComponent region={region} allCoordinates={allCoordinates} />}
        />
      </BasicView>
    </Fragment>
  );
};
