import React, { useContext } from 'react';
import { View } from 'react-native';
import ItemsList from '../components/ItemsList';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

// This screen displays a list of activities
// The user can see the activities they have added

function ActivitiesScreen() {
  const { activities } = useContext(DataContext);
  const { theme } = useContext(ThemeContext); // Access the current theme

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <ItemsList entries={activities} type="exercise" />
    </View>
  );
}

export default ActivitiesScreen;
