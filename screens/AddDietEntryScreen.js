import React, { useState, useContext } from 'react';
import EntryForm from '../components/EntryForm';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';

const AddDietEntryScreen = ({ navigation }) => {
  const { addDietEntry } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(null);

  const onValueChange = (key, value) => {
    if (key === 'description') setDescription(value);
    else if (key === 'calories') setCalories(value);
    else setDate(value);
  };

  const onSave = async () => {
    const parsedCalories = parseInt(calories);
    const newDietEntry = {
      description,
      calories: parsedCalories,
      date: date.toDateString(),
      isSpecial: parsedCalories > 800,
    };

    await addDietEntry(newDietEntry);
    navigation.goBack();
  };

  return (
    <EntryForm
      type="diet"
      values={{ description, calories, date }}
      onValueChange={onValueChange}
      onSave={onSave}
      onCancel={() => navigation.goBack()}
    />
  );
};

export default AddDietEntryScreen;
