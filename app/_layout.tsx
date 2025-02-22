import i18n from '@/ui/translations/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  // Initialize localization
  i18n;

  useFonts({
    'inter-regular': require('../ui/assets/fonts/Inter-Regular.ttf'),
    'inter-medium': require('../ui/assets/fonts/Inter-Medium.ttf'),
    'inter-bold': require('../ui/assets/fonts/Inter-Bold.ttf'),
    'arima-regular': require('../ui/assets/fonts/Arima-Regular.ttf'),
    'arima-bold': require('../ui/assets/fonts/Arima-Bold.ttf'),
    'arima-semibold': require('../ui/assets/fonts/Arima-SemiBold.ttf'),
    'arima-medium': require('../ui/assets/fonts/Arima-Medium.ttf'),
  });

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </QueryClientProvider>
  );
}
