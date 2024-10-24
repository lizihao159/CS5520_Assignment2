// firebaseHelper.js
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  query, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { database } from './firebaseSetup';

// Function to listen for real-time updates
export function listenToCollection(collectionName, callback) {
  const q = query(collection(database, collectionName));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
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

// Function to update a document in a collection
export async function updateEntry(collectionName, id, updatedData) {
  try {
    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error('Error updating document: ', error);
  }
}

// Function to delete a document from a collection
export async function deleteEntry(collectionName, id) {
  try {
    const docRef = doc(database, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
}
