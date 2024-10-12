import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { DataContext } from '../context/DataContext'; // Import the context
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import DatePicker from '../components/DatePicker'; // Import the reusable DatePicker component

const AddDietEntryScreen = ({ navigation }) => {
  const { addDietEntry } = useContext(DataContext);
  const { theme } = useContext(ThemeContext); // Access the theme
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());

  const validateAndSave = () => {
    const parsedCalories = parseInt(calories);
    
    if (!description || !calories || isNaN(parsedCalories) || parsedCalories <= 0) {
      Alert.alert('Invalid Input', 'Please fill all fields with valid data.');
      return;
    }

    const newDietEntry = {
      description,
      calories: parsedCalories,
      date: date.toDateString(),
    };

    addDietEntry(newDietEntry);
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
      <DatePicker selectedDate={date} setSelectedDate={setDate} />

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
