import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../styles/commonStyles';

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false); // Track if a date is selected

  const toggleDatePicker = () => {
    setShowDatePicker(prevState => !prevState);

    if (!isDateSelected) {
      const today = new Date(); // Automatically select today's date
      setSelectedDate(today);
      setIsDateSelected(true); // Mark date as selected
    }
  };

  const handleDateChange = (event, date) => {
    if (event.type === 'set') {
      const selected = date || new Date(); // Default to today if no date chosen
      setSelectedDate(selected);
      setIsDateSelected(true);
    }
    setShowDatePicker(false); // Close picker when user taps out or selects a date
  };

  return (
    <View>
      <TouchableOpacity
        style={[commonStyles.input, { marginBottom: 20 }]} // Use commonStyles for consistency
        onPress={toggleDatePicker} // Toggle picker on tap
      >
        <Text style={{ color: selectedDate ? 'black' : 'gray' }}>
          {isDateSelected ? selectedDate.toDateString() : 'Tap to select a date'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
