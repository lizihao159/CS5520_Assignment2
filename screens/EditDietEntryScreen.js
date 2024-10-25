import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for trash icon
import { commonStyles } from '../styles/commonStyles';
import DatePicker from '../components/DatePicker';
import { updateDocument, deleteDocument } from '../Firebase/firebaseHelper';
import CheckBox from 'expo-checkbox'; // Correct import from expo-checkbox

const EditDietEntryScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const [description, setDescription] = useState(item.description);
  const [calories, setCalories] = useState(String(item.calories));
  const [date, setDate] = useState(new Date(item.date));
  const [isSpecial, setIsSpecial] = useState(item.isSpecial || item.calories > 800);

  const handleSave = async () => {
    Alert.alert('Confirm Save', 'Are you sure you want to save the changes?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Save',
        onPress: async () => {
          try {
            await updateDocument('dietEntries', item.id, {
              description,
              calories: parseInt(calories),
              date: date.toDateString(),
              isSpecial,
            });
            Alert.alert('Success', 'Diet entry updated successfully.');
            navigation.goBack();
          } catch (error) {
            console.error('Error saving diet entry:', error);
            Alert.alert('Error', 'Failed to save changes.');
          }
        },
      },
    ]);
  };

  const handleDelete = async () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this diet entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteDocument('dietEntries', item.id);
            Alert.alert('Deleted', 'Diet entry deleted successfully.');
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting diet entry:', error);
            Alert.alert('Error', 'Failed to delete the diet entry.');
          }
        },
      },
    ]);
  };

  const handleCancel = () => {
    Alert.alert('Confirm Cancel', 'Are you sure you want to discard the changes?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => navigation.goBack() },
    ]);
  };

  // Add the trash icon to the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDelete} style={{ paddingRight: 15 }}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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
      <DatePicker selectedDate={date} setSelectedDate={setDate} />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
        <CheckBox value={isSpecial} onValueChange={setIsSpecial} />
        <Text style={{ marginLeft: 8 }}>Mark as Special</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <TouchableOpacity onPress={handleCancel}>
          <Text style={commonStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave}>
          <Text style={commonStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditDietEntryScreen;
