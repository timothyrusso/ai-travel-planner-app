export const Routes = {
  Welcome: 'welcome',
  SignInOrSignUp: 'sign-in-or-sign-up',
  HomePage: 'home-page',
  Trips: 'trips',
  Activities: 'activities',
  Search: 'search-place',
  SelectTraveler: 'select-traveler',
  SelectDates: 'select-dates',
  SelectBudget: 'select-budget',
  ReviewTrip: 'review-trip',
  GenerateTrip: 'generate-trip',
  TripDetails: 'trip-details',
  ChangeLanguage: 'change-language',
  AccountSettings: 'account-settings',
  ActivityDetails: 'activity-details',
} as const;

export type Routes = (typeof Routes)[keyof typeof Routes];
