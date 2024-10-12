import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { commonStyles } from '../styles/commonStyles';
import { DataContext } from '../context/DataContext'; // Import the context
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import DatePicker from '../components/DatePicker'; // Import the reusable DatePicker component

const AddActivityScreen = ({ navigation }) => {
  const { addActivity } = useContext(DataContext); // Access the addActivity function from context
  const { theme } = useContext(ThemeContext); // Access the current theme
  const [activity, setActivity] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());

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
    const parsedDuration = parseInt(duration);

    if (!activity) {
      Alert.alert('Invalid Input', 'Please select an activity.');
      return;
    }

    if (!duration) {
      Alert.alert('Invalid Input', 'Duration cannot be empty.');
      return;
    }

    if (isNaN(parsedDuration)) {
      Alert.alert('Invalid Input', 'Duration must be a number.');
      return;
    }

    if (parsedDuration <= 0) {
      Alert.alert('Invalid Input', 'Duration must be a positive number.');
      return;
    }

    const newActivity = {
      activity,
      duration: parsedDuration,
      date: date.toDateString(),
    };

    addActivity(newActivity);
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

export default AddActivityScreen;
