import { fonts } from '@/constants/fonts';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const { interRegular, interMedium, interBold } = fonts;

  useFonts({
    interRegular: require('../assets/fonts/Inter-Regular.ttf'),
    interMedium: require('../assets/fonts/Inter-Medium.ttf'),
    interBold: require('../assets/fonts/Inter-Bold.ttf'),
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
