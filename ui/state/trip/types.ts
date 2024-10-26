import { LocationInfo } from '@/modules/trip/domain/entities/LocationInfo';

export type TripState = {
  locationInfo: LocationInfo;
};

export type TripActions = {
  actions: {
    setLocationInfo: (locationInfo: LocationInfo) => void;
    resetTripState: () => void;
  };
};
