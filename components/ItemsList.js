import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

const ItemsList = ({ entries, type }) => {
  return (
    <View style={commonStyles.container}>
      <FlatList
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={commonStyles.card}>
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
