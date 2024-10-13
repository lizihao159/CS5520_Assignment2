import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../styles/commonStyles';

// this is a reusable component that can be used in multiple screens
// it is a controlled component that takes a selectedDate and setSelectedDate function as props
// it displays a placeholder text when no date is selected
// when the user taps the input, the date picker is shown
// when a date is selected, the picker is closed and the selected date is set
// the selected date is displayed in the input

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(prevState => !prevState); // Toggle picker visibility
  };

  const handleDateChange = (event, selectedDateValue) => {
    if (event.type === "set") { // Only update when date is selected
      const currentDate = selectedDateValue || selectedDate;
      setSelectedDate(currentDate);
    }
    setShowDatePicker(false); // Close the picker after selection
  };

  return (
    <View>
      <TouchableOpacity
        style={[commonStyles.input, { marginBottom: 20 }]} // Use commonStyles for consistency
        onPress={toggleDatePicker} // Toggle picker visibility on input tap
      >
        <Text style={{ color: selectedDate ? 'black' : 'gray' }}>
          {selectedDate ? selectedDate.toDateString() : 'Tap to select a date'} {/* Show placeholder text */}
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
