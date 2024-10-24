// firebaseHelper.js
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { database } from './firebaseSetup';

// Function to listen for real-time updates
export function listenToCollection(collectionName, callback) {
  const q = collection(database, collectionName);
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
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log('Document added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
}

// Function to get a document by ID
export async function getDocument(collectionName, id) {
  try {
    const docRef = doc(database, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return { id: docSnap.id, ...docSnap.data() }; // Include document ID with data
    } else {
      console.warn('No such document exists!');
      return null; // Return null if document doesn't exist
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

// Function to update a document
export async function updateDocument(collectionName, id, data) {
  try {
    const docRef = doc(database, collectionName, id);
    await updateDoc(docRef, data);
    console.log('Document updated with ID:', id);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

// Function to delete a document
export async function deleteDocument(collectionName, id) {
  try {
    const docRef = doc(database, collectionName, id);
    await deleteDoc(docRef);
    console.log('Document deleted with ID:', id);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}
