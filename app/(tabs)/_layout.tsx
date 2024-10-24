import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
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
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="location"
              size={dimensions.Fourfold}
              color={color}
            />
          ),
        }}
        name="mytrip"
      />
      <Tabs.Screen
        name="discover"
        options={{
          tabBarLabel: t('DISCOVER.TITLE'),
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="globe-outline"
              size={dimensions.Fourfold}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: t('PROFILE.TITLE'),
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="person-circle-outline"
              size={dimensions.Fourfold}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
