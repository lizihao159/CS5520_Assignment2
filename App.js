import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabs } from './components/navigationHelper'; // Import the tab navigation
import { DataProvider } from './context/DataContext'; // Import the DataProvider
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </DataProvider>
    </ThemeProvider>
  );
}
