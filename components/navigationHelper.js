import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import DietScreen from '../screens/DietScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import { commonStyles } from '../styles/commonStyles';

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
      <Stack.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          title: 'Activities',
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
        tabBarActiveTintColor: commonStyles.tabBarActiveTintColor,
        tabBarInactiveTintColor: commonStyles.tabBarInactiveTintColor,
        tabBarStyle: commonStyles.tabBar,
      })}
    >
      {/* Activities stack handles the header separately */}
      <Tab.Screen
        name="Activities"
        component={ActivitiesStack}
        options={{ headerShown: false }} // Disable header at tab level; handled by stack
      />
      {/* Apply consistent header styles to Diet and Settings */}
      <Tab.Screen
        name="Diet"
        component={DietScreen}
        options={{
          title: 'Diet',
          headerShown: true,
          headerStyle: { backgroundColor: commonStyles.headerBackgroundColor }, // Same background color as Activities
          headerTintColor: commonStyles.headerTintColor, // Same text color as Activities
          headerTitleAlign: 'center', // Center align title
        }}
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
