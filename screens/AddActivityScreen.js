import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { commonStyles } from '../styles/commonStyles';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';
import DatePicker from '../components/DatePicker';

const AddActivityScreen = ({ navigation }) => {
  const { addActivity } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [activity, setActivity] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null); // Start with null to ensure user selects it
  const [isDateSelected, setIsDateSelected] = useState(false); // Track if the date is selected

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

  const validateAndSave = async () => {
    const parsedDuration = parseInt(duration);

    if (!activity) {
      Alert.alert('Invalid Input', 'Please select an activity.');
      return;
    }

    if (!duration || isNaN(parsedDuration) || parsedDuration <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid duration.');
      return;
    }

    if (!isDateSelected) {
      Alert.alert('Invalid Input', 'Please choose a date.');
      return;
    }

    const newActivity = {
      activity,
      duration: parsedDuration,
      date: date.toDateString(),
    };

    await addActivity(newActivity);
    navigation.goBack();
  };

  return (
    <View style={[commonStyles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[commonStyles.text, { color: theme.textColor }]}>Activity *</Text>
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

      <Text style={[commonStyles.text, { color: theme.textColor }]}>Duration (min) *</Text>
      <TextInput
        style={[commonStyles.input, { backgroundColor: '#FFFFFF', color: theme.textColor, marginBottom: 20 }]}
        placeholder="Enter Duration"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
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

export default AddActivityScreen;
