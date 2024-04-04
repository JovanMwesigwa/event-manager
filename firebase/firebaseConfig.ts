// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyQBJpHZfCbG46p3vUwYkCC8YBakd7Npg",
  authDomain: "timerapp-6bfa3.firebaseapp.com",
  projectId: "timerapp-6bfa3",
  storageBucket: "timerapp-6bfa3.appspot.com",
  messagingSenderId: "840877031411",
  appId: "1:840877031411:web:89ffacdb6b50441f749c86",
  measurementId: "G-MTXXZ7HW48",
  databaseURL: "https://timerapp-6bfa3-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default database;
