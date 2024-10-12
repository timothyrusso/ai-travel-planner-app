import { Href } from 'expo-router';

export const routes = {
  welcomePage: 'index' as Href<string | object>,
  signUp: 'auth/sign-up' as Href<string | object>,
  signIn: 'auth/sign-in' as Href<string | object>,
} as const;
