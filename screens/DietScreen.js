import React, { useContext } from 'react';
import ItemsList from '../components/ItemsList'; // Import the reusable component
import { DataContext } from '../context/DataContext'; // Import the context

function DietScreen() {
  const { dietEntries } = useContext(DataContext); // Access diet entries from context

  return (
    <ItemsList entries={dietEntries} type="diet" />
  );
}

export default DietScreen;
