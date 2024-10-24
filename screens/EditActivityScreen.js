// EditActivityScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { updateDocument, deleteDocument } from '../Firebase/firebaseHelper';
import { commonStyles } from '../styles/commonStyles';
import DatePicker from '../components/DatePicker';

const EditActivityScreen = ({ route, navigation }) => {
  const { item } = route.params; // Get the passed activity item

  const [activity, setActivity] = useState(item.activity);
  const [duration, setDuration] = useState(String(item.duration));
  const [date, setDate] = useState(new Date(item.date)); // Pre-populate with existing date

  const handleSave = async () => {
    if (!activity || !duration) {
      Alert.alert('Invalid Input', 'Please fill all fields.');
      return;
    }

    await updateDocument('activities', item.id, {
      activity,
      duration: parseInt(duration),
      date: date.toDateString(), // Save the updated date
    });

    Alert.alert('Success', 'Activity updated successfully.');
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteDocument('activities', item.id);
    Alert.alert('Deleted', 'Activity deleted successfully.');
    navigation.goBack();
  };

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
      <DatePicker
  selectedDate={date}
  setSelectedDate={setDate}
/>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={commonStyles.buttonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave}>
          <Text style={commonStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditActivityScreen;
