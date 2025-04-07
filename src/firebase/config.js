import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "16ee2db26f5d46d8928bd7621ab5d9c2",
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

