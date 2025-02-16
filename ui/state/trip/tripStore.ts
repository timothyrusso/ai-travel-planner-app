import { create } from '../shared/createStore';
import type { TripActions, TripState } from './types';

const initialState: TripState = {
  locationInfo: {
    name: '',
    coordinates: undefined,
    photoRef: '',
    url: '',
  },
  travelerInfo: '1',
  datesInfo: {
    startDate: null,
    endDate: null,
    totalNoOfDays: 0,
  },
  budgetInfo: 'Cheap',
};

export const useTripStore = create<TripState & TripActions>()((set) => ({
  ...initialState,
  actions: {
    setLocationInfo: (locationInfo) => set({ locationInfo }),
    setTravelerInfo: (travelerInfo) => set({ travelerInfo }),
    setDatesInfo: (datesInfo) => set({ datesInfo }),
    setBudgetInfo: (budgetInfo) => set({ budgetInfo }),
    resetTripState: () => set(initialState),
  },
}));
