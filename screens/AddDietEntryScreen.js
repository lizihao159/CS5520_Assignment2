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
  const [date, setDate] = useState(null);
  const [isDateSelected, setIsDateSelected] = useState(false);

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

    // Automatically mark the diet entry as special if calories > 800
    const isSpecial = parsedCalories > 800;

    const newDietEntry = {
      description,
      calories: parsedCalories,
      date: date.toDateString(),
      isSpecial, // Save special status
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
        setSelectedDate={(selectedDate) => {
          setDate(selectedDate);
          setIsDateSelected(true);
        }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
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
