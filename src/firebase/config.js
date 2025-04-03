// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "9354d74c7d9847b5b32a8f8e7f578b5b",
  authDomain: "fir-integration-i.firebaseapp.com",
  databaseURL: "https://fir-integration-i-default-rtdb.firebaseio.com",
  projectId: "fir-integration-i",
  storageBucket: "fir-integration-i.firebasestorage.app",
  messagingSenderId: "1089742290911",
  appId: "1:1089742290911:web:11db2d35827cfa9b670e6a",
  measurementId: "G-SFQ89L7LGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);