// DataContext.js
import React, { createContext, useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [dietEntries, setDietEntries] = useState([]);

  // Use Firestore onSnapshot for real-time updates
  useEffect(() => {
    const unsubscribeActivities = onSnapshot(
      collection(database, 'activities'),
      (snapshot) => {
        const activitiesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(activitiesData);
      }
    );

    const unsubscribeDietEntries = onSnapshot(
      collection(database, 'dietEntries'), // Fixed collection name
      (snapshot) => {
        const dietData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDietEntries(dietData);
      }
    );

    return () => {
      unsubscribeActivities();
      unsubscribeDietEntries();
    };
  }, []);

  const addActivity = async (newActivity) => {
    await addDoc(collection(database, 'activities'), newActivity);
  };

  const addDietEntry = async (newDietEntry) => {
    await addDoc(collection(database, 'dietEntries'), newDietEntry); // Fixed collection name
  };

  return (
    <DataContext.Provider value={{ activities, addActivity, dietEntries, addDietEntry }}>
      {children}
    </DataContext.Provider>
  );
};
