import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { updateDocument, deleteDocument } from '../Firebase/firebaseHelper';
import { commonStyles } from '../styles/commonStyles';
import DatePicker from '../components/DatePicker';
import CheckBox from 'expo-checkbox'; // Correct import

const EditActivityScreen = ({ route, navigation }) => {
  const { item } = route.params;

  // Initialize state with existing item values
  const [activity, setActivity] = useState(item.activity);
  const [duration, setDuration] = useState(String(item.duration));
  const [date, setDate] = useState(new Date(item.date));
  const [isSpecial, setIsSpecial] = useState(item.isSpecial); // Reflect current special status

  const handleSave = async () => {
    try {
      await updateDocument('activities', item.id, {
        activity,
        duration: parseInt(duration),
        date: date.toDateString(),
        isSpecial, // Save the user’s decision on special status
      });

      Alert.alert('Success', 'Activity updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving activity:', error);
      Alert.alert('Error', 'Failed to save changes.');
    }
  };

  const handleDelete = async () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this activity?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteDocument('activities', item.id);
            Alert.alert('Deleted', 'Activity deleted successfully.');
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting activity:', error);
            Alert.alert('Error', 'Failed to delete the activity.');
          }
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDelete} style={{ paddingRight: 15 }}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>Activity *</Text>
      <TextInput
        style={commonStyles.input}
        value={activity}
        onChangeText={setActivity}
      />

      <Text style={commonStyles.text}>Duration (min) *</Text>
      <TextInput
        style={commonStyles.input}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <Text style={commonStyles.text}>Date *</Text>
      <DatePicker selectedDate={date} setSelectedDate={setDate} />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <CheckBox value={isSpecial} onValueChange={setIsSpecial} />
        <Text style={commonStyles.text}>Mark as Special</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={commonStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text style={commonStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditActivityScreen;
