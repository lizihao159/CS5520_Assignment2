import React, { useState, useContext } from 'react';
import EntryForm from '../components/EntryForm';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';

const AddActivityScreen = ({ navigation }) => {
  const { addActivity } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);

  const [activity, setActivity] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(null);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'walking' },
    { label: 'Running', value: 'running' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Weights', value: 'weights' },
    { label: 'Yoga', value: 'yoga' },
    { label: 'Cycling', value: 'cycling' },
    { label: 'Hiking', value: 'hiking' },
  ]);

  const onValueChange = (key, value) => {
    if (key === 'activity') setActivity(value);
    else if (key === 'duration') setDuration(value);
    else if (key === 'open') setOpen(value);
    else if (key === 'items') setItems(value);
    else setDate(value);
  };

  const validateAndSave = async () => {
    const parsedDuration = parseInt(duration);
    const isSpecial = (activity === 'running' || activity === 'weights') && parsedDuration > 60;

    const newActivity = {
      activity,
      duration: parsedDuration,
      date: date.toDateString(),
      isSpecial,
    };

    await addActivity(newActivity);
    navigation.goBack();
  };

  return (
    <EntryForm
      type="activity"
      values={{ activity, duration, date, open, items }}
      onValueChange={onValueChange}
      onSave={validateAndSave}
      onCancel={() => navigation.goBack()}
    />
  );
};

export default AddActivityScreen;
