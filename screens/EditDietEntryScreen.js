// EditDietEntryScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { updateDocument, deleteDocument, getDocument } from '../Firebase/firebaseHelper';

const EditDietEntryScreen = ({ route, navigation }) => {
  const { item } = route.params; // Get the passed item
  const [description, setDescription] = useState(item?.description || '');
  const [calories, setCalories] = useState(String(item?.calories || ''));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyDocument = async () => {
      try {
        const docData = await getDocument('dietEntries', item.id);

        if (!docData) {
          Alert.alert('Error', 'Diet entry does not exist.');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error fetching document:', error);
        Alert.alert('Error', 'Failed to fetch diet entry.');
      }
    };

    verifyDocument();
  }, [item.id]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateDocument('dietEntries', item.id, {
        description,
        calories: parseInt(calories),
      });
      Alert.alert('Success', 'Diet entry updated.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating document:', error);
      Alert.alert('Error', 'Failed to update diet entry.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDocument('dietEntries', item.id);
      Alert.alert('Deleted', 'Diet entry deleted.');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting document:', error);
      Alert.alert('Error', 'Failed to delete diet entry.');
    }
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

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={commonStyles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} disabled={loading}>
          <Text style={commonStyles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditDietEntryScreen;
