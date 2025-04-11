import { routes } from '@/ui/constants/routes';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.welcomePage} />
      <Stack.Screen name={routes.signIn} />
      <Stack.Screen name={routes.signUp} />
    </Stack>
  );
}
