import { LocationInfo } from '@/modules/trip/domain/entities/LocationInfo';
import { TravelerInfo } from '@/modules/trip/domain/entities/TravelerInfo';

export type TripState = {
  locationInfo: LocationInfo;
  travelerInfo: TravelerInfo;
};

export type TripActions = {
  actions: {
    setLocationInfo: (locationInfo: LocationInfo) => void;
    setTravelerInfo: (travelerInfo: TravelerInfo) => void;
    resetTripState: () => void;
  };
};
