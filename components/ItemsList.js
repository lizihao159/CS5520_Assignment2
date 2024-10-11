import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { Ionicons } from '@expo/vector-icons';

const ItemsList = ({ entries, type }) => {
  return (
    <View style={commonStyles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={commonStyles.card}>
            {/* Display icon if the item is a special case */}
            {type === 'diet' && item.calories > 800 && (
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
