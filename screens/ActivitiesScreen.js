import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { listenToCollection } from '../Firebase/firebaseHelper'; // Import helper
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext

const ActivitiesScreen = () => {
  const [activities, setActivities] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const unsubscribe = listenToCollection('activities', setActivities);
    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.backgroundColor }]}>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={commonStyles.card}>
            <Text style={commonStyles.cardText}>{item.activity}</Text>
            <Text style={commonStyles.cardValue}>{item.duration} min</Text>
            <Text style={commonStyles.cardDate}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ActivitiesScreen;
