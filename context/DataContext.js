import React, { createContext, useState } from 'react';


// Create a DataContext
// This context will store the activities and diet entries
// and provide functions to add new activities and diet entries

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [dietEntries, setDietEntries] = useState([]);

  const addActivity = (newActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const addDietEntry = (newDietEntry) => {
    setDietEntries((prevDietEntries) => [...prevDietEntries, newDietEntry]);
  };

  return (
    <DataContext.Provider value={{ activities, addActivity, dietEntries, addDietEntry }}>
      {children}
    </DataContext.Provider>
  );
};
