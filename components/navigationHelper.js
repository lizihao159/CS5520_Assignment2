// MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import DietScreen from '../screens/DietScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddActivityScreen from '../screens/AddActivityScreen';
import AddDietEntryScreen from '../screens/AddDietEntryScreen';
import EditActivityScreen from '../screens/EditActivityScreen';
import EditDietEntryScreen from '../screens/EditDietEntryScreen';
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
              style={{ paddingRight: 20, flexDirection: 'row' }}
            >
              <Ionicons name="add-circle-outline" size={24} color={commonStyles.headerTintColor} />
              <Ionicons name="walk-outline" size={24} color={commonStyles.headerTintColor} style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddActivity"
        component={AddActivityScreen}
        options={{ title: 'Add An Activity' }}
      />
      <Stack.Screen
        name="EditActivity"
        component={EditActivityScreen}
        options={{ title: 'Edit Activity' }}
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
      <Stack.Screen
        name="Diet"
        component={DietScreen}
        options={{
          title: 'Diet',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('AddDietEntry')}
              style={{ paddingRight: 20, flexDirection: 'row' }}
            >
              <Ionicons name="add-circle-outline" size={24} color={commonStyles.headerTintColor} />
              <Ionicons name="fast-food-outline" size={24} color={commonStyles.headerTintColor} style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddDietEntry"
        component={AddDietEntryScreen}
        options={{ title: 'Add A Diet Entry' }}
      />
      <Stack.Screen
        name="EditDietEntry"
        component={EditDietEntryScreen}
        options={{ title: 'Edit Diet Entry' }}
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
      <Tab.Screen
        name="activitiesTab"
        component={ActivitiesStack}
        options={{ headerShown: false, title: 'Activities' }}
      />
      <Tab.Screen
        name="dietTab"
        component={DietStack}
        options={{ headerShown: false, title: 'Diet' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: true,
          headerStyle: { backgroundColor: commonStyles.headerBackgroundColor },
          headerTintColor: commonStyles.headerTintColor,
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
}
