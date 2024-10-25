import React, { useState, useLayoutEffect } from 'react';
import EntryForm from '../components/EntryForm';
import { updateDocument, deleteDocument } from '../Firebase/firebaseHelper';
import { Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditActivityScreen = ({ route, navigation }) => {
  const { item } = route.params;

  const [activity, setActivity] = useState(item.activity);
  const [duration, setDuration] = useState(String(item.duration));
  const [date, setDate] = useState(new Date(item.date));
  const [isSpecial, setIsSpecial] = useState(item.isSpecial);

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
      await updateDocument('activities', item.id, {
        activity,
        duration: parseInt(duration),
        date: date.toDateString(),
        isSpecial,
      });
      Alert.alert('Success', 'Activity updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update activity.');
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
      'Are you sure you want to delete this activity?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteDocument('activities', item.id);
              Alert.alert('Deleted', 'Activity deleted successfully.');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete activity.');
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
      type="activity"
      values={{ activity, duration, date, isSpecial }}
      onValueChange={(key, value) => {
        if (key === 'activity') setActivity(value);
        else if (key === 'duration') setDuration(value);
        else if (key === 'isSpecial') setIsSpecial(value);
        else setDate(value);
      }}
      onSave={confirmSave}
      onCancel={confirmCancel}
      isEdit={true}
    />
  );
};

export default EditActivityScreen;
