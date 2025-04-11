import { Routes } from '@/ui/constants/routes';
import { Stack } from 'expo-router';

export default function LoginLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.welcome} />
      <Stack.Screen name={Routes.signIn} />
      <Stack.Screen name={Routes.signUp} />
    </Stack>
  );
}
