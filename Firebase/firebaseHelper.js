// firebaseHelper.js
import { collection, onSnapshot, addDoc, query } from 'firebase/firestore';
import { database } from './firebaseSetup';

// Function to listen for real-time updates
export function listenToCollection(collectionName, callback) {
  const q = query(collection(database, collectionName));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(data);
  });
}

// Function to add a new document to a collection
export async function addDocument(collectionName, data) {
  try {
    await addDoc(collection(database, collectionName), data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
}
