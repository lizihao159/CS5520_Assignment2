import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from 'expo-checkbox'; // Only for edit screens
import DatePicker from './DatePicker'; // Custom DatePicker
import { commonStyles } from '../styles/commonStyles';

// Form for adding or editing diet/activity entries
// and can be reused in multiple screens
const EntryForm = ({
  type,
  values,
  onValueChange,
  onSave,
  onCancel,
  isEdit = false,
}) => {
  const { description, calories, date, activity, duration, isSpecial } = values;

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

  // Input Validation Logic
  const validateInputs = () => {
    if (type === 'diet') {
      const parsedCalories = parseInt(calories);
      // Check if any of the required fields are empty or invalid
      if (!description) {
        Alert.alert('Invalid Input', 'Please enter a description.');
        return false;
      }
      // Check if calories is a valid number greater than 0
      if (!calories || isNaN(parsedCalories) || parsedCalories <= 0) {
        Alert.alert(
          'Invalid Input',
          'Please enter valid numeric calories greater than 0.'
        );
        return false;
      }
      // Check if activity is selected
    } else if (type === 'activity') {
      const parsedDuration = parseInt(duration);
      if (!activity) {
        Alert.alert('Invalid Input', 'Please select an activity.');
        return false;
      }
      // Check if duration is a valid number greater than 0
      if (!duration || isNaN(parsedDuration) || parsedDuration <= 0) {
        Alert.alert(
          'Invalid Input',
          'Please enter a valid numeric duration greater than 0.'
        );
        return false;
      }
    }
    // Check if date is selected
    if (!date) {
      Alert.alert('Invalid Input', 'Please select a date.');
      return false;
    }
    return true;
  };

  // Save button press handler
  const handleSavePress = () => {
    if (validateInputs()) {
      onSave(); // Proceed if input validation passes
    }
  };

  // Set the header right button to delete the entry
  return (
    <View style={commonStyles.container}>
      {type === 'diet' ? (
        <>
          <Text style={commonStyles.text}>Description *</Text>
          <TextInput
            style={commonStyles.input}
            value={description}
            onChangeText={(text) => onValueChange('description', text)}
            placeholder="Enter meal description"
          />

          <Text style={commonStyles.text}>Calories *</Text>
          <TextInput
            style={commonStyles.input}
            keyboardType="numeric"
            value={calories}
            onChangeText={(text) => onValueChange('calories', text)}
            placeholder="Enter Calories"
          />
        </>
      ) : (
        <>
          <Text style={commonStyles.text}>Activity *</Text>
          <DropDownPicker
            open={open}
            value={activity}
            items={items}
            setOpen={setOpen}
            setValue={(value) => onValueChange('activity', value)}
            setItems={setItems}
            placeholder="Select an Activity"
          />

          <Text style={commonStyles.text}>Duration (min) *</Text>
          <TextInput
            style={commonStyles.input}
            keyboardType="numeric"
            value={duration}
            onChangeText={(text) => onValueChange('duration', text)}
            placeholder="Enter Duration"
          />
        </>
      )}

      <Text style={commonStyles.text}>Date *</Text>
      <DatePicker
        selectedDate={date}
        setSelectedDate={(selectedDate) => onValueChange('date', selectedDate)}
      />
      {isEdit && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <CheckBox
            value={isSpecial}
            onValueChange={(value) => onValueChange('isSpecial', value)}
          />
          <Text style={{ marginLeft: 8 }}>Mark as Special</Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={commonStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSavePress}>
          <Text style={commonStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EntryForm;
