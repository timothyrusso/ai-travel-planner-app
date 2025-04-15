import { Routes, Stacks } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

const TabLayout = () => {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name={Routes.MyTrip}
        options={{
          tabBarLabel: t('MY_TRIP.TITLE'),
          tabBarIcon: ({ color }) => <Ionicons name={icons.location} size={spacing.Fourfold} color={color} />,
        }}
      />
      <Tabs.Screen
        name={Stacks.Profile}
        options={{
          tabBarLabel: t('PROFILE.TITLE'),
          tabBarIcon: ({ color }) => (
            <Ionicons name={icons.personCircleOutline} size={spacing.Fourfold} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
