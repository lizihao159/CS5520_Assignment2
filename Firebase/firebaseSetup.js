// firebaseSetup.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtvjkVpClENvVBVUVviYTTfsvrEejDeE0",
    authDomain: "cs5520-a2-part2.firebaseapp.com",
    projectId: "cs5520-a2-part2",
    storageBucket: "cs5520-a2-part2.appspot.com",
    messagingSenderId: "529619106466",
    appId: "1:529619106466:web:cdcd1a43551d0a161735fb"
  };

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
