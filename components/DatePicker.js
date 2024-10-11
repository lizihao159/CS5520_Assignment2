import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { commonStyles } from '../styles/commonStyles';

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={[commonStyles.input, { marginBottom: 20 }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{selectedDate.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="inline"
          minimumDate={new Date()} // Set minimum date to today to prevent past date selection
          onChange={(event, selectedDateValue) => {
            const currentDate = selectedDateValue || selectedDate;
            setShowDatePicker(false);
            setSelectedDate(currentDate);
          }}
        />
      )}
    </View>
  );
};

export default DatePicker;
