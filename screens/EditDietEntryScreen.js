import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { updateDocument, deleteDocument } from '../Firebase/firebaseHelper';
import { commonStyles } from '../styles/commonStyles';
import DatePicker from '../components/DatePicker';

const EditDietEntryScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const [description, setDescription] = useState(item.description);
  const [calories, setCalories] = useState(String(item.calories));
  const [date, setDate] = useState(new Date(item.date)); // Use the item's date

  const handleSave = async () => {
    if (!description || !calories) {
      Alert.alert('Invalid Input', 'Please fill all fields.');
      return;
    }

    await updateDocument('dietEntries', item.id, {
      description,
      calories: parseInt(calories),
      date: date.toDateString(), // Save the date
    });

    Alert.alert('Success', 'Diet entry updated successfully.');
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteDocument('dietEntries', item.id);
    Alert.alert('Deleted', 'Diet entry deleted successfully.');
    navigation.goBack();
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.text}>Description *</Text>
      <TextInput
        style={commonStyles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={commonStyles.text}>Calories *</Text>
      <TextInput
        style={commonStyles.input}
        keyboardType="numeric"
        value={calories}
        onChangeText={setCalories}
      />

      <Text style={commonStyles.text}>Date *</Text>
      <DatePicker selectedDate={date} setSelectedDate={setDate}/>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={commonStyles.buttonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave}>
          <Text style={commonStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditDietEntryScreen;
