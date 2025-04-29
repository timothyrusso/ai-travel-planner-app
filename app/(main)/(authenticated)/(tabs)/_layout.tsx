import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
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
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name={Routes.MyTrips}
        options={{
          headerShown: false,
          tabBarLabel: t('MY_TRIP.TITLE'),
          tabBarIcon: ({ color }) => <Ionicons name={icons.location} size={spacing.Fourfold} color={color} />,
        }}
      />
      <Tabs.Screen
        name={Stacks.Profile}
        options={{
          header: () => <CustomHeader title="PROFILE.TITLE" />,
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
