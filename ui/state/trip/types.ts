import { DatesInfo } from '@/modules/trip/domain/entities/DatesInfo';
import { LocationInfo } from '@/modules/trip/domain/entities/LocationInfo';
import { TravelerInfo } from '@/modules/trip/domain/entities/TravelerInfo';

export type TripState = {
  locationInfo: LocationInfo;
  travelerInfo: TravelerInfo;
  datesInfo: DatesInfo;
};

export type TripActions = {
  actions: {
    setLocationInfo: (locationInfo: LocationInfo) => void;
    setTravelerInfo: (travelerInfo: TravelerInfo) => void;
    setDatesInfo: (datesInfo: DatesInfo) => void;
    resetTripState: () => void;
  };
};
