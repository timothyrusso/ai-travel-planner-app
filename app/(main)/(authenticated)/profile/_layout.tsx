import { Stack } from 'expo-router';
import { CustomHeader, icons } from '@/features/core/design-system';
import { navigationService, Routes } from '@/features/core/navigation';

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={Routes.ChangeLanguage}
        options={{
          header: () => (
            <CustomHeader
              title="PROFILE.BUTTON.CHANGE_LANGUAGE"
              icon={icons.arrowBack}
              onPress={() => navigationService.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.AccountSettings}
        options={{
          header: () => <CustomHeader icon={icons.arrowBack} onPress={() => navigationService.back()} />,
        }}
      />
    </Stack>
  );
}
