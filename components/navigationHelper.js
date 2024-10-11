import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import DietScreen from '../screens/DietScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { commonStyles } from '../styles/commonStyles'; // Import the common styles

const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Activities') {
            iconName = focused ? 'walk' : 'walk-outline';
          } else if (route.name === 'Diet') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        // Use the exact colors from commonStyles
        tabBarActiveTintColor: commonStyles.tabBarActiveTintColor,
        tabBarInactiveTintColor: commonStyles.tabBarInactiveTintColor,
        tabBarStyle: commonStyles.tabBar,

        // Set header style and show the header title
        headerStyle: {
          backgroundColor: commonStyles.headerBackgroundColor, // Purple color
        },
        headerTintColor: commonStyles.headerTintColor, // White text in the header
        headerTitleAlign: 'center', // Center align the header title
      })}
    >
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
