import React, { useContext } from 'react';
import { View } from 'react-native'; // Ensure you import View from react-native
import ItemsList from '../components/ItemsList';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

// This screen displays a list of diet entries
// The user can see the diet entries they have added

function DietScreen() {
  const { dietEntries } = useContext(DataContext);
  const { theme } = useContext(ThemeContext); // Access the current theme

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <ItemsList entries={dietEntries} type="diet" />
    </View>
  );
}

export default DietScreen;
