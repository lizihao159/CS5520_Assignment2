import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabs } from './components/navigationHelper'; // Import the tab navigation directly

export default function App() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}
