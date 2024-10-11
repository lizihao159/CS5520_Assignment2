import React, { useContext } from 'react';
import ItemsList from '../components/ItemsList'; // Import the reusable component
import { DataContext } from '../context/DataContext'; // Import the context

function ActivitiesScreen() {
  const { activities } = useContext(DataContext); // Access activities from context

  return (
    <ItemsList entries={activities} type="exercise" />
  );
}

export default ActivitiesScreen;
