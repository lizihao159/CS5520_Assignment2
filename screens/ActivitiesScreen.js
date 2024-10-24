// ActivitiesScreen.js
import React, { useContext } from 'react';
import { View } from 'react-native';
import ItemsList from '../components/ItemsList';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';

function ActivitiesScreen({ navigation }) {
  const { activities } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <ItemsList entries={activities} type="exercise" navigation={navigation} />
    </View>
  );
}

export default ActivitiesScreen;