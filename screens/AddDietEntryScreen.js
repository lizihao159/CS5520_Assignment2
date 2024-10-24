import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';
import DatePicker from '../components/DatePicker';

const AddDietEntryScreen = ({ navigation }) => {
  const { addDietEntry } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(null); // Start with null
  const [isDateSelected, setIsDateSelected] = useState(false); // Track date selection

  const validateAndSave = async () => {
    const parsedCalories = parseInt(calories);

    if (!description) {
      Alert.alert('Invalid Input', 'Please enter a description.');
      return;
    }

    if (!calories || isNaN(parsedCalories) || parsedCalories <= 0) {
      Alert.alert('Invalid Input', 'Please enter valid calories.');
      return;
    }

    if (!isDateSelected) {
      Alert.alert('Invalid Input', 'Please choose a date.');
      return;
    }

    const newDietEntry = {
      description,
      calories: parsedCalories,
      date: date.toDateString(),
    };

    await addDietEntry(newDietEntry);
    navigation.goBack();
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[commonStyles.text, { color: theme.textColor }]}>Description *</Text>
      <TextInput
        style={[commonStyles.input, { backgroundColor: '#FFFFFF', color: theme.textColor }]}
        placeholder="Enter meal description"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={[commonStyles.text, { color: theme.textColor }]}>Calories *</Text>
      <TextInput
        style={[commonStyles.input, { backgroundColor: '#FFFFFF', color: theme.textColor }]}
        placeholder="Enter Calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <Text style={[commonStyles.text, { color: theme.textColor }]}>Date *</Text>
      <DatePicker
        selectedDate={date}
        setSelectedDate={setDate}
        onDateSelected={() => setIsDateSelected(true)} // Mark date as selected
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[commonStyles.buttonText, { color: theme.textColor }]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={validateAndSave}>
          <Text style={[commonStyles.buttonText, { color: theme.textColor }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddDietEntryScreen;
