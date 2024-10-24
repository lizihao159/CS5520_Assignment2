import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { updateDocument, deleteDocument } from '../Firebase/firebaseHelper';
import { commonStyles } from '../styles/commonStyles';
import DatePicker from '../components/DatePicker';

const EditActivityScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const [activity, setActivity] = useState(item.activity);
  const [duration, setDuration] = useState(String(item.duration));
  const [date, setDate] = useState(new Date(item.date));

  const handleSave = async () => {
    Alert.alert(
      'Confirm Save',
      'Are you sure you want to save the changes?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: async () => {
            await updateDocument('activities', item.id, {
              activity,
              duration: parseInt(duration),
              date: date.toDateString(),
            });
            Alert.alert('Success', 'Activity updated successfully.');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this activity?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteDocument('activities', item.id);
            Alert.alert('Deleted', 'Activity deleted successfully.');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Confirm Cancel',
      'Are you sure you want to discard the changes?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => navigation.goBack() },
      ]
    );
  };

  // Move the delete button to the header right corner
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={handleCancel}>
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
