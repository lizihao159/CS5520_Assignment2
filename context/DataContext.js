// DataContext.js
import React, { createContext, useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup'; // Import Firestore setup

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
      collection(database, 'diet'),
      (snapshot) => {
        const dietData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDietEntries(dietData);
      }
    );

    // Clean up listeners
    return () => {
      unsubscribeActivities();
      unsubscribeDietEntries();
    };
  }, []);

  // Add new activity to Firestore
  const addActivity = async (newActivity) => {
    await addDoc(collection(database, 'activities'), newActivity);
  };

  // Add new diet entry to Firestore
  const addDietEntry = async (newDietEntry) => {
    await addDoc(collection(database, 'diet'), newDietEntry);
  };

  return (
    <DataContext.Provider value={{ activities, addActivity, dietEntries, addDietEntry }}>
      {children}
    </DataContext.Provider>
  );
};
