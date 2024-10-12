import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the warning icon
import { commonStyles } from '../styles/commonStyles';

// Function to check if the activity date is today
const isToday = (date) => {
  const today = new Date();
  const activityDate = new Date(date);

  return (
    activityDate.getDate() === today.getDate() &&
    activityDate.getMonth() === today.getMonth() &&
    activityDate.getFullYear() === today.getFullYear()
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
            {/* Display warning icon if the activity is planned for today */}
            {isToday(item.date) && (
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
