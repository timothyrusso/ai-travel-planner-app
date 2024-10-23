import { colors } from '@/constants/style/colors';
import { dimensions } from '@/constants/style/dimensions';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        options={{
          tabBarLabel: 'My Trip',
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
          tabBarLabel: 'Discover',
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
          tabBarLabel: 'Profile',
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
