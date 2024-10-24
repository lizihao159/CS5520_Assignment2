// ItemsList.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { commonStyles } from '../styles/commonStyles';

// Function to check if the activity should display a warning
const shouldDisplayActivityWarning = (activityType, duration) => {
  return (activityType === 'running' || activityType === 'weights') && duration > 60;
};

// Function to check if the diet entry should display a warning
const shouldDisplayDietWarning = (calories) => {
  return calories > 800;
};

const ItemsList = ({ entries, type, navigation }) => {
  const handlePress = (item) => {
    if (!item || !item.id) {
      console.error('Invalid item or missing ID. Cannot navigate.');
      Alert.alert('Error', 'Invalid item data. Please try again.');
      return;
    }

    const screenName = type === 'exercise' ? 'EditActivity' : 'EditDietEntry';
    console.log(`Navigating to ${screenName} with item:`, item);

    navigation.navigate(screenName, { item });
  };

  return (
    <View style={commonStyles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={commonStyles.card}>
              <Text style={commonStyles.cardText}>
                {type === 'exercise' ? item.activity : item.description}
              </Text>

              {type === 'exercise' &&
                shouldDisplayActivityWarning(item.activity, item.duration) && (
                  <Ionicons name="warning" size={20} color="orange" style={commonStyles.icon} />
                )}
              {type === 'diet' && shouldDisplayDietWarning(item.calories) && (
                <Ionicons name="warning" size={20} color="orange" style={commonStyles.icon} />
              )}

              <Text style={commonStyles.cardDate}>{item.date}</Text>
              <Text style={commonStyles.cardValue}>
                {type === 'exercise' ? `${item.duration} min` : `${item.calories} cal`}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ItemsList;
