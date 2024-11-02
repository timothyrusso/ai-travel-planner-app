import { DatesInfo } from '@/modules/trip/domain/entities/DatesInfo';
import { LocationInfo } from '@/modules/trip/domain/entities/LocationInfo';

export type TripState = {
  locationInfo: LocationInfo;
  travelerInfo: string;
  datesInfo: DatesInfo;
  budgetInfo: string;
};

export type TripActions = {
  actions: {
    setLocationInfo: (locationInfo: LocationInfo) => void;
    setTravelerInfo: (travelerInfo: string) => void;
    setDatesInfo: (datesInfo: DatesInfo) => void;
    setBudgetInfo: (budgetInfo: string) => void;
    resetTripState: () => void;
  };
};
