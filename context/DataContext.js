import React, { createContext, useState } from 'react';

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
