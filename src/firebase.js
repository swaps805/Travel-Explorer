import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuf3yYSHaSKc40-_VJxIudrefhNqlE5XY",
  authDomain: "travel-d0d3f.firebaseapp.com",
  projectId: "travel-d0d3f",
  storageBucket: "travel-d0d3f.appspot.com",
  messagingSenderId: "552319100114",
  appId: "1:552319100114:web:58147d20898afe9c49b90b",
  measurementId: "G-DKXW4R205F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;