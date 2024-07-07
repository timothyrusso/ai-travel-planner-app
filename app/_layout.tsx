import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {
  useFonts({
    inter: require('../assets/fonts/Inter-Regular.ttf'),
    'inter-medium': require('../assets/fonts/Inter-Medium.ttf'),
    'inter-bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
