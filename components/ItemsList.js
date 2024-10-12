import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the warning icon
import { commonStyles } from '../styles/commonStyles';

// Function to check if the activity should display a warning
const shouldDisplayWarning = (activityType, duration) => {
  return (
    (activityType === 'running' || activityType === 'weights') &&
    duration > 60
  );
};

const ItemsList = ({ entries, type }) => {
  return (
    <View style={commonStyles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={commonStyles.card}>
            {/* Display warning icon if the activity type is Running or Weights and duration is more than 60 minutes */}
            {shouldDisplayWarning(item.activity, item.duration) && (
              <Ionicons name="warning" size={20} style={commonStyles.icon} />
            )}
            <Text style={commonStyles.cardText}>
              {type === 'exercise' ? item.activity : item.meal}
            </Text>
            <Text style={commonStyles.cardDate}>{item.date}</Text>
            <Text style={commonStyles.cardValue}>
              {type === 'exercise' ? `${item.duration} min` : `${item.calories} cal`}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ItemsList;
