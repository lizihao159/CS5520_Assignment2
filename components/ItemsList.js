import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the warning icon
import { commonStyles } from '../styles/commonStyles';

// This component displays a list of items (diet entries or activities)
// and used by the DietScreen and ActivitiesScreen components
// It also displays a warning icon if the entry or activity meets certain criteria

// Function to check if the activity should display a warning
const shouldDisplayActivityWarning = (activityType, duration) => {
  return (activityType === 'running' || activityType === 'weights') && duration > 60;
};

// Function to check if the diet entry should display a warning
const shouldDisplayDietWarning = (calories) => {
  return calories > 800;
};

const ItemsList = ({ entries, type }) => {
  return (
    <View style={commonStyles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={commonStyles.card}>
            {/* Display description for diet or activity name for exercise */}
            <Text style={commonStyles.cardText}>
              {type === 'exercise' ? item.activity : item.description}
            </Text>

            {/* Display warning icon based on type (exercise or diet) */}
            {type === 'exercise' && shouldDisplayActivityWarning(item.activity, item.duration) && (
              <Ionicons name="warning" size={20} style={commonStyles.icon} />
            )}
            {type === 'diet' && shouldDisplayDietWarning(item.calories) && (
              <Ionicons name="warning" size={20} style={commonStyles.icon} />
            )}

            {/* Date and value display */}
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
