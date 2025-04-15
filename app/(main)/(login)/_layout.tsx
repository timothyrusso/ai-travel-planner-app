import { Routes } from '@/ui/constants/routes';
import { Stack } from 'expo-router';

export default function LoginLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Welcome} />
      <Stack.Screen name={Routes.SignIn} />
      <Stack.Screen name={Routes.SignUp} />
    </Stack>
  );
}
