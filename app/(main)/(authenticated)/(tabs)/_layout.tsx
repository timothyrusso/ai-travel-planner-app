import CustomHeader from '@/ui/components/composite/CustomHeader/CustomHeader';
import { Routes, Stacks } from '@/ui/constants/routes';
import { colors } from '@/ui/constants/style/colors';
import { spacing } from '@/ui/constants/style/dimensions/spacing';
import { icons } from '@/ui/constants/style/icons';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

const TabLayout = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name={Routes.MyTrips}
        options={{
          header: () => (
            <CustomHeader
              title="MY_TRIP.TITLE"
              icon={icons.addCircle}
              onPress={() => router.push(`/${Stacks.CreateTrip}/${Routes.Search}`)}
            />
          ),
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
