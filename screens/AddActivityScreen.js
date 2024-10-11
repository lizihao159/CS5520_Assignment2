import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../styles/commonStyles';
import { DataContext } from '../context/DataContext'; // Import the context

const AddActivityScreen = ({ navigation }) => {
  const { addActivity } = useContext(DataContext); // Access the addActivity function from context
  const [activity, setActivity] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'walking' },
    { label: 'Running', value: 'running' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Weights', value: 'weights' },
    { label: 'Yoga', value: 'yoga' },
    { label: 'Cycling', value: 'cycling' },
    { label: 'Hiking', value: 'hiking' },
  ]);

  const validateAndSave = () => {
    if (!activity || !duration || isNaN(duration) || parseInt(duration) <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid details for all fields.');
      return;
    }

    // Create a new activity object
    const newActivity = {
      activity,
      duration: parseInt(duration),
      date: date.toDateString(),
    };

    // Add the activity to the context
    addActivity(newActivity);

    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>Activity *</Text>
      <DropDownPicker
        open={open}
        value={activity}
        items={items}
        setOpen={setOpen}
        setValue={setActivity}
        setItems={setItems}
        placeholder="Select An Activity"
        style={{ marginBottom: 20 }}
      />

      <Text style={commonStyles.text}>Duration (min) *</Text>
      <TextInput
        style={[commonStyles.input, { marginBottom: 20 }]}
        placeholder="Enter Duration"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />

      <Text style={commonStyles.text}>Date *</Text>
      <TouchableOpacity
        style={[commonStyles.input, { marginBottom: 20 }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={commonStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={validateAndSave}>
          <Text style={commonStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddActivityScreen;
