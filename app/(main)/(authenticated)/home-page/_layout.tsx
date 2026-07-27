import { Stack } from 'expo-router';
import { CustomHeader, icons } from '@/features/core/design-system';
import { navigationService, Routes } from '@/features/core/navigation';

export default function HomePageLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={Routes.ShowAllTrips}
        options={{
          header: () => (
            <CustomHeader
              title="SHOW_ALL_TRIPS.TITLE"
              icon={icons.arrowBack}
              onPress={() => navigationService.back()}
            />
          ),
        }}
      />
    </Stack>
  );
}
