import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../styles/commonStyles';

const DatePicker = ({ selectedDate, setSelectedDate, onDateSelected }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);

    // Automatically select today's date if no date was previously selected
    if (!selectedDate) {
      const today = new Date();
      setSelectedDate(today);

      if (onDateSelected) {
        onDateSelected(); // Call the callback if it's provided
      }
    }
  };

  const onChange = (event, date) => {
    setShowDatePicker(false);

    if (date || event.type === 'set') {
      setSelectedDate(date || new Date());

      if (onDateSelected) {
        onDateSelected(); // Call the callback if provided
      }
    }
  };

  const displayDate = () => {
    return selectedDate ? selectedDate.toDateString() : 'Tap to select a date';
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <TouchableOpacity onPress={toggleDatePicker} style={commonStyles.input}>
        <Text style={{ color: 'black' }}>{displayDate()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;
