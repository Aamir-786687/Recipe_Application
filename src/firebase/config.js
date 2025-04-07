import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDka73p3rULtT9EVDR9iMtWhDCsY4FNdEQ",
  authDomain: "recipes-bff88.firebaseapp.com",
  projectId: "recipes-bff88",
  storageBucket: "recipes-bff88.appspot.com",
  messagingSenderId: "321218631273",
  appId: "1:321218631273:web:e17dc326abc973b90bf4f8",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }

