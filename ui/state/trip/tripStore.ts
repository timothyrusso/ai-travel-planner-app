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
    id: undefined,
    title: '',
    description: '',
    icon: '',
    people: '',
  },
};

export const useTripStore = create<TripState & TripActions>()((set) => ({
  ...initialState,
  actions: {
    setLocationInfo: (locationInfo) => set({ locationInfo }),
    setTravelerInfo: (travelerInfo) => set({ travelerInfo }),
    resetTripState: () => set(initialState),
  },
}));
