import { Routes, Stacks } from '@/ui/constants/routes';
import { useUserState } from '@/ui/hooks/useUserState';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { user, initializing } = useUserState();

  if (initializing) return null;

  if (!user?.emailVerified) return <Redirect href={`/${Routes.Welcome}`} />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Stacks.Tabs} />
      <Stack.Screen name={Stacks.CreateTrip} />
      <Stack.Screen name={Stacks.MyTrips} />
    </Stack>
  );
}
