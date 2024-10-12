import React, { useContext } from 'react';
import ItemsList from '../components/ItemsList';
import { DataContext } from '../context/DataContext';

function ActivitiesScreen() {
  const { activities } = useContext(DataContext);

  return (
    <ItemsList entries={activities} type="exercise" />
  );
}

export default ActivitiesScreen;
