import type { TripAiResp, UserTripData, UserTrips } from '@/modules/trip/domain/dto/UserTripsDTO';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { useRef } from 'react';
import { Animated } from 'react-native';

export interface AllCoordinates {
  title: string;
  description: string;
  day: number;
  dayIndex: number;
  scheduleIndex: number;
  latitude: number;
  longitude: number;
}

export const useTripDetailsPageLogic = () => {
  const { trip } = useLocalSearchParams();
  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  // TODO: fix type
  const _tripData = JSON.parse(trip as string) as UserTrips & UserTripData & TripAiResp & { image: string; id: string };

  const _tripDays = `${format(_tripData.startDate ?? new Date(), 'dd MMM yyyy')} - ${format(_tripData.endDate ?? new Date(), 'dd MMM yy')}`;

  const title = _tripData?.location?.split(',')[0];

  // Get all coordinates from the trip plan with day information
  const allCoordinates = _tripData.dayPlans.flatMap((dayPlan, dayIndex) =>
    dayPlan.schedule.map((item, scheduleIndex) => ({
      ...item.geoCoordinates,
      title: item.placeName,
      description: item.activity,
      day: dayPlan.day,
      dayIndex,
      scheduleIndex,
    })),
  );

  // Calculate the bounds of all coordinates
  const calculateRegion = () => {
    if (allCoordinates.length === 0) {
      return {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    }

    // Find the min and max coordinates
    const latitudes = allCoordinates.map(coord => coord.latitude);
    const longitudes = allCoordinates.map(coord => coord.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    // Calculate the center point
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // Calculate deltas with some padding (20% extra space)
    const latDelta = (maxLat - minLat) * 1.5;
    const lngDelta = (maxLng - minLng) * 1.5;

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: Math.max(latDelta, 0.01), // Ensure minimum zoom level
      longitudeDelta: Math.max(lngDelta, 0.01), // Ensure minimum zoom level
    };
  };

  const region = calculateRegion();

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
    useNativeDriver: false,
  });

  const sectionData = _tripData.dayPlans.map(plan => ({
    title: `Day ${plan.day}`,
    data: [plan],
  }));

  return { _tripData, _tripDays, title, allCoordinates, region, scrollOffsetY, handleScroll, sectionData };
};
