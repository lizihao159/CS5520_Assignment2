import React, { useState, useLayoutEffect } from 'react';
import EntryForm from '../components/EntryForm';
import { updateDocument, deleteDocument } from '../Firebase/firebaseHelper';
import { Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditDietEntryScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const [description, setDescription] = useState(item.description);
  const [calories, setCalories] = useState(String(item.calories));
  const [date, setDate] = useState(new Date(item.date));
  const [isSpecial, setIsSpecial] = useState(item.isSpecial || item.calories > 800);

  const confirmSave = () => {
    Alert.alert(
      'Confirm Save',
      'Are you sure you want to save the changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: handleSave },
      ]
    );
  };

  const handleSave = async () => {
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
      Alert.alert('Error', 'Failed to save changes.');
      console.error('Error saving diet entry:', error);
    }
  };

  const confirmCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard the changes?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this diet entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteDocument('dietEntries', item.id);
              Alert.alert('Deleted', 'Diet entry deleted successfully.');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete the diet entry.');
              console.error('Error deleting diet entry:', error);
            }
          },
        },
      ]
    );
  };

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
    <EntryForm
      type="diet"
      values={{ description, calories, date, isSpecial }}
      onValueChange={(key, value) => {
        if (key === 'description') setDescription(value);
        else if (key === 'calories') setCalories(value);
        else if (key === 'isSpecial') setIsSpecial(value);
        else setDate(value);
      }}
      onSave={confirmSave}
      onCancel={confirmCancel}
      isEdit={true}
    />
  );
};

export default EditDietEntryScreen;
