import { Routes, Stacks } from '@/ui/constants/routes';
import { useUserState } from '@/ui/hooks/useUserState';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { user, initializing } = useUserState();

  if (initializing) return null;

  if (!user) return <Redirect href={Routes.welcome} />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Stacks.Tabs} />
    </Stack>
  );
}
