export const Stacks = {
  Tabs: '(tabs)',
  Main: '(main)',
  Profile: 'profile',
  NotAuthenticated: '(not_authenticated)',
  Authenticated: '(authenticated)',
  CreateTrip: 'create-trip',
} as const;

export type Stacks = (typeof Stacks)[keyof typeof Stacks];
