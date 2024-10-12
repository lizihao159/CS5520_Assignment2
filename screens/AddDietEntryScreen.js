import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { DataContext } from '../context/DataContext'; // Import the context
import DatePicker from '../components/DatePicker'; // Import the reusable DatePicker component

const AddDietEntryScreen = ({ navigation }) => {
  const { addDietEntry } = useContext(DataContext); // Access the addDietEntry function from context
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());

  const validateAndSave = () => {
    const parsedCalories = parseInt(calories);

    // Validate that description is not empty
    if (!description) {
      Alert.alert('Invalid Input', 'Description cannot be empty.');
      return;
    }

    // Validate that calories is not empty
    if (!calories) {
      Alert.alert('Invalid Input', 'Calories cannot be empty.');
      return;
    }

    // Validate that calories is a number
    if (isNaN(parsedCalories)) {
      Alert.alert('Invalid Input', 'Calories must be a number.');
      return;
    }

    // Validate that calories is a positive number
    if (parsedCalories <= 0) {
      Alert.alert('Invalid Input', 'Calories must be a positive number.');
      return;
    }

    // Create a new diet entry object
    const newDietEntry = {
      description,
      calories: parsedCalories,
      date: date.toDateString(),
    };

    // Add the diet entry to the context
    addDietEntry(newDietEntry);

    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>Description *</Text>
      <TextInput
        style={[commonStyles.input, { marginBottom: 20 }]}
        placeholder="Enter meal description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={commonStyles.text}>Calories *</Text>
      <TextInput
        style={[commonStyles.input, { marginBottom: 20 }]}
        placeholder="Enter Calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <Text style={commonStyles.text}>Date *</Text>
      <DatePicker selectedDate={date} setSelectedDate={setDate} />

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

export default AddDietEntryScreen;
