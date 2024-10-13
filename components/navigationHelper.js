import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import DietScreen from '../screens/DietScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import AddDietEntryScreen from '../screens/AddDietEntryScreen'; // Import AddDietEntryScreen
import { commonStyles } from '../styles/commonStyles';

// Create a Stack for each tab
// This will allow us to add a header button to add new activities and diet entries

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ActivitiesStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: commonStyles.headerBackgroundColor },
        headerTintColor: commonStyles.headerTintColor,
        headerTitleAlign: 'center',
      }}
    >
      {/* Use a different name for the Stack.Screen but keep "Activities" in title */}
      <Stack.Screen
        name="activitiesStack"  // Use a unique name here
        component={ActivitiesScreen}
        options={{
          title: 'Activities', // The header title to display
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddActivity')}
              style={{ paddingRight: 20 }}
            >
              <Text style={commonStyles.buttonText}>Add</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddActivity"
        component={AddActivityScreen}
        options={{ title: 'Add An Activity' }}
      />
    </Stack.Navigator>
  );
}

function DietStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: commonStyles.headerBackgroundColor },
        headerTintColor: commonStyles.headerTintColor,
        headerTitleAlign: 'center',
      }}
    >
      {/* Use a different name for the Stack.Screen but keep "Diet" in title */}
      <Stack.Screen
        name="dietStack"  // Use a unique name here
        component={DietScreen}
        options={{
          title: 'Diet', // The header title to display
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddDietEntry')}
              style={{ paddingRight: 20 }}
            >
              <Text style={commonStyles.buttonText}>Add</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddDietEntry"
        component={AddDietEntryScreen}
        options={{ title: 'Add A Diet Entry' }}
      />
    </Stack.Navigator>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'activitiesTab') {
            iconName = focused ? 'walk' : 'walk-outline';
          } else if (route.name === 'dietTab') {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: commonStyles.tabBarActiveTintColor,
        tabBarInactiveTintColor: commonStyles.tabBarInactiveTintColor,
        tabBarStyle: commonStyles.tabBar,
      })}
    >
      {/* Rename tab screen to avoid conflicts */}
      <Tab.Screen
        name="activitiesTab"  // Use a unique name for the tab screen
        component={ActivitiesStack}
        options={{ headerShown: false, title: 'Activities' }} // This will be the tab title
      />
      <Tab.Screen
        name="dietTab"  // Use a unique name for the tab screen
        component={DietStack}
        options={{ headerShown: false, title: 'Diet' }} // This will be the tab title
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: true,
          headerStyle: { backgroundColor: commonStyles.headerBackgroundColor }, // Same background color as Activities
          headerTintColor: commonStyles.headerTintColor, // Same text color as Activities
          headerTitleAlign: 'center', // Center align title
        }}
      />
    </Tab.Navigator>
  );
}
