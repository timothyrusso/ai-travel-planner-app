import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { icons } from '@/constants/style/icons';
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
        options={{
          tabBarLabel: t('MYTRIP.TITLE'),
          tabBarIcon: ({ color }) => <Ionicons name={icons.location} size={dimensions.Fourfold} color={color} />,
        }}
        name="mytrip"
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: t('DISCOVER.TITLE'),
          tabBarIcon: ({ color }) => <Ionicons name={icons.globeOutline} size={dimensions.Fourfold} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: t('PROFILE.TITLE'),
          tabBarIcon: ({ color }) => (
            <Ionicons name={icons.personCircleOutline} size={dimensions.Fourfold} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
