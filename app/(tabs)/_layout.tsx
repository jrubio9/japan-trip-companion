import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SettingsProvider } from '@/components/SettingsContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SettingsProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="conversion"
          options={{
            title: 'Conversion',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.triangle.2.circlepath.circle.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="phrases"
          options={{
            title: 'Phrases',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="text.bubble" color={color} />,
          }}
        />
        <Tabs.Screen
          name="config"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
          }}
        />
      </Tabs>
    </SettingsProvider>
  );
}
