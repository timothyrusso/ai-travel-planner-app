import { create } from '../shared/createStore';
import { TripActions, TripState } from './types';

const initialState: TripState = {
  locationInfo: {
    name: '',
    coordinates: undefined,
    photoRef: '',
    url: '',
  },
  travelerInfo: {
    id: null,
    title: '',
    description: '',
    icon: '',
    people: '',
  },
  datesInfo: {
    startDate: null,
    endDate: null,
    totalNoOfDays: 0,
  },
};

export const useTripStore = create<TripState & TripActions>()((set) => ({
  ...initialState,
  actions: {
    setLocationInfo: (locationInfo) => set({ locationInfo }),
    setTravelerInfo: (travelerInfo) => set({ travelerInfo }),
    setDatesInfo: (datesInfo) => set({ datesInfo }),
    resetTripState: () => set(initialState),
  },
}));
