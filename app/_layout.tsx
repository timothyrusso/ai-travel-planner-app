import { fonts } from '@/constants/style/fonts';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const { interRegular, interMedium, interBold } = fonts;

  useFonts({
    'inter-regular': require('../ui/assets/fonts/Inter-Regular.ttf'),
    'inter-medium': require('../ui/assets/fonts/Inter-Medium.ttf'),
    'inter-bold': require('../ui/assets/fonts/Inter-Bold.ttf'),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
