import CustomText from '@/ui/components/basic/CustomText/CustomText';
import AnimatedHeaderImage from '@/ui/components/composite/AnimatedHeaderImage/AnimatedHeaderImage';
import { BasicView } from '@/ui/components/view/BasicView/BasicView';
import { Routes } from '@/ui/constants/routes';
import { Fragment, useRef } from 'react';
import { Animated, SectionList, View } from 'react-native';
import { useTripDetailsPageLogic } from './TripDetailsPage.logic';
import { styles } from './TripDetailsPage.style';
import { DayItem } from './components/DayItem/DayItem';

const separator = () => <View style={styles.separator} />;

export const TripDetailsPage = () => {
  const { _tripData, title } = useTripDetailsPageLogic();

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
    useNativeDriver: false,
  });

  return (
    <Fragment>
      <AnimatedHeaderImage value={scrollOffsetY} imageUrl={_tripData.image} />
      <BasicView nameView={Routes.TripDetails} containerStyle={styles.basicViewContainer} isFullScreen>
        <SectionList
          sections={_tripData.dayPlans.map(plan => ({
            title: `Day ${plan.day}`,
            data: [plan],
          }))}
          keyExtractor={item => item.day.toString()}
          renderItem={({ item }) => <DayItem dayPlan={item} />}
          renderSectionHeader={({ section }) => <CustomText text={section.title} style={styles.sectionTitle} />}
          contentContainerStyle={styles.dayPlans}
          ItemSeparatorComponent={separator}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          style={styles.sectionList}
          stickySectionHeadersEnabled={false}
          ListHeaderComponent={
            <View>
              <CustomText text={title} style={styles.title} />
            </View>
          }
        />
      </BasicView>
    </Fragment>
  );
};
