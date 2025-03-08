import type { Href } from 'expo-router';

export const routes = {
  welcomePage: 'index' as Href<string | object>,
  signUp: 'auth/sign-up' as Href<string | object>,
  signIn: 'auth/sign-in' as Href<string | object>,
  myTrip: '/mytrip' as Href<string | object>,
  searchPlace: '/create-trip/search-place' as Href<string | object>,
  selectTraveler: '/create-trip/select-traveler' as Href<string | object>,
  selectDates: '/create-trip/select-dates' as Href<string | object>,
  selectBudget: '/create-trip/select-budget' as Href<string | object>,
  reviewTrip: '/create-trip/review-trip' as Href<string | object>,
  generateTrip: '/create-trip/generate-trip' as Href<string | object>,
  tripDetails: '/trip-details' as Href<string | object>,
} as const;
