import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabs } from './components/navigationHelper'; // Import the tab navigation directly
import { DataProvider } from './context/DataContext'; // Import the DataProvider

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </DataProvider>
  );
}
