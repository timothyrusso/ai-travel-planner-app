import { create } from '../shared/createStore';
import { TripActions, TripState } from './types';

const initialState: TripState = {
  locationInfo: {
    name: '',
    coordinates: '',
    photoRef: '',
    url: '',
  },
};

export const useTripStore = create<TripState & TripActions>()((set) => ({
  ...initialState,
  actions: {
    setLocationInfo: (locationInfo) => set({ locationInfo }),
    resetTripState: () => set(initialState),
  },
}));
